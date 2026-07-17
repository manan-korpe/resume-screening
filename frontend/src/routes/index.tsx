import { createBrowserRouter } from "react-router-dom";
//layout
import AuthLayout from "../layouts/Auth.layout.tsx";
import MainLayout from "../layouts/main.layout.tsx";
//pages
import ProtectedRoute from "@/pages/ProtectedRoute.tsx";
import Login from "../pages/auth/Login";
import App from "../App";
import Register from "@/pages/auth/Register.tsx";
import ResetPassword from "@/pages/auth/ResetPassword.tsx";
import GuestRoute from "@/pages/GuestRoute.tsx";
import Users from "@/pages/user/Users.tsx";
import HrRegister from "@/pages/admin/HrRegister.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "admin",
        children: [
          {
            path: "hrregister",
            element: <HrRegister />,
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
]);
