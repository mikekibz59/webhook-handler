"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const s3_service_1 = require("./services/s3/s3_service");
const lambdaHandler = async () => {
    const upload = new s3_service_1.S3Service();
    const samplePayload = {
        name: 'mike',
    };
    const file = {
        name: 'example',
        type: 'json',
        content: JSON.stringify(samplePayload),
        extension: 'json',
    };
    const path = await upload.upload(file);
    console.log(path);
    return {
        status: 200,
        body: path,
    };
};
lambdaHandler();
