import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { treaty } from '@elysia/eden'
import { db } from "../../db/connection";
import { bookCategories } from "../../db/schema";
import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { app } from '../../index'

const api = treaty(app)

describe("Categories Module", () => {
    describe("GET /categories", () => {
        it("should return list of categories", async () => {
            const { status, data } = await api.categories.get();

            expect(status).toBe(200);

            expect(data).toHaveProperty("data");

            expect(Array.isArray(data?.data)).toBe(true);
        });
    });

    describe("GET /categories/:id", () => {
        let categoryId: string;

        beforeEach(async () => {
            const [ result ] = await db.insert(bookCategories).values({
                name: "Fiction",
            }).returning({ id: bookCategories.id });

            categoryId = result.id;
        });

        afterEach(async () => {
            await db.delete(bookCategories).where(eq(bookCategories.id, categoryId));
        });

        it("should return category by id", async () => {
            const { status, data } = await api.categories({ id: categoryId }).get();

            expect(status).toBe(200);

            expect(data).toHaveProperty("data");

            expect(data?.data?.name).toBe("Fiction");
        });

        it("should return 404 when category not found", async () => {
            const { status } = await api.categories({ id: uuidv7() }).get();

            expect(status).toBe(404);
        });

        it("should return 422 when request parameter is invalid", async () => {
            const { status } = await api.categories({ id: "wrong" }).get();

            expect(status).toBe(422);
        });
    });

    describe("POST /categories", () => {
        beforeEach(async () => {
            await db.delete(bookCategories).where(eq(bookCategories.name, "Non-Fiction"));
        });

        afterEach(async () => {
            await db.delete(bookCategories).where(eq(bookCategories.name, "Non-Fiction"));
        });

        it("should create a new category", async () => {
            const { status, data } = await api.categories.post({
                name: "Non-Fiction",
            });

            expect(status).toBe(201);

            expect(data).toHaveProperty("data");

            expect(data?.data?.name).toBe("Non-Fiction");
        });

        it("should return 422 when request body is invalid", async () => {
            const { status } = await api.categories.post({
                // Missing required field
            } as any);

            expect(status).toBe(422);
        });
    });

    describe("PUT /categories/:id", () => {
        let categoryId: string;

        beforeEach(async () => {
            const [ result ] = await db.insert(bookCategories).values({
                name: "Fantasy",
            }).returning({ id: bookCategories.id });

            categoryId = result.id;
        });

        afterEach(async () => {
            await db.delete(bookCategories).where(eq(bookCategories.id, categoryId));
        });

        it("should update category by id", async () => {
            const { status, data } = await api.categories({ id: categoryId }).put({
                name: "Horror",
            });

            expect(status).toBe(200);

            expect(data).toHaveProperty("data");

            expect(data?.data?.name).toBe("Horror");
        });

        it("should return 404 when category not found", async () => {
            const { status } = await api.categories({ id: uuidv7() }).put({
                name: "Horror",
            });

            expect(status).toBe(404);
        });

        it("should return 422 when request parameter is invalid", async () => {
            const { status } = await api.categories({ id: "wrong" }).put({
                name: "Horror",
            });

            expect(status).toBe(422);
        });

        it("should return 422 when request body is invalid", async () => {
            const { status } = await api.categories({ id: categoryId }).put({
                // Missing required field
            } as any);

            expect(status).toBe(422);
        });
    });

    describe("DELETE /categories/:id", () => {
        let categoryId: string;

        beforeEach(async () => {
            const [ result ] = await db.insert(bookCategories).values({
                name: "Self-Help",
            }).returning({ id: bookCategories.id });

            categoryId = result.id;
        });

        afterEach(async () => {
            await db.delete(bookCategories).where(eq(bookCategories.id, categoryId));
        });

        it("should delete category by id", async () => {
            const { status } = await api.categories({ id: categoryId }).delete();

            expect(status).toBe(204);
        });

        it("should return 404 when category not found", async () => {
            const { status } = await api.categories({ id: uuidv7() }).delete();

            expect(status).toBe(404);
        });

        it("should return 422 when request parameter is invalid", async () => {
            const { status } = await api.categories({ id: "wrong" }).delete();

            expect(status).toBe(422);
        });
    });
});
