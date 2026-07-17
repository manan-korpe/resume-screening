import api from "../../config/axios.ts";
import type { Register, Login, ResetPassword} from "../type/auth.type.ts";

async function login(data:Login){
    const response = await api.post("/login",data);
    return response.data;
}

async function register(data:Register){
    const response = await api.post("/register",data);
    return response.data;
}

async function resetPassword(data:ResetPassword){
    const response = await api.post("/resetpassword",data);
    return response.data;
}

async function logout(){
    const response = await api.get("/logout");
    return response.data;
}

async function me(){
    const response = await api.get("/me");
    return response.data?.data;
}
export {
    login,
    register,
    resetPassword,
    logout,
    me
}
