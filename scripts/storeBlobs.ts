import { put } from '@vercel/blob';
import { resolve } from 'path';

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not defined in environment variables.');
}

const paths = ["static/videos/projects/suika.mp4", "static/videos/projects/flowboard.mp4"];

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
}

const uploadAllFiles = async () => {
    for (const path of paths) {
        await uploadFile(path);
    }
}

uploadAllFiles();