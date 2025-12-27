export const GET = async (request) => {
	const tz = request.url.searchParams.get('timezone');

	const response = await fetch('https://api.github.com/repos/danielp1218/danielpu.dev');
	if (!response.ok) {
		return new Response('Failed to fetch repository data.', { status: 500 });
	}

	const repoData = await response.json();
	const pushed_at = new Date(repoData.pushed_at);

	if (!tz) {
		return new Response(pushed_at.toUTCString(), {
			headers: { 'Content-Type': 'text/plain' }
		});
	}
	try {
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: tz,
			timeZoneName: 'shortGeneric',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		});

		return new Response(formatter.format(pushed_at), {
			headers: { 'Content-Type': 'text/plain' }
		});
	} catch {
		return new Response(pushed_at.toUTCString(), {
			headers: { 'Content-Type': 'text/plain' }
		});
	}
};
