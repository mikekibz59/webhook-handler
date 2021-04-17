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
const s3_service_1 = require("../../services/s3/s3_service");
class HandleHookResponse {
    constructor(response) {
        this.response = response;
    }
    processData() {
        this.validateHook();
        const path = this.saveResponse();
        return path;
    }
    validateHook() {
        const signatureParams = this.response.signature;
        const result = validators_1.verifyHookResponse(appConfig_1.signingKey, signatureParams);
        if (!result) {
            throw Error("webhook isn't valid");
        }
    }
    extractFileProperties() {
        const eventData = this.response['event-data'];
        const fileData = {
            name: eventData.event,
            type: 'application/json',
            extension: 'json',
            content: JSON.stringify(this.response),
        };
        return fileData;
    }
    async saveResponse() {
        const file = this.extractFileProperties();
        const sendData = new s3_service_1.S3Service();
        const upload = await sendData.upload(file);
        return upload;
    }
}
exports.HandleHookResponse = HandleHookResponse;
