import joi from "joi";
const registerSchema = joi.object({
    name:joi.string()
    .min(3)
    .max(20)
    .trim()
    .required(),
    
    email:joi.string()
    .email()
    .lowercase()
    .required(),
    
    password:joi.string()
    .min(8)
    .max(20)
    .required(),
    
    role:joi.number()
    .valid(0,1,2,3)
    .default(0),
});

export default registerSchema;