import { PUBLIC_BLOB_STORAGE_URL } from '$env/static/public';

export const GET = async () => {
	const res = await fetch(`${PUBLIC_BLOB_STORAGE_URL}/danielp1218/github-stats.png`);
	if (res.ok) {
		const imageFile = await res.arrayBuffer();
		return new Response(imageFile, {
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
			}
		});
	} else {
		return new Response('Failed to fetch GitHub stats image from Blob Storage.', { status: 500 });
	}
};
