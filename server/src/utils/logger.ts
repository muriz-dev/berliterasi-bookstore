import { logger } from "@bogeychan/elysia-logger";

export const appLogger = logger({
    level: Bun.env.LOG_LEVEL || "info",
    ...(Bun.env.NODE_ENV !== "production"
        ? {
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "dd-mm-yyyy HH:MM:ss",
                    ignore: "pid,hostname",
                },
            },
        }
        : {}),
});
