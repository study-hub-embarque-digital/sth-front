import { useParams } from "react-router-dom";
import { useSocketClient } from "../../../../contexts/SocketContext";
import { useCallback, useEffect, useState } from "react";

interface IBaseWsMessage {
  context?: 'REUNIOES';
  message?: "REUNIAO_ENCONTRADA" | "REUNIAO_CANCELADA",
}

enum EMessage {
  'REUNIAO_ENCONTRADA',
  'REUNIAO_CANCELADA',
  'TOPICOS_SEPARADOS',
  'TEMPO_ESTUDO_INICIOU',
  'SUA_VEZ_APRESENTAR',
  'NOVO_USUARIO_APRESENTAR'
}


interface TopicoSeparadoMensagem extends IBaseWsMessage {
  topicos: string[]
}

interface ReuniaoEncontradaMensagem extends IBaseWsMessage {
  reuniaoId: string
}

const useRoomMeeting = () => {
  const { isClientConnected, privateReceivedMessage, socketClient } = useSocketClient();
  const { salaTematicaId } = useParams();
  const [reuniao, setReuniao] = useState<string>();

  const sendMessage = useCallback(() => {
    socketClient.publish(`/app/reunioes.entrar`, {
      salaTematicaId,
    });
  }, [salaTematicaId, socketClient]);

  const handleReuniaoEncontrada = (message: ReuniaoEncontradaMensagem) => {
    socketClient.subscribe(`/topic/reunioes/${message.reuniaoId}`, handleMessages);
    setReuniao(message.reuniaoId);
  }

  const handleReuniaoCancelada = (message: IBaseWsMessage) => {
    // socketClient.subscribe(`/topic/reunioes/${message.reuniaoId}`, handleMessages);
    // setReuniao(message.reuniaoId);
    console.log("mensagem", message.message)
  }

  const messageHandlers = {
    ["REUNIAO_ENCONTRADA"]: (message: IBaseWsMessage) => handleReuniaoEncontrada(message as ReuniaoEncontradaMensagem),
    ["REUNIAO_CANCELADA"]: (message: IBaseWsMessage) => handleReuniaoCancelada(message as IBaseWsMessage)
  };

  const handleMessages = useCallback((message: IBaseWsMessage) => {
    if (!message.context) return;

    if (message.context !== null && message.context !== "REUNIOES") return;

    if (message.message !== null && message.message !== undefined) {
      messageHandlers[message.message](message);
    }

  }, [reuniao, socketClient]);

  useEffect(() => {
    if (isClientConnected) {
      console.log("conectou");
      sendMessage();
    }
  }, [isClientConnected, sendMessage]);

  useEffect(() => {
    console.log(EMessage.REUNIAO_ENCONTRADA.toLocaleString());
    if (privateReceivedMessage) {
      handleMessages(privateReceivedMessage);
    }
  }, [privateReceivedMessage, handleMessages]);

  return { sendMessage, reuniao }
}

export { useRoomMeeting }