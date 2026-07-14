import api from "../../config/axios.ts";

async function login(data:{email:string,password:string}){
    const response = await api.post("/login",data);
    return response.data;
}

export {
    login
}
