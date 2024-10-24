import MentorPage from "../features/mentor";
import RepresentativePage from "../features/representative/RepresentativePage";
import StudentPage from "../features/student/StudentPage";

const ProfileFactory = (profile) => {
  switch (profile) {
    case "mentor":
      return MentorPage;
    case "representative":
      return RepresentativePage;
    case "student":
      return StudentPage;
    // default:
    //   return () => <p>Selecione um perfil válido</p>
  }
};

export default ProfileFactory;
