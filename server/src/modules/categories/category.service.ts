import categoryRepository from "./category.repository";
import { CategoryId, CreateCategoryInput, UpdateCategoryInput } from "./category.schema";
import { ApiError } from "../../utils/api-error";

const getAllCategories = async () => {
    return await categoryRepository.findAll();
};

const getCategoryById = async (id: CategoryId) => {
    const category = await categoryRepository.findById(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return category;
};

const createCategory = async (category: CreateCategoryInput) => {
    return await categoryRepository.create(category);
};

const updateCategory = async (id: CategoryId, category: UpdateCategoryInput) => {
    await getCategoryById(id);

    return await categoryRepository.update(id, category);
};

const deleteCategory = async (id: CategoryId) => {
    await getCategoryById(id);

    return await categoryRepository.remove(id);
};

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
    