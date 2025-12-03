import { PUBLIC_GITHUB_STATS_BLOB_URL } from '$env/static/public';

export const GET = async () => {
	return fetch(PUBLIC_GITHUB_STATS_BLOB_URL);
};
