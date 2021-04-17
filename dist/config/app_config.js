"use strict";
/**
 * Aws config file:
 * Reads in the .env file and exports
 * environment files needed by other
 * modules
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.signingKey = exports.region = exports.s3BucketName = exports.awsAccessKey = exports.awsSecretKey = void 0;
const dotenv_1 = require("dotenv");
// load env variables
dotenv_1.config();
//instantiate env variables
exports.awsSecretKey = String(process.env.AWS_SECRET_KEY);
exports.awsAccessKey = String(process.env.AWS_ACCESS_KEY);
exports.s3BucketName = String(process.env.S3_BUCKET_NAME);
exports.region = String(process.env.AWS_REGION);
exports.signingKey = String(process.env.SIGNING_KEY);
