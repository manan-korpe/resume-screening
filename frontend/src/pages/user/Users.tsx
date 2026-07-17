import { columns } from "./columns"
import { DataTable } from "./Data-Table.tsx"


export default function DemoPage() {
const data = [
  {
    id: 1,
    name: "Manan",
    email: "manan@gmail.com",
    role: 1,
    created_at: "2026-07-16",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com",
    role: 2,
    created_at: "2026-07-15",
  },
  {
    id: 3,
    name: "Priya",
    email: "priya@gmail.com",
    role: 1,
    created_at: "2026-07-14",
  },
  {
    id: 4,
    name: "Amit",
    email: "amit@gmail.com",
    role: 3,
    created_at: "2026-07-13",
  },
  {
    id: 5,
    name: "Sneha",
    email: "sneha@gmail.com",
    role: 2,
    created_at: "2026-07-12",
  },
  {
    id: 6,
    name: "Vivek",
    email: "vivek@gmail.com",
    role: 1,
    create_at: "2026-07-11",
  },
  {
    id: 7,
    name: "Neha",
    email: "neha@gmail.com",
    role: 2,
    create_at: "2026-07-10",
  },
  {
    id: 8,
    name: "Karan",
    email: "karan@gmail.com",
    role: 3,
    create_at: "2026-07-09",
  },
  {
    id: 9,
    name: "Riya",
    email: "riya@gmail.com",
    role: 1,
    create_at: "2026-07-08",
  },
  {
    id: 10,
    name: "Arjun",
    email: "arjun@gmail.com",
    role: 2,
    create_at: "2026-07-07",
  },
];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}