import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { Loader } from "@/components/Loader";

export default function ProtectedRoute(){
    const {data:user, isPending} = useAuth();

    if(isPending) return <Loader/>

    if(!user) return <Navigate to="/auth/login" replace/>

    return <Outlet/>
}  