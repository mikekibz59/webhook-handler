/**
 * file to hold interface and types
 * for the webhooks folder
 *
 * @format
 */

export interface VerifyParams {
	timestamp: string;
	token: string;
	signature: string;
}

export interface HandleHookProcessor {
	processData: () => Promise<any>;
}
