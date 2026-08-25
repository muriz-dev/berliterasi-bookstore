import { db } from "../../db/connection";
import { bookCategories } from "../../db/schema";
import type { CategoryId, CreateCategoryInput, UpdateCategoryInput } from "./category.schema";
import { eq } from "drizzle-orm";


const findAll = async () => {
    return await db.query.bookCategories.findMany();
};

const findById = async (id: CategoryId) => {
    return await db.query.bookCategories.findFirst({
        where: {
            id
        }
    });
};

const create = async (category: CreateCategoryInput) => {
    const [ result ] = await db.insert(bookCategories).values(category).returning();

    return result;
};

const update = async (id: CategoryId, category: UpdateCategoryInput) => {
    const [ result ] = await db.update(bookCategories).set(category).where(eq(bookCategories.id, id)).returning();

    return result;
};

const remove = async (id: CategoryId) => {
    return await db.delete(bookCategories).where(eq(bookCategories.id, id));
};

export default {
    findAll,
    findById,
    create,
    update,
    remove,
};
