import api from "../../config/axios.ts";

export async function getUsers(page:number,limit:number){
    const {data} = await api.get("/users",{
        params:{
            page,
            limit
        }
    });

    return data;
}