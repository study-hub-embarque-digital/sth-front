import BaseLayoutStudent from "../BaseLayoutStudent";
import StudentArtigoDetalhes from "./StudentArtigoDetalhes";
import { useParams } from "react-router-dom";

export default function StudentArtigosDetailsPage() {
    const { id } = useParams();
    return (
        <BaseLayoutStudent removeLast={true}>
            <StudentArtigoDetalhes id={id} />
        </BaseLayoutStudent>
    );
}