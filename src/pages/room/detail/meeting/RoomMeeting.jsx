import LayoutAluno from "../../../../components/LayoutAluno";
import { useRoomMeeting } from "./useRoomMeeting";

const RoomMeeting = () => {
  const { reuniao, sendMessage } = useRoomMeeting();
  // const { isClientConnected, privateReceivedMessage, socketClient } = useSocketClient();
  // const { salaTematicaId } = useParams();
  // const [reuniao, setReuniao] = useState(null);

  // const sendMessage = useCallback(() => {
  //   socketClient.publish(`/app/reunioes.entrar`, {
  //     salaTematicaId,
  //   });
  // }, [salaTematicaId, socketClient]);

  // const handleMessageFromSub = useCallback((messageBody) => {
  //   console.log("mensagem da sala de reuniao", messageBody);
  //   if (messageBody?.context === "reunioes") {
  //     if (reuniao === null || reuniao?.reuniaoId !== messageBody?.reuniaoId) {
  //       socketClient.subscribe(`/topic/reunioes/${messageBody?.reuniaoId}`, handleMessageFromSub);
  //     }
  //     setReuniao(messageBody);
  //   }
  // }, [reuniao, socketClient]);

  // useEffect(() => {
  //   if (isClientConnected) {
  //     console.log("conectou");
  //     sendMessage();
  //   }
  // }, [isClientConnected, sendMessage]);

  // useEffect(() => {
  //   handleMessageFromSub(privateReceivedMessage);
  // }, [privateReceivedMessage, handleMessageFromSub]);

  return (
    <LayoutAluno title="rooms">
      <h2>Aguarde Alguns Instantes</h2>
      <button onClick={() => sendMessage()}>Entrar na reunião</button>
      <h3>
        {reuniao?.status === "EM_ESPERA" && "Você está na espera de outro participante. Após 5min sem outra pessoa entrar, sua sala é cancelada automaticamente."}
        {reuniao?.status === "AGUARDANDO_PARTICIPANTES" && "Aguardando participantes."}
        {reuniao?.status === "CANCELADA" && "Sua reunião foi cancelada."}
        {reuniao?.status === "EM_ESTUDO" && "Sua reunião esta no momento de estudar."}
      </h3>
    </LayoutAluno>
  );
};

export { RoomMeeting };