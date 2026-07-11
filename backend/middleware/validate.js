import ResponseHalper from "../utils/responseHalper.js";

const validate = (schema) => {
    return (req, res, next) => {
        if (!req.body) {
            ResponseHalper.error(res, 'Invalid input', 400);
        }

        const result = schema.safeParse(req.body);
        // console.log(result)
        if (!result.success) {
            ResponseHalper.error(res, "Validation failed", 400, result.error.issues);
        }
        res.body = result.data;
        next();
    }
}

export default validate;