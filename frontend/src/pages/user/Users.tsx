import { Button } from "@/components/ui/button.tsx";
import { columns } from "./columns";
import { DataTable } from "@/components/Data-Table.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/api/user.api.ts";
import { Loader } from "@/components/Loader.tsx";

export default function DemoPage() {
  const [page,setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(10);

  const {data=[], isLoading} = useQuery({
    queryKey:["users",page,pageSize],
    queryFn:()=>getUsers(page,pageSize),
     refetchOnWindowFocus: false,
  });

  if(isLoading) return <Loader/>;
  console.log(data);

  return (
    <div className="container mx-auto ">
      <div className="flex justify-end">
        <Button>
          <Link to="/admin/hrregister">Create </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  );
}
