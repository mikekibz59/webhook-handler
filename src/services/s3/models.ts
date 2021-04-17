/**
 * Model file to define interfaces
 * used by the s3 service
 * @format */

export interface File {
	name: string;
	type: string;
	extension: string;
	content: string;
}

export interface UploadedFile {
	path: string;
}

export interface S3FileUploader {
	upload: (file: File) => Promise<UploadedFile | undefined>;
}
