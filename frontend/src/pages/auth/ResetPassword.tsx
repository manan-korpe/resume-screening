import { cn } from "@/lib/utils";
import { LockIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField.tsx";
import { useNavigate,Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/api/auth.api.ts";
import { apiErrorHandler } from "@/utils/apiErrorHandler.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    resetPasswordSchema,
    type ResetPasswordData
} from "@/services/validation/resetPassword.ts"

export function ResetPassword({ className, ...props }: React.ComponentProps<"form">) {
  const fields = [
    {
      name: "oldPassword",
      label: "Old Password",
      type: "password",
      placeholder:"••••••••"
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder:"••••••••"
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder:"••••••••"
    },
  ];

  const navigate = useNavigate();
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful.");
      setTimeout(()=>{
        navigate("/auth/login");
      },1000);
    },
    onError: (err) => apiErrorHandler(err),
  });

  const registerHadler = (data: ResetPasswordData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(registerHadler)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <LockIcon className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-balance text-muted-foreground">
             Create a new password for your account
          </p>
        </div>
        {fields.map((field) => (
          <FormField key={field.name} control={form.control} {...field} />
        ))}
        <Field>
          <Button type="submit">Reset Password</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Remember your password?{' '} <Link to="/auth/login">Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default ResetPassword;
