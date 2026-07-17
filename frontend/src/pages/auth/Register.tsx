import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField.tsx";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/api/auth.api.ts";
import { apiErrorHandler } from "@/utils/apiErrorHandler.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "@/services/validation/register.ts";

export function Register({ className, ...props }: React.ComponentProps<"form">) {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "m@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
    },
  ];

  const navigate = useNavigate();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (err) => apiErrorHandler(err),
  });

  const registerHadler = (data: RegisterFormData) => {
    console.log(data);
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
            <CircleUserRound className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        {fields.map((field) => (
          <FormField key={field.name} control={form.control} {...field} />
        ))}
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/auth/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default Register;
