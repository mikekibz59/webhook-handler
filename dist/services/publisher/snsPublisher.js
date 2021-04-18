"use strict";
/**
 * File responsible for publishing messages
 * to AWS so that it can be subscribed by
 * other services/ apps
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsPublisher = void 0;
const sns_1 = __importDefault(require("aws-sdk/clients/sns"));
const appConfig_1 = require("../../config/appConfig");
class SnsPublisher {
    constructor() {
        this.client = new sns_1.default({
            region: appConfig_1.region,
            accessKeyId: appConfig_1.awsAccessKey,
            secretAccessKey: appConfig_1.awsSecretKey,
        });
    }
    async publish(data) {
        try {
            const response = await this.publishPayload(data);
            return response;
        }
        catch (error) {
            console.error('sns error', error);
            return undefined;
        }
    }
    publishPayload(params) {
        return new Promise((resolve, reject) => {
            this.client.publish(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
        });
    }
}
exports.SnsPublisher = SnsPublisher;
