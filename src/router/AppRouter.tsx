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

// Mentor
import MentorPage from "../features/mentor";
import HomeMentor from "../features/mentor/home/HomeMentor";
import Squad from "../features/mentor/squad/Squad";
import Artigos from "../features/mentor/artigos/Artigos";
import Alunos from "../features/mentor/alunos/Alunos";
import Comunidade from "../features/mentor/comunidade/Comunidade";
import Mentoria from "../features/mentor/mentoria/Mentoria";

// Representative
import RepresentativePage from "../features/representative/RepresentativePage";

// Student
import StudentPage from "../features/student/StudentPage";
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
import ListagemAlunos from "../features/admin/cadastro/aluno/ListagemAlunos";
import ListagemSquads from "../features/admin/cadastro/squad/ListagemSquad";
import ListagemMentores from "../features/admin/cadastro/mentor/ListagemMentores";
import CadastroAluno from "../features/admin/cadastro/aluno/CadastroAluno";
import CadastroMentor from "../features/admin/cadastro/mentor/CadastroMentor";
import CadastroWork from "../features/admin/cadastro/emprego/CadastroWork";
import StudentDetails from "../features/admin/cadastro/aluno/StudentDetails";
import MentorDetails from "../features/admin/cadastro/mentor/MentorDetails";
import SquadOrganogram from "../features/admin/cadastro/squad/components/SquadOrganogram";

// RoomsPage fallback
import RoomsPage from "../pages/room/Rooms";
import ListagemRepresentantes from "../features/admin/cadastro/representante/ListagemRepresentantes";
import RepresentanteDetails from "../features/admin/cadastro/representante/RepresentanteDetails";
import ListagemInstituicoesEnsino from "../features/admin/cadastro/instituicao-ensino/ListagemInstituicoesEnsino";
import InstituicaoDetails from "../features/admin/cadastro/instituicao-ensino/IntituicaoDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LogoScreen />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/student" element={<StudentRegisterPage />} />
      <Route path="/register/representative" element={<RepresentanteRegisterPage />} />
      <Route path="/register/mentor" element={<MentorRegisterPage />} />

      <Route path="/" element={<BaseLayout homePath="/rooms-page" />}>
        {/* Admin Routes */}
        <Route path="admin" element={<PrivateRoute role="ADMIN"><AdminPage /></PrivateRoute>} />
        <Route path="alunos" element={<ListagemAlunos />} />
        <Route path="alunos/detalhes-aluno/:id" element={<StudentDetails />} />
        <Route path="alunos/cadastro" element={<CadastroAluno />} />


        <Route path="mentores" element={<ListagemMentores />} />
        <Route path="mentores/cadastro" element={<CadastroMentor />} />
        <Route path="mentores/detalhes-mentor/:id" element={<MentorDetails />} />

        <Route path="squads" element={<ListagemSquads />} />
        <Route path="squads/cadastro" element={<ListagemSquads />} />
        <Route path="squads/detalhes-squad/:id" element={<SquadOrganogram />} />

        <Route path="emprego/cadastro/:usuarioId" element={<CadastroWork/>} />

        <Route path="representantes" element={<ListagemRepresentantes />} />
        <Route path="representantes/cadastro" element={<CadastroMentor />} />
        <Route path="representantes/detalhes-representante/:id" element={<RepresentanteDetails />} />

         <Route path="instituicoes" element={<ListagemInstituicoesEnsino />} />
        <Route path="instituicoes/cadastro" element={<CadastroMentor />} />
        <Route path="instituicoes/detalhes-instituicao/:id" element={<InstituicaoDetails />} />
      </Route>

      {/* Rooms fallback */}
      <Route path="/rooms-page" element={<RoomsPage />} />

      {/* Mentor */}
      <Route path="/mentor" element={<MentorPage />} />
      <Route index element={<HomeMentor />} />
      <Route path="squad" element={<Squad />} />
      <Route path="mentoria/:id" element={<Mentoria />} />
      <Route path="artigos" element={<Artigos />} />
      <Route path="alunos" element={<Alunos />} />
      <Route path="comunidade" element={<Comunidade />} />

      {/* Representative */}
      <Route path="/representative" element={<PrivateRoute role="representative"><RepresentativePage /></PrivateRoute>} />

      {/* Student */}
      <Route path="/student" element={<PrivateRoute role="ALUNO"><StudentPage /></PrivateRoute>}>
        <Route path="rooms" element={<PrivateRoute permission={permissions.READ_ROOMS}><Rooms /></PrivateRoute>} />
        <Route path="rooms/:roomId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomDetail /></PrivateRoute>} />
        <Route path="rooms/:roomId/:salaTematicaId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomMeeting /></PrivateRoute>} />
      </Route>

      <Route path="student/comunidade-aluno" element={<Post />} />
      <Route path="/editar-post" element={<EditPost />} />
      <Route path="student/artigos" element={<StudentArtigosPage />} />
      <Route path="student/artigos/:id" element={<StudentArtigoDetalhes />} />
      <Route path="student/forum" element={<StudentForumPage />} />
      <Route path="student/forum/duvida/:id" element={<StudentForumDetailsPage />} />

      {/* Global rooms (acesso direto) */}
      <Route path="rooms" element={<PrivateRoute permission={permissions.READ_ROOMS}><Rooms /></PrivateRoute>} />
      <Route path="rooms/:roomId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomDetail /></PrivateRoute>} />
      <Route path="rooms/:roomId/:salaTematicaId" element={<PrivateRoute permission={permissions.READ_ROOMS}><RoomMeeting /></PrivateRoute>} />

      {/* Redireciona caso rota não encontrada */}
      <Route path="*" element={<Navigate to="/student" />} />
    </Routes>
  );
};

export default AppRouter;
