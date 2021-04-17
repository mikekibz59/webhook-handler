/**
 * Aws config file:
 * Reads in the .env file and exports
 * environment files needed by other
 * modules
 *
 * @format
 */

import { config } from 'dotenv';

// load env variables
config();

//instantiate env variables
export const aws_secret_key = String(process.env.AWS_SECRET_KEY);
export const aws_access_key = String(process.env.AWS_ACCESS_KEY);
export const s3_bucket_name = String(process.env.S3_BUCKET_NAME);
export const region = String(process.env.AWS_REGION);
