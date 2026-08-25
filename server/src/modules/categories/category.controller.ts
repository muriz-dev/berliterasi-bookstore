import categoryService from "./category.service";
import type { CategoryId, CreateCategoryInput, UpdateCategoryInput } from "./category.schema";
import { ApiResponse } from "../../utils/api-response";
import type { Context } from "elysia";

export const getAllCategories = async ({ set }: Context) => {
    const categories = await categoryService.getAllCategories();

    return ApiResponse.ok(set, "Categories fetched successfully", categories);
};

export const getCategoryById = async ({ params, set }: Context) => {
    const { id } = params;
    const category = await categoryService.getCategoryById(id as CategoryId);

    return ApiResponse.ok(set, "Category fetched successfully", category);
};

export const createCategory = async ({ body, set }: Context) => {
    const category = await categoryService.createCategory(body as CreateCategoryInput);

    return ApiResponse.created(set, "Category created successfully", category);
};

export const updateCategory = async ({ params, body, set }: Context) => {
    const { id } = params;
    const category = await categoryService.updateCategory(id as CategoryId, body as UpdateCategoryInput);

    return ApiResponse.ok(set, "Category updated successfully", category);
};

export const deleteCategory = async ({ params, set }: Context) => {
    const { id } = params;
    await categoryService.deleteCategory(id as CategoryId);

    return ApiResponse.noContent(set, "Category deleted successfully");
};

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};