import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LogoScreen from "../pages/logo_screen/LogoScreen";
import ProfilePage from "../pages/profile_page/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import StudentRegisterPage from "../pages/register/student/StudentRegisterPage";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <LogoScreen />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register/student",
    element: <StudentRegisterPage />
  },
  {
    path: "/",
    element: <LogoScreen />
  },
  {
    path: "/",
    element: <LogoScreen />
  },
]);