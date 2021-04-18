/**
 * handler function that aws lambda
 * will hook to
 * @format */

import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { HandleHookResponse } from './lib/webhooks/handleHook';

export async function lambdaHandler(
	event: APIGatewayEvent,
	context: Context
): Promise<APIGatewayProxyResult> {
	const data: any = event;
	const response: any = await new HandleHookResponse(data).processData();

	return {
		statusCode: 200,
		body: response,
	};
}
