import { Elysia } from "elysia";
import { openapi } from '@elysia/openapi'
import env from "./config/env";
import { appLogger } from "./utils/logger";
import { securityHeaders } from "./middlewares/security-header";
import { errorHandler } from "./middlewares/error-handler";
import { categoryRoutes } from "./modules/categories/category.route";

const globalMiddlewares = new Elysia()
	.use(appLogger)
	.use(securityHeaders)
	.use(errorHandler)
	.use(openapi({
		documentation: {
			info: {
				title: "Elysia API Docs",
				description: "Elysia API Documentation",
				version: "1.0.0",
			},
		},
	}));

export const app = new Elysia()
	.use(globalMiddlewares)
	.get("/", () => "Hello Elysia")
	.use(categoryRoutes);

if (import.meta.main) {
	app.listen(env.PORT);

	console.log(
		`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
	);
}
