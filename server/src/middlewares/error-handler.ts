import Elysia, { type ValidationError } from "elysia";
import { appLogger } from "../utils/logger";
import { ApiError } from "../utils/api-error";

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
    .onError(({ code, error, request, log }) => {
        let statusCode = 500;
        let message = "Internal server error";
        let errors: unknown;

        if (error instanceof ApiError) {
            statusCode = error.statusCode;
            message = error.message;
            errors = error.errors;
        } else if (error instanceof SyntaxError || code === "PARSE") {
            statusCode = 400;
            message = "Invalid request body";
        } else if (isBetterAuthError(error)) {
            statusCode = error.statusCode;
            message = error.message;
        } else if (code === "NOT_FOUND") {
            statusCode = 404;
            message = "Route not found";
        } else if (code === "VALIDATION") {
            statusCode = 422;
            message = "Validation Error";
            errors = (error as ValidationError).all;
        }

        const url = new URL(request.url);
        const path = `${request.method} ${url.pathname}`;

        const isServerError = statusCode >= 500;

        if (isServerError) {
            log?.error({ err: error, statusCode, path }, "HTTP handler error: %s", message);
        } else {
            log?.warn({ statusCode, path, ...(errors ? { errors } : {}) }, "HTTP handler client error: %s", message);
        }

        const stack = error instanceof Error ? error.stack : undefined;

        return new Response(
            JSON.stringify({
                success: false,
                message,
                statusCode,
                timestamp: new Date().toISOString(),
                ...(errors !== undefined ? { errors } : {}),
                ...(Bun.env.NODE_ENV === "development" && stack ? { stack } : {})
            }),
            { status: statusCode, headers: { "Content-Type": "application/json" } }
        );
    })
    .as("global");