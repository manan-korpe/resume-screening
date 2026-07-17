import { createBrowserRouter } from "react-router-dom";
//layout
import AuthLayout from "../layouts/Auth.layout.tsx";
import MainLayout from "../layouts/main.layout.tsx";
//pages
import ProtectedRoute from "@/utils/ProtectedRoute.tsx";
import Login from "../pages/auth/Login";
import App from "../App";
import Register from "@/pages/auth/Register.tsx";
import ResetPassword from "@/pages/auth/ResetPassword.tsx";
import GuestRoute from "@/utils/GuestRoute.tsx";
import Users from "@/pages/user/Users.tsx";
import HrRegister from "@/pages/admin/HrRegister.tsx";
import Page403 from "@/pages/403.tsx";
import RoleProtectedRoute from "@/utils/RoleProtectedRoute.tsx";
import Home from "@/pages/Home.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    element: <RoleProtectedRoute allowedRoles={[0]} />,
    children: [
      {
        path: "admin",
        element: <MainLayout />,
        children: [
          {
            path: "hrregister",
            element: <HrRegister />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "resetpassword",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
  {
    path: "403",
    element: <Page403 />,
  },
]);
