import { errorResponse } from "../utils/apiResponse.js";

export function errorHandler (err, req, res, next) {
    return errorResponse (res, {
        statusCode: err.statusCode || 500,
        message: err.message
    })
}