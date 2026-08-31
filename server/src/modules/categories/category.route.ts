import { Elysia } from 'elysia'
import categoryController from './category.controller'
import { paramsSchema, createCategorySchema, updateCategorySchema } from './category.schema'

export const categoryRoutes = new Elysia()
    .get("/categories", categoryController.getAllCategories, {
        detail: {
            tags: ["Category"],
            summary: "Get all categories",
            description: "Retrieve a list of all book categories.",
            security: [{
                bearerAuth: []
            }],
            responses: {
                200: { description: 'Categories fetched successfully' },
                401: { description: 'Unauthorized' },
            }
        },
    })
    .get("/categories/:id", categoryController.getCategoryById, {
        params: paramsSchema,
        detail: {
            tags: ["Category"],
            summary: "Get category by id",
            description: "Retrieve a category by its ID.",
            security: [{
                bearerAuth: []
            }],
            responses: {
                200: { description: 'Category fetched successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Category not found' },
            }
        },
    })
    .post("/categories", categoryController.createCategory, {
        body: createCategorySchema,
        detail: {
            tags: ["Category"],
            summary: "Create category",
            description: "Create a new category.",
            security: [{
                bearerAuth: []
            }],
            responses: {
                201: { description: 'Category created successfully' },
                401: { description: 'Unauthorized' },
            }
        },
    })
    .put("/categories/:id", categoryController.updateCategory, {
        params: paramsSchema,
        body: updateCategorySchema,
        detail: {
            tags: ["Category"],
            summary: "Update category",
            description: "Update a category by its ID.",
            security: [{
                bearerAuth: []
            }],
            responses: {
                200: { description: 'Category updated successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Category not found' },
            }
        },
    })
    .delete("/categories/:id", categoryController.deleteCategory, {
        params: paramsSchema,
        detail: {
            tags: ["Category"],
            summary: "Delete category",
            description: "Delete a category by its ID.",
            security: [{
                bearerAuth: []
            }],
            responses: {
                204: { description: 'Category deleted successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Category not found' },
            }
        },
    })
