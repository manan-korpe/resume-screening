import {z} from "zod";

const registerSchema = z.object({
    name:z.string()
    .min(3)
    .max(20)
    .trim(),
    
    email:z.string()
    .email()
    .toLowerCase(),
    
    password:z.string()
    .min(8)
    .max(20),
    
    role:z.enum(["0","1","2","3"])
    .default("0"),
});

const loginSchema = z.object({
    email:z.string()
    .email()
    .toLowerCase(),

    password:z.string()
    .min(8)
});

export {
    registerSchema,
    loginSchema
};