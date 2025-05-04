import BaseLayoutStudent from "../BaseLayoutStudent";
import StudentForumDetails from "./StudentForumDetails";

export default function StudentForumPage() {
  return (
    <BaseLayoutStudent Component={StudentForumDetails} removeLast={true}></BaseLayoutStudent>
  );
}
