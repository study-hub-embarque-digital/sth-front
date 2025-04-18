import BaseLayout from "../../../components/shared/layout/BaseLayout";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StudentForum from "./StudentForum";
import PeopleIcon from '@mui/icons-material/People'; 
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import SchoolIcon from '@mui/icons-material/School'; 
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; 
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum'; 

export default function StudentForumPage() {
  const menuItems = [
    
    { text: "Home", icon: HomeRoundedIcon, route: "/student" },
    { text: 'Comunidade', icon: PeopleIcon, path: "student/comunidade-aluno"},
    { text: 'Artigos', icon: ArticleIcon , path: "student/artigos"},
    { text: 'Entregas', icon: AssignmentIcon },
    { text: 'Rooms', icon: SchoolIcon , path: "rooms"},
    { text: 'Squad', icon: RocketLaunchIcon},
    { text: 'Fórum', icon: ForumIcon , route: "/student/forum"},
  ];
  return (
    <BaseLayout homePath="/student" menuItems={menuItems}>
      <StudentForum/>
    </BaseLayout>
  );
}
