import z from "zod";

export const couponSchema = z.object({
    code: z.string().min(3, "Coupon code must be at least 3 characters long"),
    discountRate: z.number().min(1, "Discount rate must be at least 1%").max(100, "Discount rate must be at most 100%"),
    maxUses: z.number().min(1, "Max uses must be at least 1"),
    expiryDate: z.string().min(1, "Expiry date is required"),
})