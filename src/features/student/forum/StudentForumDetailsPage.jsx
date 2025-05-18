import BaseLayoutStudent from "../BaseLayoutStudent";
import StudentForumDetails from "./StudentForumDetails";

export default function StudentForumPage() {
  return (
    <BaseLayoutStudent removeLast={true}>
      <StudentForumDetails/>
    </BaseLayoutStudent>
  );
}
