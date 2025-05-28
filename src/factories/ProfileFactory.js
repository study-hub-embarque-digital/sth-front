import MentorPage from "../features/mentor";
// import StudentPage from "../features/student/StudentPage";

const ProfileFactory = (profile) => {
  switch (profile) {
    case "mentor":
      return MentorPage;
    // case "student":
    //   return StudentPage;
    // default:
    //   return () => <p>Selecione um perfil válido</p>
  }
};

export default ProfileFactory;
