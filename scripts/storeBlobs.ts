import { put } from '@vercel/blob';
import { resolve } from 'path';
import { readdir } from 'fs/promises';
import { join } from 'path';

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!BLOB_READ_WRITE_TOKEN) {
	throw new Error('BLOB_READ_WRITE_TOKEN is not defined in environment variables.');
}

const getFilesRecursively = async (dir: string): Promise<string[]> => {
	const files: string[] = [];
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await getFilesRecursively(fullPath)));
		} else {
			files.push(fullPath);
		}
	}

	return files;
};

export const uploadFile = async (filePath: string) => {
	try {
		const absolutePath = resolve(filePath);
		const response = await fetch(`file://${absolutePath}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch file: ${response.statusText}`);
		}
		const fileData = await response.arrayBuffer();
		const blobPath = filePath.replace(/^static\//, ''); // Remove 'static/' prefix for blob storage path
		const { url } = await put(blobPath, fileData, {
			access: 'public',
			allowOverwrite: true,
			token: BLOB_READ_WRITE_TOKEN
		});
		console.log(`Uploaded ${filePath} to ${url}`);
	} catch (error) {
		console.error(`Error uploading file ${filePath}:`, error);
	}
};

const promptUser = async () => {
	console.log('Scanning static directory for files...\n');
	const staticDir = 'static';
	const allFiles = await getFilesRecursively(staticDir);

	// Filter to only show video files
	const videoFiles = allFiles.filter((file) => /\.(mp4|mov)$/i.test(file));

	console.log('Available files:');
	videoFiles.forEach((file, index) => {
		console.log(`${index + 1}. ${file}`);
	});

	console.log('\nEnter file numbers to upload (comma-separated, or "all" for all files):');

	const input = await new Promise<string>((resolve) => {
		process.stdin.once('data', (data) => {
			resolve(data.toString().trim());
		});
	});

	let selectedFiles: string[] = [];

	if (input.toLowerCase() === 'all') {
		selectedFiles = videoFiles;
	} else {
		const indices = input.split(',').map((num) => parseInt(num.trim()) - 1);
		selectedFiles = indices
			.filter((i) => i >= 0 && i < videoFiles.length)
			.map((i) => videoFiles[i]);
	}

	if (selectedFiles.length === 0) {
		console.log('No valid files selected.');
		process.exit(0);
	}

	console.log(`\nUploading ${selectedFiles.length} file(s)...\n`);

	for (const file of selectedFiles) {
		await uploadFile(file);
	}

	console.log('\nUpload complete!');
	process.exit(0);
};

promptUser();
