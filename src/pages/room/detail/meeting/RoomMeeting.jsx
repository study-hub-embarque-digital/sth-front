import { useEffect, useState } from "react";
import { useSocketClient } from "../../../../hooks/useSocketConnection";
import { useParams } from "react-router-dom";
import LayoutAluno from "../../../../components/LayoutAluno";
import { useAuth } from "../../../../hooks/useAuth";

const RoomMeeting = () => {
  const [socketClient, isClientConnected, subReceivedMessage] = useSocketClient();
  const { salaTematicaId } = useParams();
  // const [roles, isAuthenticated, pathForRole, sub, permissions] = useAuth();
  const [reuniao, setReuniao] = useState(null);

  const handleMessageFromSub = (messageBody) => {
    console.log("mensagem da sala de reuniao", messageBody)
    if (messageBody?.context === "reunioes") {
      if (reuniao === null || reuniao?.reuniaoId != messageBody?.reuniaoId) {
        socketClient.subscribe(`/topic/reunioes/${messageBody?.reuniaoId}`, handleMessageFromSub)
      }
      setReuniao(messageBody);
    }
  }

  useEffect(() => {
    if (isClientConnected) {
      console.log("conectou")
      sendMessage();
      // socketClient.subscribe(`/topic/user/${sub}`, handleMessageFromSub)
    }
  }, [isClientConnected])

  useEffect(() => {
    handleMessageFromSub(subReceivedMessage)
  }, [subReceivedMessage])

  const sendMessage = () => {
    socketClient.publish(`/app/reunioes.entrar`, {
      salaTematicaId,
    })
  }

  return (
    <LayoutAluno title="rooms">
      <h2>Aguarde Alguns Instantes</h2>
      <button onClick={() => sendMessage()}>asdasdasd</button>
      <h3>
        {reuniao?.status === "EM_ESPERA" && "Você está na espera de outro participante. Após 5min sem outra pessoa entrar, sua sala é cancelada automaticamente."}
        {reuniao?.status === "AGUARDANDO_PARTICIPANTES" && "Aguardando participantes."}
        {reuniao?.status === "CANCELADA" && "Sua reuniao foi cancelada."}
      </h3>
    </LayoutAluno>
  );
};

export { RoomMeeting };
