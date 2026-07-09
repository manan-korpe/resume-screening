import ResponseHalper from "../utils/responseHalper.js";

const validate = (schema) => {
    return (req, res, next)=>{
        const {error} = schema.validate(req.body);

        if(error){
            ResponseHalper.error(res, error.details[0].message,400);
        }

        next();
    }
}

export default validate;