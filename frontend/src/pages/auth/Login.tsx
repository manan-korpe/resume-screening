import { cn } from "@/lib/utils"
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {login} from "../../services/api/auth.api.ts"
import { apiErrorHandler } from "@/utils/apiErrorHandler.ts"

export function Login({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const mutation = useMutation({
    mutationFn:login,
    onSuccess:async ()=>{
      await queryClient.invalidateQueries({
        queryKey:["auth"]
      });
      navigate("/",{
        replace:true
      });
    },
    onError: (err) => apiErrorHandler(err),
  });

  const loginHandler = (e:React.SubmitEvent)=>{
    e.preventDefault();
    mutation.mutate({
      email,password
    });
  }

  return (
    <form onSubmit={loginHandler} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <CircleUserRound className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account 
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input onChange={(e)=>setEmail((e.target.value))} id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input onChange={(e)=>setPassword((e.target.value))} id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <Field>
          
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default Login;