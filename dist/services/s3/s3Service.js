"use strict";
/**
 * S3 services module:
 * it is responsible to instantiating as S3
 * bucket and operations done on it
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const appConfig_1 = require("../../config/appConfig");
class S3Service {
    constructor() {
        this.bucketName = appConfig_1.s3BucketName;
        this.client = new s3_1.default({
            region: appConfig_1.region,
            accessKeyId: appConfig_1.awsAccessKey,
            secretAccessKey: appConfig_1.awsSecretKey,
        });
    }
    async upload(file) {
        try {
            const path = await this.uploadFile(file);
            return { path };
        }
        catch (error) {
            console.error('s3 error', error);
            return undefined;
        }
    }
    generateKey(file, timestamp) {
        return `${file.name}-${timestamp}.${file.extension}`;
    }
    async uploadFile(file) {
        const timestamp = Date.now();
        const fileKey = this.generateKey(file, timestamp);
        await this.client
            .putObject({
            Bucket: this.bucketName,
            Key: fileKey,
            ContentType: file.type,
            Body: file.content,
        })
            .promise();
        return `${this.bucketName}/${fileKey}`;
    }
}
exports.S3Service = S3Service;
