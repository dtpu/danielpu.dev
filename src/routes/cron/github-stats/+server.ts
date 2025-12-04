import { put } from '@vercel/blob';

const relativeImagePath =
	'/api/github-stats?dithering=true&include_all_commits=true&pixelate_avatar=false&theme=fuji&color=%23ffffffFF&hide=issues';

const RETRIES = 4;

export const GET = async (req) => {
	const fullURL = new URL(req.url);
	const imageURL = `${fullURL.origin}${relativeImagePath}`;
	for (let attempt = 1; attempt <= RETRIES; attempt++) {
		try {
			const res = await fetch(`${imageURL}`);
			if (res.ok) {
				const imageFile = await res.arrayBuffer();
				return await uploadToBlob(imageFile);
			} else {
				console.log(`Attempt ${attempt} failed: Received status ${res.status}`);
			}
		} catch (error) {
			console.log(`Attempt ${attempt} failed:`, error);
		}
	}
	return new Response('Failed to fetch GitHub stats image after multiple attempts.', {
		status: 500
	});
};

// Note: url is uploaded to https://yzm0cfbfopzjsgx7.public.blob.vercel-storage.com/danielp1218/github-stats.png
const uploadToBlob = async (imageFile: ArrayBuffer) => {
	try {
		const { url } = await put('danielp1218/github-stats.png', imageFile, {
			access: 'public',
			cacheControlMaxAge: 86400, // 1 day in seconds
			allowOverwrite: true
		});
		return new Response(
			'Cron job executed: GitHub stats image uploaded to Vercel Blob Storage at ' + url,
			{ status: 200 }
		);
	} catch (error) {
		console.log('Error uploading image to Vercel Blob Storage:', error);
		return new Response(`Error uploading image to Vercel Blob Storage: ${error}`, { status: 500 });
	}
};
