"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleErrorResponse = void 0;
// handleErrorResponse
const handleErrorResponse = (res, error) => {
    if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
    }
    else {
        return res.status(400).json({ error: 'An unknown error occurred.' });
    }
};
exports.handleErrorResponse = handleErrorResponse;
// handleCustomError
const handleError = (error, defaultMessage) => {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error(defaultMessage);
};
exports.handleError = handleError;
