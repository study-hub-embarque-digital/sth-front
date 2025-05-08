import LoginPage from "../pages/login/LoginPage";
import Squad from "../features/mentor/squad/Squad";
import Artigos from "../features/mentor/artigos/Artigos";
import Rooms from "../pages/room/Rooms";
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
import StudentRegisterPage from "../pages/register/student/StudentRegisterPage";
import RepresentanteRegisterPage from "../pages/register/representative/RepresentanteRegisterPage";
import Post from "../features/student/post/Post";
import StudentArtigos from "../features/student/artigos/StudentArtigos";
import StudentArtigoDetalhes from "../features/student/artigos/StudentArtigoDetalhes";
import EditPost from "../features/student/post/EditPost";
import MentorRegisterPage from "../pages/register/mentor/MentorRegisterPage";
import { RoomsPage } from "../features/student/rooms/Rooms";
import { permissions } from "../utils/permissions";
import { RoomDetail } from "../pages/room/detail/RoomDetail";
import { RoomMeeting } from "../pages/room/detail/meeting/RoomMeeting";
import { PrivateRoute } from "./PrivateRoute";
import AdminPage from "../features/admin/AdminPage";
import ListagemAlunos from "../features/admin/ListagemAlunos";
import BaseLayout from "../components/shared/layout/BaseLayout";
import ListagemSquads from "../features/admin/ListagemSquad";
import StudentDetails from "../features/admin/StudentDetails";
import OrgChart from "../components/shared/orgchart/OrgChart";
import CadastroAluno from "../features/admin/cadastro/CadastroAluno";
import ListagemMentores from "../features/admin/ListagemMentores";
import MentorDetails from "../features/admin/cadastro/mentor/MentorDetails";
import CadastroMentor from "../features/admin/cadastro/mentor/CadastroMentor";
import CadastroWork from "../features/admin/cadastro/CadastroWork";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<LogoScreen />} />
      <Route path="/profile" element={<ProfilePage />} />*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<ProfilePage />}>
        <Route path="student" element={<StudentRegisterPage />} />
        <Route path="representative" element={<RepresentanteRegisterPage />} />
        <Route path="mentor" element={<MentorRegisterPage />} />
      </Route>

      <Route path="/" element={<BaseLayout homePath="/rooms-page" />}>
        <Route
          path="admin"
          element={
            <PrivateRoute role="ADMIN">
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="chart"
          element={
            // <PrivateRoute permission={permissions.READ_ALUNOS}>
            <OrgChart />
            // </PrivateRoute>
          }
        ></Route>

        <Route
          path="alunos"
          element={
            // <PrivateRoute permission={permissions.READ_ALUNOS}>
            <ListagemAlunos />
            // </PrivateRoute>
          }
        ></Route>
        <Route
          path="alunos/detalhes-aluno/:id"
          element={
            // <PrivateRoute permission={permissions.READ_SQUADS}>
            <StudentDetails />
            // </PrivateRoute>
          }
        />

        <Route path="/alunos/cadastro" element={<CadastroAluno />} />

        <Route path="/mentores/cadastro" element={<CadastroMentor />} />

        <Route path="/work/cadastro" element={<CadastroWork />} />


        <Route path="mentores" element={<ListagemMentores />} />
        <Route
          path="mentores/detalhes-mentor/:id"
          element={
            // <PrivateRoute permission={permissions.READ_SQUADS}>
            <MentorDetails />
            // </PrivateRoute>
          }
        />


        <Route
          path="squads"
          element={
            // <PrivateRoute permission={permissions.READ_SQUADS}>
            <ListagemSquads />
            // </PrivateRoute>
          }
        />
      </Route>

      <Route path="/rooms-page" element={<RoomsPage />} />

      <Route
        path="/mentor"
        element={
          // <PrivateRoute role="mentor">
          <MentorPage />
          // </PrivateRoute>
        }
      />
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
      <Route path="alunos" element={<Alunos />} />
      <Route path="comunidade" element={<Comunidade />} />

      <Route
        path="/representative"
        element={
          <PrivateRoute role="representative">
            <RepresentativePage />
          </PrivateRoute>
        }
      >
        {/* <Route path="dashboard" element={<UserDashboard />} /> */}
      </Route>

      <Route
        path="/student"
        element={
          <PrivateRoute role="ALUNO">
            <StudentPage />
          </PrivateRoute>
        }
      ></Route>

      <Route path="student/comunidade-aluno" element={<Post />} />
      <Route path="/editar-post" element={<EditPost />} />
      <Route path="student/artigos" element={<StudentArtigos />} />
      <Route path="student/artigos/:id" element={<StudentArtigoDetalhes />} />

      <Route
        path="rooms"
        element={
          <PrivateRoute permission={permissions.READ_ROOMS}>
            <Rooms />
          </PrivateRoute>
        }
      />

      <Route
        path="rooms/:roomId"
        element={
          <PrivateRoute permission={permissions.READ_ROOMS}>
            <RoomDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="rooms/:roomId/:salaTematicaId"
        element={
          <PrivateRoute permission={permissions.READ_ROOMS}>
            <RoomMeeting />
          </PrivateRoute>
        }
      />

      {/* Redireciona para a tela de seleção de perfil caso não encontre a rota */}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};

export default AppRouter;
