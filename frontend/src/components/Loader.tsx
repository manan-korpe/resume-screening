import { Spinner } from "@/components/ui/spinner";

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-8" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}