import Register from "@/components/RegisterForm";
import { register } from "@/services/api/auth.api";
import { apiErrorHandler } from "@/utils/apiErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { type RegisterFormData } from "@/services/validation/register.ts";
import { Button } from "@/components/ui/button";

export default function HrRegister() {
  const Navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      Navigate("/");
    },
    onError: (err) => apiErrorHandler(err),
  });

  const registerHadler = (data: RegisterFormData) => {
    console.log(data);
    mutation.mutate({...data,role:"1"});
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-80 mt-4">
          <Register registerHadler={registerHadler} isUser={false}/>
        </div>
      </div>
    </>
  );
}
