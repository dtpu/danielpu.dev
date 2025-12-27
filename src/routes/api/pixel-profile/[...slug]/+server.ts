import { app } from 'pixel-profile-server';
import type { RequestHandler } from '@sveltejs/kit';

export const fallback: RequestHandler = ({ request, getClientAddress }) => {
	request.headers.set('x-forwarded-for', getClientAddress());

	const newUrl = request.url.replace('/api/pixel-profile', '/api');
	return app.request(new Request(newUrl, request));
};
