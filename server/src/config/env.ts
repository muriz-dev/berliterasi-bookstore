import { z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    LOG_LEVEL: z
        .enum(["fatal", "error", "warn", "info", "debug", "trace"])
        .default("info"),
    PORT: z.string().regex(/^\d+$/, "PORT must be a number").transform(Number),

    CORS_ORIGIN: z
        .string()
        .transform((s) => s.split(",").map((o) => o.trim()))
        .optional(),

    DATABASE_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("Invalid environment configuration");
    console.error(z.treeifyError(result.error));
    process.exit(1);
}

const env: Readonly<Env> = Object.freeze(result.data);

export default env;