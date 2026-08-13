import Elysia from "elysia";
import { ApiError } from "../utils/api-error";
import { appLogger } from "../utils/logger";

const isBetterAuthError = (
    err: unknown
): err is Error & { statusCode: number } => {
    return (
        err instanceof Error &&
        err.name === "APIError" &&
        "statusCode" in err &&
        typeof (err as Record<string, unknown>).statusCode === "number"
    );
};

export const errorHandler = new Elysia({ name: "error-handler" })
    .use(appLogger)
    .onError(({ code, error, set, request, log }) => {
        let statusCode = 500;
        let message = "Internal server error";
        let errors: unknown;

        if (error instanceof SyntaxError) {
            statusCode = 400;
            message = "Invalid request body";
        } else if (error instanceof ApiError) {
            statusCode = error.statusCode;
            message = error.message;
            errors = error.errors;
        } else if (isBetterAuthError(error)) {
            statusCode = error.statusCode;
            message = error.message;
        } else if (code === "NOT_FOUND") {
            statusCode = 404;
            message = "Route not found";
        } else if (code === "VALIDATION") {
            statusCode = 400;
            message = "Validation Error";
            errors = (error as any).all;
        }

        const url = new URL(request.url);
        const path = `${request.method} ${url.pathname}`;

        if (statusCode >= 500) {
            log?.error(
                { err: error, statusCode, path },
                "HTTP handler error: %s",
                message
            );
        } else {
            log?.warn(
                { statusCode, path },
                "HTTP handler client error: %s",
                message
            );
        }

        set.status = statusCode;

        return {
            success: false,
            message,
            statusCode,
            ...(errors !== undefined && { errors }),
            ...(Bun.env.NODE_ENV === "development" && { stack: (error as Error).stack })
        };
    });
