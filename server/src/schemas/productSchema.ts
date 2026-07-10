import z from "zod"

export const ProductCreateSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.number().positive("Price must be positive"),
    stock: z.number().nonnegative("Stock must be non-negative"),
    thumbnails: z.string().url("Invalid URL for thumbnails"),
    images: z.array(z.string().url("Invalid URL for images")),
    category: z.string().min(1, "Product category is required"),
    seller: z.string().min(1, "Product seller is required"),
});

export const ProductUpdateSchema = z.object({
    name: z.string().min(1, "Product name is required").optional(),
    description: z.string().min(1, "Product description is required").optional(),
    price: z.number().positive("Price must be positive").optional(),
    stock: z.number().nonnegative("Stock must be non-negative").optional(),
    thumbnails: z.string().url("Invalid URL for thumbnails").optional(),
    images: z.array(z.string().url("Invalid URL for images")).optional(),
    category: z.string().min(1, "Product category is required").optional(),
    seller: z.string().min(1, "Product seller is required").optional(),
});