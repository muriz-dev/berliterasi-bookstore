import { Elysia } from "elysia";

export const app = new Elysia().get("/", () => "Hello Elysia");

app.get("/books", () => {
	return {
		data: [],
	};
});

if (import.meta.main) {
	app.listen(3000);

	console.log(
		`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
	);
}
