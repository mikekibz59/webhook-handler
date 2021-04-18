/**
 * Aws config file:
 * Reads in enviroment variables and exports
 * environment constants needed by other
 * modules
 *
 * @format
 */

//instantiate env variables
export const awsSecretKey = String(process.env.IAM_AWS_SECRET_KEY);
export const awsAccessKey = String(process.env.IAM_AWS_ACCESS_KEY);
export const s3BucketName = String(process.env.S3_BUCKET_NAME);
export const region = String(process.env.IAM_AWS_REGION);
export const signingKey = String(process.env.SIGNING_KEY);
export const topicArn = String(process.env.TOPIC_ARN);
