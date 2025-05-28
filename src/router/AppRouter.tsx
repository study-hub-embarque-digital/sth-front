import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/login/LoginPage";
import LogoScreen from "../pages/logo_screen/LogoScreen";
import ProfilePage from "../pages/profile_page/ProfilePage";

import StudentRegisterPage from "../pages/register/student/StudentRegisterPage";
import RepresentanteRegisterPage from "../pages/register/representative/RepresentanteRegisterPage";
import MentorRegisterPage from "../pages/register/mentor/MentorRegisterPage";

import BaseLayout from "../components/shared/layout/BaseLayout";
import { PrivateRoute } from "./PrivateRoute";
import { permissions } from "../utils/permissions";
import Post from "../features/student/post/Post";
import EditPost from "../features/student/post/EditPost";
import StudentArtigosPage from "../features/student/artigos/StudentArtigosPage";
import StudentArtigoDetalhes from "../features/student/artigos/StudentArtigoDetalhes";
import StudentForumPage from "../features/student/forum/StudentForumPage";
import StudentForumDetailsPage from "../features/student/forum/StudentForumDetailsPage";

// Rooms
import Rooms from "../pages/room/Rooms";
import { RoomDetail } from "../pages/room/detail/RoomDetail";
import { RoomMeeting } from "../pages/room/detail/meeting/RoomMeeting";

// Admin
import AdminPage from "../features/admin/AdminPage";
import ListagemAlunos from "../features/admin/ListagemAlunos";
import ListagemSquads from "../features/admin/ListagemSquad";
import ListagemMentores from "../features/admin/ListagemMentores";
import CadastroAluno from "../features/admin/cadastro/CadastroAluno";
import CadastroMentor from "../features/admin/cadastro/mentor/CadastroMentor";
import CadastroWork from "../features/admin/cadastro/CadastroWork";
import StudentDetails from "../features/admin/StudentDetails";
import MentorDetails from "../features/admin/cadastro/mentor/MentorDetails";
import OrgChart from "../components/shared/orgchart/OrgChart";
import { Home } from "../pages/home/Home";
import { StudentHomePage } from "../features/student/StudentHomePage";
import StudentForumDetails from "../features/student/forum/StudentForumDetails";
import StudentArtigos from "../features/student/artigos/StudentArtigos";
import { Community } from "../pages/community/Community";
// import Articles from "../pages/articles/Articles";
import { CreateArticle } from "../pages/articles/create/CreateArticle";
import { Articles } from "../pages/articles/Articles";
import { DetailArticle } from "../pages/articles/detail/DetailArticle";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LogoScreen />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/student" element={<StudentRegisterPage />} />
      <Route path="/register/representative" element={<RepresentanteRegisterPage />} />
      <Route path="/register/mentor" element={<MentorRegisterPage />} />

      <Route path="/" element={<BaseLayout homePath="/home" />}>
        <Route path="admin" element={<PrivateRoute role="ADMIN"><AdminPage /></PrivateRoute>} />
        <Route path="chart" element={<OrgChart />} />
        <Route path="alunos" element={<ListagemAlunos />} />
        <Route path="alunos/detalhes-aluno/:id" element={<StudentDetails />} />
        <Route path="alunos/cadastro" element={<CadastroAluno />} />
        <Route path="mentores" element={<ListagemMentores />} />
        <Route path="mentores/cadastro" element={<CadastroMentor />} />
        <Route path="mentores/detalhes-mentor/:id" element={<MentorDetails />} />
        {/* <Route path="work/cadastro" element={<CadastroWork />} /> */}
        <Route path="squads" element={<ListagemSquads />} />
      </Route>

      {/* Student */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route
          index path=""
          element={
            <PrivateRoute>
              <StudentHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="rooms"
          element={
            <PrivateRoute
              permission={permissions.READ_ROOMS}
            >
              <Rooms />
            </PrivateRoute>
          }
        />

        <Route 
          path="rooms/:roomId" 
          element={
          <PrivateRoute permission={permissions.READ_ROOMS}><RoomDetail /></PrivateRoute>} />
        <Route path="rooms/:roomId/:salaTematicaId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomMeeting /></PrivateRoute>} />
        <Route path="comunidade" element={<Community />} />
        <Route path="editar-post" element={<EditPost />} />
        <Route path="artigos" element={<Articles />} />
        <Route path="artigos/novo" element={<CreateArticle />} />
        <Route path="artigos/:articleId" element={<DetailArticle />} />
        <Route path="forum" element={<StudentForumDetails />} />
        <Route path="forum/duvida/:id" element={<StudentForumDetailsPage />} /> */
      </Route>

      { }

      {/* Global rooms (acesso direto) */}
      {/* <Route path="rooms" element={<PrivateRoute permission={permissions.READ_ROOMS}><Rooms /></PrivateRoute>} />
      <Route path="rooms/:roomId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomDetail /></PrivateRoute>} />
      <Route path="rooms/:roomId/:salaTematicaId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomMeeting /></PrivateRoute>} /> */}

      {/* Redireciona caso rota não encontrada */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRouter;
