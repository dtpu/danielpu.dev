import { app } from 'pixel-profile-server';
import type { RequestHandler } from '@sveltejs/kit';

export const fallback: RequestHandler = ({ request, getClientAddress }) => {
	request.headers.set('x-forwarded-for', getClientAddress());
	return app.request(request);
};