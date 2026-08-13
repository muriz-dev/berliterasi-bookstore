import { Elysia } from "elysia";
import env from "./config/env";
import { appLogger } from "./utils/logger";
import { securityHeaders } from "./middlewares/security-header";
import { errorHandler } from "./middlewares/error-handler";

export const app = new Elysia()
	.use(appLogger)
	.use(securityHeaders)
	.use(errorHandler)
	.get("/", () => "Hello Elysia");

app.get("/books", () => {
	return {
		data: [],
	};
});

if (import.meta.main) {
	app.listen(env.PORT);

	console.log(
		`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
	);
}
