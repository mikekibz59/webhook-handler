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
exports.region = exports.s3_bucket_name = exports.aws_access_key = exports.aws_secret_key = void 0;
const dotenv_1 = require("dotenv");
// load env variables
dotenv_1.config();
//instantiate env variables
exports.aws_secret_key = String(process.env.AWS_SECRET_KEY);
exports.aws_access_key = String(process.env.AWS_ACCESS_KEY);
exports.s3_bucket_name = String(process.env.S3_BUCKET_NAME);
exports.region = String(process.env.AWS_REGION);
