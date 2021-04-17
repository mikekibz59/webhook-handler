"use strict";
/**
 * lib file that will handle validation of webhook
 * responses
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHookResponse = void 0;
const crypto_1 = __importDefault(require("crypto"));
const verifyHookResponse = (signKey, params) => {
    const encodedToken = crypto_1.default.createHmac('sha256', signKey)
        .update(params.timestamp.concat(params.token))
        .digest('hex');
    return encodedToken === params.signature;
};
exports.verifyHookResponse = verifyHookResponse;
