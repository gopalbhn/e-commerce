import { z } from "zod";

export const addressSchema = z.object({
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required")
})