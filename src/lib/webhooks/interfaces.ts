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

