import { put } from '@vercel/blob';

const relativeImagePath =
	'/api/github-stats?username=danielp1218&dithering=true&include_all_commits=true&pixelate_avatar=false&theme=fuji&color=%23ffffffFF&hide=issues';

export const POST = async (req) => {
	const fullURL = new URL(req.url);
	const imageURL = `${fullURL.origin}${relativeImagePath}`;
	return fetch(`${imageURL}`)
		.then(async (res) => {
			const imageFile = await res.arrayBuffer();
			return await uploadToBlob(imageFile);
		})
		.catch((error) => {
			console.error('Error fetching the GitHub stats image:', error);
			return new Response('Error generating GitHub stats image.', { status: 500 });
		});
};

// Note: url is at https://yzm0cfbfopzjsgx7.public.blob.vercel-storage.com/danielp1218/github-stats.png
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
