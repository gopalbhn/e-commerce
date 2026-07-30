import z from "zod"

export const ProductCreateSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.number(),
    stock: z.number(),
    category: z.string().min(1, "Product category is required"),
    discountRate: z.number().optional(),
    sku: z.string(),
    brand: z.string().min(1, "Product brand is required"),
    subcategory: z.string().min(1, "Product subcategory is required"),
    specification: z.array(z.object({
        key: z.string().min(1, "Specification key is required"),
        value: z.string().min(1, "Specification value is required")
    }))
});

export const ProductUpdateSchema = z.object({
    name: z.string().min(1, "Product name is required").optional(),
    description: z.string().min(1, "Product description is required").optional(),
    price: z.string().optional(),
    stock: z.string().optional(),
    category: z.string().min(1, "Product category is required").optional(),
    subcategory: z.string().min(2, "Subcategory is required").optional(),
    brand: z.string().min(2, "Brand is Required").optional(),
    seller: z.string().min(1, "Product seller is required").optional(),
    discountRate: z.string().optional(),
});