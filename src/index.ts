/**
 * handler function that aws lambda
 * will hook to
 * @format */

import { HandleHookResponse } from './lib/webhooks/handleHook';
export const lambdaHandler = async (event: any) => {
	const data: any = JSON.parse(event);
	const response: string = new HandleHookResponse(data).processData();
	return {
		status: 200,
		data: response,
	};
};
