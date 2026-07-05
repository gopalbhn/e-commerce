import { z } from 'zod'

const RegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
    phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits long").max(15, "Phone Number must be at most 15 digits long"),
})

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export { RegisterSchema, LoginSchema }