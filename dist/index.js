"use strict";
/**
 * handler function that aws lambda
 * will hook to
 * @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const handleHook_1 = require("./lib/webhooks/handleHook");
const lambdaHandler = async (event) => {
    const data = JSON.parse(event);
    const response = new handleHook_1.HandleHookResponse(data).processData();
    return {
        status: 200,
        data: response,
    };
};
exports.lambdaHandler = lambdaHandler;
