import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHalper from "../utils/responseHalper.js";
import {query} from "../config/db.js";

const authenticate = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("bearer","");
    console.log(req.cookies);
    if(!token){
        ResponseHalper.error(res, "Access denied.",401);
    }

    const {id, email} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    let user = await query("select * from users where id=$1 and email=$2",[id, email]);
    user = user.rows[0];

    if(!user){
        ResponseHalper.error(res, "Access denied.",401);
    }

    req.user = user;
    next();
});

export {
    authenticate
};