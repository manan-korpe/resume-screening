import axios from "axios";
import { toast } from "sonner";

const apiErrorHandler = (err:any) =>{
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message ?? "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
    return err.response?.data?.message ?? "Something went wrong";
}

export {
    apiErrorHandler
}