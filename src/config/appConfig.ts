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
export const awsSecretKey = String(process.env.AWS_SECRET_KEY);
export const awsAccessKey = String(process.env.AWS_ACCESS_KEY);
export const s3BucketName = String(process.env.S3_BUCKET_NAME);
export const region = String(process.env.AWS_REGION);
export const signingKey = String(process.env.SIGNING_KEY)
export const topicArn = String(process.env.TOPIC_ARN)
