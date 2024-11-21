import React from "react";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/login/LoginPage";
import Squad from "../features/mentor/squad/Squad";
import Artigos from "../features/mentor/artigos/Artigos";
import Rooms from "../features/mentor/rooms/Rooms";
import Alunos from "../features/mentor/alunos/Alunos";
import Comunidade from "../features/mentor/comunidade/Comunidade";
import MentorPage from "../features/mentor";
import LogoScreen from "../pages/logo_screen/LogoScreen";
import StudentPage from "../features/student/StudentPage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "../pages/profile_page/ProfilePage";
import RepresentativePage from "../features/representative/RepresentativePage";
import HomeMentor from "../features/mentor/home/HomeMentor";
import Mentoria from "../features/mentor/mentoria/Mentoria";
import RegisterPage from "../pages/register/RegisterPage";
import Post from "../features/student/post/Post";
import StudentArtigos from "../features/student/artigos/StudentArtigos";
import StudentArtigoDetalhes from "../features/student/artigos/StudentArtigoDetalhes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LogoScreen />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/mentor"
        element={
          <PrivateRoute profile="mentor">
            <MentorPage />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <div>
              <HomeMentor />
            </div>
          }
        />
        <Route path="squad" element={<Squad />} />

        <Route path="mentoria/:id" element={<Mentoria />} />

        <Route path="artigos" element={<Artigos />} />

        <Route path="rooms" element={<Rooms />} />

        <Route path="alunos" element={<Alunos />} />

        <Route path="comunidade" element={<Comunidade />} />
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

      <Route path="student/comunidade-aluno" element={<Post/>} />
      <Route path="student/artigos" element={<StudentArtigos />} />
      <Route path="student/artigos/:id" element={<StudentArtigoDetalhes />} />


      {/* Redireciona para a tela de seleção de perfil caso não encontre a rota */}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};

export default AppRouter;