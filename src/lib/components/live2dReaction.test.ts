import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
	NEUTRAL_EXPRESSION,
	REACTIONS,
	REACTION_RESET_MS,
	createAvatarReactor,
	pickReaction
} from './live2dReaction';

const modelDir = new URL('../../../static/live2d/models/daniel/', import.meta.url);
const modelExpressions: { Name: string; File: string }[] = JSON.parse(
	readFileSync(new URL('daniel.model3.json', modelDir), 'utf8')
).FileReferences.Expressions;

function fakeTimers() {
	let nextId = 1;
	const pending = new Map<number, () => void>();
	return {
		pending,
		setTimer: (fn: () => void, ms: number) => {
			assert.equal(ms, REACTION_RESET_MS);
			const id = nextId++;
			pending.set(id, fn);
			return id;
		},
		clearTimer: (id: number) => {
			pending.delete(id);
		},
		flush: () => {
			const fns = [...pending.values()];
			pending.clear();
			fns.forEach((fn) => fn());
		}
	};
}

describe('pickReaction', () => {
	test('only uses expressions that exist on the Daniel model', () => {
		const names = modelExpressions.map((e) => e.Name);
		assert.ok(names.includes(NEUTRAL_EXPRESSION));
		for (const reaction of REACTIONS) {
			const entry = modelExpressions.find((e) => e.Name === reaction.expression);
			assert.ok(entry, `${reaction.expression} is not declared in daniel.model3.json`);
			assert.ok(existsSync(new URL(entry.File, modelDir)), `${entry.File} is missing`);
			assert.notEqual(reaction.expression, NEUTRAL_EXPRESSION);
		}
	});

	test('reactions are moods like surprised and annoyed, with no floating symbols', () => {
		const moods = REACTIONS.map((reaction) => reaction.mood);
		assert.ok(moods.includes('surprised'));
		assert.ok(moods.includes('annoyed'));
		assert.equal(new Set(moods).size, moods.length);
		for (const reaction of REACTIONS) {
			assert.ok(!('symbol' in reaction), `${reaction.mood} still defines a symbol`);
			assert.match(reaction.announcement, new RegExp(reaction.mood, 'i'));
		}
	});

	test('never repeats the previous reaction so consecutive taps visibly change', () => {
		for (const previous of REACTIONS) {
			for (const r of [0, 0.34, 0.5, 0.99]) {
				assert.notEqual(
					pickReaction(previous, () => r),
					previous
				);
			}
		}
	});

	test('picks deterministically from the injected random source', () => {
		assert.equal(
			pickReaction(null, () => 0),
			REACTIONS[0]
		);
		assert.equal(
			pickReaction(null, () => 0.999),
			REACTIONS[REACTIONS.length - 1]
		);
	});
});

describe('createAvatarReactor', () => {
	test('applies a reaction expression, then returns to neutral after the reset delay', () => {
		const timers = fakeTimers();
		const applied: string[] = [];
		const reactor = createAvatarReactor({
			setExpression: (name) => applied.push(name),
			setTimer: timers.setTimer,
			clearTimer: timers.clearTimer,
			random: () => 0
		});

		const reaction = reactor.react();

		assert.equal(reaction, REACTIONS[0]);
		assert.deepEqual(applied, [REACTIONS[0].expression]);
		timers.flush();
		assert.deepEqual(applied, [REACTIONS[0].expression, NEUTRAL_EXPRESSION]);
	});

	test('rapid taps restart the reset timer instead of stacking resets', () => {
		const timers = fakeTimers();
		const applied: string[] = [];
		const reactor = createAvatarReactor({
			setExpression: (name) => applied.push(name),
			setTimer: timers.setTimer,
			clearTimer: timers.clearTimer,
			random: () => 0
		});

		const first = reactor.react();
		const second = reactor.react();

		assert.notEqual(second, first);
		assert.equal(timers.pending.size, 1);
		timers.flush();
		assert.deepEqual(applied, [first.expression, second.expression, NEUTRAL_EXPRESSION]);
	});

	test('dispose cancels a pending reset', () => {
		const timers = fakeTimers();
		const applied: string[] = [];
		const reactor = createAvatarReactor({
			setExpression: (name) => applied.push(name),
			setTimer: timers.setTimer,
			clearTimer: timers.clearTimer,
			random: () => 0
		});

		reactor.react();
		reactor.dispose();

		assert.equal(timers.pending.size, 0);
		assert.equal(applied.length, 1);
	});
});
