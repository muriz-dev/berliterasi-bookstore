import { t, Static } from 'elysia'

export const responseSchema = t.Object({
    id: t.String({
        description: "ID of the category using UUID v7",
    }),
    name: t.String({
        description: "Name of the category",
    }),
    createdAt: t.Date({
        description: "Timestamp when the category was created",
    }),
    updatedAt: t.Date({
        description: "Timestamp when the category was last updated",
    })
})

export const paramsSchema = t.Object({
    id: t.String({
        description: "ID of the category using UUID v7",
        format: "uuid",
    })
});

export const createCategorySchema = t.Object({
    name: t.String({
        description: "Name of the category",
    })
});

export const updateCategorySchema = createCategorySchema;

export type CategoryId = Static<typeof paramsSchema>["id"];
export type CreateCategoryInput = Static<typeof createCategorySchema>;
export type UpdateCategoryInput = Static<typeof updateCategorySchema>;
