import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Page403() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg border shadow-lg">
        <CardContent className="flex flex-col items-center space-y-6 p-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>

          <div className="rounded-full border bg-muted px-4 py-1 text-sm font-medium">
            Error 403
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Access Forbidden
            </h1>

            <p className="text-muted-foreground">
              You don't have permission to access this page. If you believe this
              is a mistake, contact your administrator or try signing in with an
              account that has the required permissions.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <a href="/support">
                Contact Support
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}