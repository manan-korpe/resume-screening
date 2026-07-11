class ResponseHalper {
    static success(res,message, data = null, statusCode = 200){
        return res.status(statusCode).json({
            success:true,
            message,
            data
        });
    }

    static error(res, message = "Something went wrong", statusCode = 500, errors = null) {
        res.statusCode = statusCode;

        const err = new Error(message);
        err.errors = errors;

        throw err;
    }
}

export default ResponseHalper;