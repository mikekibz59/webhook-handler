/**
 * handler function that aws lambda
 * will hook to
 * @format */

import { HandleHookResponse } from './lib/webhooks/handleHook';
export const lambdaHandler = async (event: any) => {
	const data: any = JSON.parse(event);
	const response: any = await new HandleHookResponse(data).processData();

	return {
		statusCode: 200,
		body: response,
	};
};
