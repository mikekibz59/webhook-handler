/**
 * module to take receive params;
 * validate if it comes from mailgun;
 * store it in s3;
 * send a notification message
 *
 * @format
 */

import { VerifyParams } from './interfaces';
import { verifyHookResponse } from './validators';
import { signingKey } from '../../config/appConfig';
import { File, UploadedFile } from '../../services/s3/interfaces';
import { SnsObject, HookResponse } from '../../services/publisher/interfaces';
import { S3Service } from '../../services/s3/s3Service';
import { SnsPublisher } from '../../services/publisher/snsPublisher';
import { topicArn } from '../../config/appConfig';
export class HandleHookResponse {
	private response: any;
	private readonly TopicArn = topicArn;
	private readonly Provider = 'Mailgun';

	constructor(response: any) {
		this.response = response;
	}

	async processData(): Promise<any> {
		this.validateHook();
		const s3Response: any = await this.saveResponse();
		const snsResponse: any = await this.publishResponse();
		return { s3Response, snsResponse };
	}
	private validateHook(): void {
		const signatureParams: VerifyParams = this.response.signature;
		const result: boolean = verifyHookResponse(signingKey, signatureParams);
		if (!result) {
			throw Error("webhook isn't valid");
		}
	}

	private extractFileSaveProperties(): File {
		const eventData: any = this.response['event-data'];
		const fileData: File = {
			name: eventData.event,
			type: 'application/json',
			extension: 'json',
			content: JSON.stringify(this.response),
		};
		return fileData;
	}

	private async saveResponse(): Promise<UploadedFile | undefined> {
		const file: File = this.extractFileSaveProperties();
		const sendData: any = new S3Service();
		const upload: UploadedFile | undefined = await sendData.upload(file);
		return upload;
	}

	private extractFilePublishProperties(): SnsObject {
		const eventData: any = this.response['event-data'];
		const event: string = eventData.event;
		const timestamp: number = eventData.timestamp;
		const hookMessage: HookResponse = {
			Provider: this.Provider,
			timestamp: timestamp,
			type: `email ${event}`,
		};
		const response: SnsObject = {
			Message: JSON.stringify(hookMessage),
			TopicArn: this.TopicArn,
		};
		return response;
	}

	private async publishResponse(): Promise<any> {
		const publisher: SnsPublisher = new SnsPublisher();
		const params: SnsObject = this.extractFilePublishProperties();
		const value = await publisher.publish(params);
		return value;
	}
}
