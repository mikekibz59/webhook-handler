/**
 * module to take receive params;
 * validate if it comes from mailgun;
 * store it in s3;
 * send a notification message
 *
 * @format
 */

import { VerifyParams, returnValue } from './model';
import { verifyHookResponse } from './validators';
import { signingKey } from '../../config/appConfig';
import { File, UploadedFile } from '../../services/s3/models';
import { S3Service } from '../../services/s3/s3_service';

export class HandleHookResponse {
	response: any;

	constructor(response: any) {
		this.response = response;
	}

	processData(): any{
		this.validateHook();
		const path: any = this.saveResponse();
		return path;
	}
	private validateHook(): void {
		const signatureParams: VerifyParams = this.response.signature;
		const result: boolean = verifyHookResponse(signingKey, signatureParams);
		if (!result) {
			throw Error("webhook isn't valid");
		}
	}

	private extractFileProperties(): File {
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
		const file: File = this.extractFileProperties();
		const sendData: any = new S3Service();
		const upload: UploadedFile | undefined = await sendData.upload(file);
		return upload;
	}
}
