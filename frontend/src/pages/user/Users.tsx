import { Button } from "@/components/ui/button.tsx";
import { columns } from "./columns";
import { DataTable } from "./Data-Table.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/api/user.api.ts";
import { Loader } from "@/components/Loader.tsx";
import { apiErrorHandler } from "@/utils/apiErrorHandler.ts";

export default function DemoPage() {
  // const data = [
  //   {
  //     id: 1,
  //     name: "Manan",
  //     email: "manan@gmail.com",
  //     role: 1,
  //     created_at: "2026-07-16",
  //   },
  //   {
  //     id: 2,
  //     name: "Rahul",
  //     email: "rahul@gmail.com",
  //     role: 2,
  //     created_at: "2026-07-15",
  //   },
  //   {
  //     id: 3,
  //     name: "Priya",
  //     email: "priya@gmail.com",
  //     role: 1,
  //     created_at: "2026-07-14",
  //   },
  //   {
  //     id: 4,
  //     name: "Amit",
  //     email: "amit@gmail.com",
  //     role: 3,
  //     created_at: "2026-07-13",
  //   },
  //   {
  //     id: 5,
  //     name: "Sneha",
  //     email: "sneha@gmail.com",
  //     role: 2,
  //     created_at: "2026-07-12",
  //   },
  //   {
  //     id: 6,
  //     name: "Vivek",
  //     email: "vivek@gmail.com",
  //     role: 1,
  //     create_at: "2026-07-11",
  //   },
  //   {
  //     id: 7,
  //     name: "Neha",
  //     email: "neha@gmail.com",
  //     role: 2,
  //     create_at: "2026-07-10",
  //   },
  //   {
  //     id: 8,
  //     name: "Karan",
  //     email: "karan@gmail.com",
  //     role: 3,
  //     create_at: "2026-07-09",
  //   },
  //   {
  //     id: 9,
  //     name: "Riya",
  //     email: "riya@gmail.com",
  //     role: 1,
  //     create_at: "2026-07-08",
  //   },
  //   {
  //     id: 10,
  //     name: "Arjun",
  //     email: "arjun@gmail.com",
  //     role: 2,
  //     create_at: "2026-07-07",
  //   },
  // ];
  const [page,setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(10);

  const {data,isError,error, isLoading} = useQuery({
    queryKey:["users",page,pageSize],
    queryFn:()=>getUsers(page,pageSize),
    
  });
  if(isLoading) return <Loader/>;
  console.log(data);
  
  if(isError) {
    return <h1>{apiErrorHandler(error)}</h1>
  }

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
