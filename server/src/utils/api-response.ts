import { STATUS_CODES } from "../constants/status-codes";
import type { StatusCode } from "../constants/status-codes";
import type { Context } from "elysia";

type ApiResponseParams<T> = {
    success: boolean;
    message: string;
    statusCode: StatusCode;
    data?: T | null;
};

export class ApiResponse<T = unknown> {
    public readonly success: boolean;
    public readonly message: string;
    public readonly statusCode: StatusCode;
    public readonly data?: T | null;

    constructor({
        success,
        message,
        statusCode,
        data
    }: ApiResponseParams<T>) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    send(set: Context["set"]) {
        set.status = this.statusCode;
        return {
            success: this.success,
            message: this.message,
            statusCode: this.statusCode,
            ...(this.data !== undefined && this.data !== null && { data: this.data })
        };
    }

    private static sendSuccess<T>(set: Context["set"], statusCode: StatusCode, message: string, data?: T | null) {
        return new ApiResponse<T>({
            success: true,
            message,
            data,
            statusCode
        }).send(set);
    }

    static ok<T>(set: Context["set"], message = "OK", data?: T) {
        return this.sendSuccess(set, STATUS_CODES.OK, message, data);
    }

    static created<T>(set: Context["set"], message = "Created", data?: T) {
        return this.sendSuccess(set, STATUS_CODES.CREATED, message, data);
    }

    static accepted<T>(set: Context["set"], message = "Accepted", data?: T) {
        return this.sendSuccess(set, STATUS_CODES.ACCEPTED, message, data);
    }

    static noContent(set: Context["set"], message = "No Content") {
        return this.sendSuccess(set, STATUS_CODES.NO_CONTENT, message, null);
    }
}

/**
 * Usage:
 * return ApiResponse.ok(set, "Success", data);
 * return ApiResponse.created(set, "Created", data);
 * return ApiResponse.accepted(set, "Accepted", data);
 * return ApiResponse.noContent(set, "No Content");
 */
