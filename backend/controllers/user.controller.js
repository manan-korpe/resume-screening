import asyncHandler from "../utils/asyncHandler.js";
import ResponseHalper from "../utils/responseHalper.js";

const register = asyncHandler(async(req, res, next)=>{
    ResponseHalper.success(res, "user created successful. ");
});

const login = asyncHandler(async(req, res, next)=>{
    
});

const logout = asyncHandler(async(req, res, next)=>{
    
});

const forgetPassword = asyncHandler(async(req, res, next)=>{
    
});

const resetPassword = asyncHandler(async(req, res, next)=>{
    
});

export {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword
};