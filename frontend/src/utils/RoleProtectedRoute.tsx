import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleProtectedRoute({allowedRoles}:{allowedRoles:number[]}){
    const {data:user, isPending} = useAuth();
    console.log(user)
    console.log(allowedRoles)
    if(isPending) return <Loader/>

    if(!user) return <Navigate to="/auth/login" replace/>

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/403" replace/>
    }
    return <Outlet/>
}