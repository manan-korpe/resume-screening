import express from "express";
import 'dotenv/config';
import errorHandler from "./middleware/errorHandler.js";
import asyncHandler from  "./utils/asyncHandler.js";
import cookieParser from "cookie-parser";
//routers
import userRouter from "./routes/v1/user.router.js";


const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",asyncHandler(async (req, res,next)=>{
    res.statusCode = 400;
    throw new Error("Demo to check error");
}));

app.use("/v1",userRouter);

app.use(errorHandler);
app.listen(PORT, HOST,console.log(`http://${HOST}:${PORT}`));