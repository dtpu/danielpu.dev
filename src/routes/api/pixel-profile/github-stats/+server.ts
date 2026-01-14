import { getStatsCard } from 'pixel-profile-server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	return getStatsCard(event.request);
}