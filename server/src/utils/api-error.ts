import { STATUS_CODES } from "../constants/status-codes";
import type { StatusCode } from "../constants/status-codes";

export class ApiError extends Error {
    public readonly statusCode: StatusCode;
    public readonly isOperational: boolean;
    public readonly errors?: unknown;

    constructor(
        statusCode: StatusCode,
        message: string,
        errors?: unknown,
        isOperational = true
    ) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }

    private static create(statusCode: StatusCode, message: string, errors?: unknown) {
        return new ApiError(statusCode, message, errors);
    }

    static badRequest(message = "Bad Request", errors?: unknown) {
        return this.create(STATUS_CODES.BAD_REQUEST, message, errors);
    }

    static unauthorized(message = "Unauthorized", errors?: unknown) {
        return this.create(STATUS_CODES.UNAUTHORIZED, message, errors);
    }

    static forbidden(message = "Forbidden") {
        return this.create(STATUS_CODES.FORBIDDEN, message);
    }

    static notFound(message = "Not Found") {
        return this.create(STATUS_CODES.NOT_FOUND, message);
    }

    static conflict(message = "Conflict") {
        return this.create(STATUS_CODES.CONFLICT, message);
    }

    static unprocessableEntity(message = "Unprocessable Entity", errors?: unknown) {
        return this.create(STATUS_CODES.UNPROCESSABLE_ENTITY, message, errors);
    }

    static server(message = "Internal Server Error") {
        return this.create(STATUS_CODES.INTERNAL_SERVER_ERROR, message);
    }

    static tooManyRequests(message = "Too Many Requests") {
        return this.create(STATUS_CODES.TOO_MANY_REQUESTS, message);
    }
}

/*
  ? Usage:
  * throw new ApiError(404, "Not found");
  * throw ApiError.badRequest("Bad request", errors);
  * throw ApiError.unprocessableEntity("Validation failed", errors);
 */
