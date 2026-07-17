import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField.tsx";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "@/services/validation/register.ts";

function Register({registerHadler,isUser=true,className, ...props }: React.ComponentProps<"form">) {
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

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
          <h1 className="text-2xl font-bold">{isUser ? "User" : "HR"} Register</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create {isUser ? "Your" : "HR"} account
          </p>
        </div>
        {fields.map((field) => (
          <FormField key={field.name} control={form.control} {...field} />
        ))}
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        {isUser ?? <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/auth/login">Sign in</Link>
          </FieldDescription>
        </Field>}
      </FieldGroup>
    </form>
  );
}

export default Register;
