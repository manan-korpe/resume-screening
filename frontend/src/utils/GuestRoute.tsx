import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { Loader } from "@/components/Loader";

export default function GuestRoute(){
    const {data:user, isPending} = useAuth();

    if(isPending) return <Loader/>

    if(user) return <Navigate to="/" replace/>
    
    return <Outlet/>
}  