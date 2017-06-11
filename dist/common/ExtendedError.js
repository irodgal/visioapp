"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExtendedError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ExtendedError = ExtendedError;
exports.default = ExtendedError;
