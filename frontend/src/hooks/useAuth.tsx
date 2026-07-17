import { useQuery } from "@tanstack/react-query"
import {me} from "@/services/api/auth.api.ts"

export const useAuth = () => {
    return useQuery({
        queryKey:["auth"],
        queryFn:me,
        retry:false,
        staleTime:1000*60*5
    });
};
