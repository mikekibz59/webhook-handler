"use strict";
/**
 * Aws config file:
 * Reads in enviroment variables and exports
 * environment constants needed by other
 * modules
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicArn = exports.signingKey = exports.region = exports.s3BucketName = exports.awsAccessKey = exports.awsSecretKey = void 0;
//instantiate env variables
exports.awsSecretKey = String(process.env.IAM_AWS_SECRET_KEY);
exports.awsAccessKey = String(process.env.IAM_AWS_ACCESS_KEY);
exports.s3BucketName = String(process.env.S3_BUCKET_NAME);
exports.region = String(process.env.IAM_AWS_REGION);
exports.signingKey = String(process.env.SIGNING_KEY);
exports.topicArn = String(process.env.TOPIC_ARN);
