import { Spinner } from "./ui/spinner";

export function Loader(){
     return (
      <div className="flex items-center gap-4">
        <Spinner />
      </div>
     )
}