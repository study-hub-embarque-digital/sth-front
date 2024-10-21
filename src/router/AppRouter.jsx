import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogoScreen from "../pages/logo_screen/LogoScreen";
import ProfilePage from "../pages/profile_page/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
// import AdminDashboard from '../features/admin/AdminDashboard';
// import UserDashboard from '../features/user/UserDashboard';
// import GuestInfo from '../features/guest/GuestInfo';
import PrivateRoute from "./PrivateRoute"; // Importa o PrivateRoute
import MentorPage from "../features/mentor/MentorPage";
import RepresentativePage from "../features/representative/RepresentativePage";
import StudentPage from "../features/student/StudentPage";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LogoScreen />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Usando PrivateRoute para proteger as rotas por perfil */}
      <Route
        path="/mentor"
        element={
          <PrivateRoute profile="mentor">
            <MentorPage />
          </PrivateRoute>
        }
      >
        {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
      </Route>

      <Route
        path="/representative"
        element={
          <PrivateRoute profile="representative">
            <RepresentativePage />
          </PrivateRoute>
        }
      >
        {/* <Route path="dashboard" element={<UserDashboard />} /> */}
      </Route>

      <Route
        path="/student"
        element={
          <PrivateRoute profile="student">
            <StudentPage />
          </PrivateRoute>
        }
      >
        {/* <Route path="info" element={<GuestInfo />} /> */}
      </Route>

      {/* Redireciona para a tela de seleção de perfil caso não encontre a rota */}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};

export default AppRouter;
