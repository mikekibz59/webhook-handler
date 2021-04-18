"use strict";
/**
 * module to take receive params;
 * validate if it comes from mailgun;
 * store it in s3;
 * send a notification message
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleHookResponse = void 0;
const validators_1 = require("./validators");
const appConfig_1 = require("../../config/appConfig");
const s3Service_1 = require("../../services/s3/s3Service");
const snsPublisher_1 = require("../../services/publisher/snsPublisher");
const appConfig_2 = require("../../config/appConfig");
class HandleHookResponse {
    constructor(response) {
        this.TopicArn = appConfig_2.topicArn;
        this.Provider = 'Mailgun';
        this.mimeType = 'application/json';
        this.extensionType = 'json';
        this.response = response;
    }
    async processData() {
        this.validateHook();
        const s3Response = await this.saveResponse();
        const snsResponse = await this.publishResponse();
        return { s3Response, snsResponse };
    }
    validateHook() {
        const signatureParams = this.response.signature;
        const result = validators_1.verifyHookResponse(appConfig_1.signingKey, signatureParams);
        if (!result) {
            throw Error("webhook isn't valid");
        }
    }
    extractFileSaveProperties() {
        const eventData = this.response['event-data'];
        const fileData = {
            name: eventData.event,
            type: this.mimeType,
            extension: this.extensionType,
            content: JSON.stringify(this.response),
        };
        return fileData;
    }
    async saveResponse() {
        const file = this.extractFileSaveProperties();
        const sendData = new s3Service_1.S3Service();
        const upload = await sendData.upload(file);
        return upload;
    }
    extractFilePublishProperties() {
        const eventData = this.response['event-data'];
        const event = eventData.event;
        const timestamp = eventData.timestamp;
        const hookMessage = {
            Provider: this.Provider,
            timestamp: timestamp,
            type: `email ${event}`,
        };
        const response = {
            Message: JSON.stringify(hookMessage),
            TopicArn: this.TopicArn,
        };
        return response;
    }
    async publishResponse() {
        const publisher = new snsPublisher_1.SnsPublisher();
        const params = this.extractFilePublishProperties();
        const value = await publisher.publish(params);
        return value;
    }
}
exports.HandleHookResponse = HandleHookResponse;
