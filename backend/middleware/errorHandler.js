
const errorHandler = (err, req, res, next) => {
    console.error(`\x1b[31mError Intercepted: ${err.message} \x1b[0m`);
    console.log(res.statusCode);
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors || null,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export default errorHandler;
