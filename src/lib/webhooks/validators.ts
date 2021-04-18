/**
 * lib file that will handle validation of webhook
 * responses
 *
 * @format
 */

import Crypto from 'crypto';
import { VerifyParams } from './interfaces';

export const verifyHookResponse = (
	signKey: string,
	params: VerifyParams
): boolean => {
	const encodedToken = Crypto.createHmac('sha256', signKey)
		.update(params.timestamp.concat(params.token))
		.digest('hex');
	return encodedToken === params.signature;
};
