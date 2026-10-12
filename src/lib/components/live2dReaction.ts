// Click/tap reactions for the Live2D avatar.
// The Daniel model ships no motions and its hit areas point at a drawable that doesn't exist,
// so reactions are driven by expressions (see static/live2d/models/daniel/Expressions).

export interface Reaction {
	mood: string;
	expression: string;
	announcement: string;
}

// Moods are named for how each expression reads, not the asset name
// (e.g. `sad` drops and turns the head away with a frown, which reads as annoyed).
export const REACTIONS: readonly Reaction[] = [
	{ mood: 'surprised', expression: 'what', announcement: 'Daniel looks surprised.' },
	{ mood: 'annoyed', expression: 'sad', announcement: 'Daniel looks annoyed.' },
	{ mood: 'smug', expression: 'Smug', announcement: 'Daniel looks smug.' },
	{ mood: 'suspicious', expression: 'peeking', announcement: 'Daniel eyes you suspiciously.' }
];

export const NEUTRAL_EXPRESSION = 'Normal';
export const REACTION_RESET_MS = 2500;

export function pickReaction(previous: Reaction | null, random: () => number = Math.random) {
	const candidates = REACTIONS.filter((reaction) => reaction !== previous);
	const index = Math.min(Math.floor(random() * candidates.length), candidates.length - 1);
	return candidates[index];
}

interface ReactorOptions<TimerId> {
	setExpression: (name: string) => void;
	setTimer: (fn: () => void, ms: number) => TimerId;
	clearTimer: (id: TimerId) => void;
	random?: () => number;
}

export function createAvatarReactor<TimerId>({
	setExpression,
	setTimer,
	clearTimer,
	random = Math.random
}: ReactorOptions<TimerId>) {
	let previous: Reaction | null = null;
	let resetTimer: TimerId | null = null;

	function cancelReset() {
		if (resetTimer !== null) {
			clearTimer(resetTimer);
			resetTimer = null;
		}
	}

	return {
		react(): Reaction {
			const reaction = pickReaction(previous, random);
			previous = reaction;
			setExpression(reaction.expression);

			cancelReset();
			resetTimer = setTimer(() => {
				resetTimer = null;
				setExpression(NEUTRAL_EXPRESSION);
			}, REACTION_RESET_MS);

			return reaction;
		},
		dispose: cancelReset
	};
}
