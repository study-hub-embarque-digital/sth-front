import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { permissions } from "../../../utils/permissions";

export interface IMenuItem {
  text: string,
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  route: string,
  permissions: string[],
}

const menuItems: IMenuItem[] = [
  {
    text: "Home",
    icon: HomeRoundedIcon,
    route: "/home",
    permissions: []
  },
  {
    text: "Squads",
    icon: GroupsRoundedIcon,
    route: "/squads",
    permissions: [permissions.READ_SQUADS]
  },
  {
    text: "Alunos",
    icon: SchoolRoundedIcon,
    route: "/alunos",
    permissions: [permissions.READ_ALUNOS]
  },
  {
    text: "Mentores",
    icon: FolderRoundedIcon,
    route: "/mentores",
    permissions: [permissions.READ_MENTORES]
  },
  {
    text: "I.E's",
    icon: AccountBalanceRoundedIcon,
    route: "/instituicoes",
    permissions: [permissions.READ_INSTITUICOES_ENSINO]
  },
  {
    text: "Representantes",
    icon: BusinessCenterRoundedIcon,
    route: "/representantes",
    permissions: [permissions.READ_REPRESENTANTES]
  },
  {
    text: 'Comunidade',
    icon: PeopleIcon,
    route: "/home/comunidade",
    permissions: []
  },
  {
    text: 'Artigos',
    icon: ArticleIcon,
    route: "/home/artigos",
    permissions: []
  },
  {
    text: 'Entregas',
    icon: AssignmentIcon,
    route: "",
    permissions: []
  },
  {
    text: 'Rooms',
    icon: SchoolIcon,
    route: "/home/rooms",
    permissions: [permissions.READ_ROOMS]
  },
  {
    text: 'Squad',
    icon: RocketLaunchIcon,
    route: "",
    permissions: []
  },
  {
    text: 'Fórum',
    icon: ForumIcon,
    route: "/home/forum",
    permissions: []
  },
];

export { menuItems };