/**
 * Publisher interfaces file
 *
 * @format
 */

export interface HookResponse {
	Provider: string;
	timestamp: number;
	type: string;
}

export interface SnsObject {
	Message: string;
	TopicArn: string;
}

interface requestId{
	RequestId: string;
}
export interface PublisherResponse{
	ResponseMetadata: requestId;
	MessageId: string;
}

export interface SNSPublisher {
	publish: (data: SnsObject) => Promise<PublisherResponse | undefined>;
}
