/**
 * S3 services module:
 * it is responsible to instantiating as S3
 * bucket and operations done on it
 *
 * @format
 */

import S3 from 'aws-sdk/clients/s3';
import {
	s3BucketName,
	awsAccessKey,
	awsSecretKey,
	region,
} from '../../config/appConfig';
import { File, UploadedFile, S3FileUploader } from './interfaces';

export class S3Service implements S3FileUploader {
	private client: S3;

	private readonly bucketName = s3BucketName;

	constructor() {
		this.client = new S3({
			region: region,
			accessKeyId: awsAccessKey,
			secretAccessKey: awsSecretKey,
		});
	}

	async upload(file: File): Promise<UploadedFile | undefined> {
		try {
			const path = await this.uploadFile(file);
			return { path };
		} catch {
			return undefined;
		}
	}

	private generateKey(file: File, timestamp: number): string {
		return `${file.name}-${timestamp}.${file.extension}`;
	}

	private async uploadFile(file: File): Promise<string> {
		const timestamp = Date.now();
		const fileKey = this.generateKey(file, timestamp);
		await this.client
			.putObject({
				Bucket: this.bucketName!,
				Key: fileKey,
				ContentType: file.type,
				Body: file.content,
			})
			.promise();
		return `${this.bucketName}/${fileKey}`;
	}
}
