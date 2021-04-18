/**
 * File responsible for publishing messages
 * to AWS so that it can be subscribed by
 * other services/ apps
 *
 * @format
 */

import { PublisherResponse, SnsObject, SNSPublisher } from './interfaces';
import SNS from 'aws-sdk/clients/sns';
import { awsAccessKey, awsSecretKey, region } from '../../config/appConfig';

export class SnsPublisher implements SNSPublisher {
	private client: SNS;

	constructor() {
		this.client = new SNS({
			region: region,
			accessKeyId: awsAccessKey,
			secretAccessKey: awsSecretKey,
		});
	}

	async publish(data: SnsObject): Promise<PublisherResponse | undefined> {
		try {
			const response: PublisherResponse = await this.publishPayload(data);
			return response;
		} catch {
			return undefined;
		}
	}

	private publishPayload(params: SnsObject): any {
		return new Promise((resolve, reject) => {
			this.client.publish(params, (err: any, data: any) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(data);
				}
			});
		});
	}
}
