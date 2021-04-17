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
const aws_config_1 = require("../../config/aws_config");
class S3Service {
    constructor() {
        this.bucketName = aws_config_1.s3_bucket_name;
        this.client = new s3_1.default({
            region: aws_config_1.region,
            accessKeyId: aws_config_1.aws_access_key,
            secretAccessKey: aws_config_1.aws_secret_key,
        });
    }
    async upload(file) {
        try {
            const path = await this.uploadFile(file);
            return { path };
        }
        catch (_a) {
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
