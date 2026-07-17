import { logout } from "@/services/api/auth.api";
import { apiErrorHandler } from "@/utils/apiErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogout(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn:logout,
        onSuccess:async()=>{
            queryClient.removeQueries({queryKey:["me"]});
            queryClient.clear();
            navigate("/auth/login",{replace:true});
        },
        onError:(error)=>apiErrorHandler(error)
    })
}