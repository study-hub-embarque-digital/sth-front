import { useNavigate, useParams } from "react-router-dom";
import { useSocketClient } from "../../../../contexts/SocketContext";
import { useCallback, useEffect, useState } from "react";

export interface IBaseWsMessage {
  context?: "REUNIOES" | "REUNIOES_TOPICOS";
  message?: "REUNIAO_ENCONTRADA" | "REUNIAO_CANCELADA" | "AGUARDANDO_MAIS_PARTICIPANTES" | "TOPICOS_SEPARADOS" | "TEMPO_ESTUDO_INICIOU" | "APRESENTACOES_INICIADAS" | "INICIAR_DISCUSSAO" | "NOVO_USUARIO_APRESENTAR" | "FINALIZAR_REUNIAO",
}

enum EMessage {
  'REUNIAO_ENCONTRADA',
  'REUNIAO_CANCELADA',
  'TOPICOS_SEPARADOS',
  'TEMPO_ESTUDO_INICIOU',
  'SUA_VEZ_APRESENTAR',
  'NOVO_USUARIO_APRESENTAR',
}


interface TopicoSeparadoMensagem extends IBaseWsMessage {
  topicos: string[]
}

interface ReuniaoEncontradaMensagem extends IBaseWsMessage {
  reuniaoId: string
}

interface IReuniaoCanceladaMensagem extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
}

interface IAguardandoMaisParticipantes extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
}

interface IAguardandoMaisParticipantes extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
}

interface ITopicoSeparadoMensagem extends IBaseWsMessage {
  topicos: string[]
}

interface IInicioApresentacoesMensagem extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
  apresentacaoAtual: number,
  apresentacoes: IApresentacao[]
}

interface ITempoEstudoIniciouMensagem extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
}

export interface IApresentacao {
  apresentacaoReuniaoId: string,
  nome: string,
  ordem: number,
  topicos: string[]
}

export interface IDiscussion {
  inDiscussion: boolean,
  topicos: string[]
}

interface IInicioDiscussaoMensagem extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
  topicos: string[]
}

interface ITrocarApresentacaoMensagem extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
  apresentacaoAtual: number
}
interface IReuniaoFinalizadaMensagem extends IBaseWsMessage {
  reuniaoId: string;
  status: string;
}

const useRoomMeeting = () => {
  const { isClientConnected, privateReceivedMessage, socketClient } = useSocketClient();
  const { salaTematicaId } = useParams();
  const [reuniao, setReuniao] = useState<any>();
  const [topicos, setTopicos] = useState<string[]>([]);
  const [apresentacoes, setApresentacoes] = useState<IApresentacao[]>([]);
  const [apresentacaoAtual, setApresentacaoAtual] = useState<number | null>(null);
  const [discussion, setDiscussion] = useState<IDiscussion>({ inDiscussion: false, topicos: [] });
  const navigate = useNavigate();

  const sendMessage = useCallback(() => {
    socketClient.publish(`/app/reunioes.entrar`, {
      salaTematicaId,
    });
  }, [salaTematicaId, socketClient]);

  const handleReuniaoEncontrada = (message: ReuniaoEncontradaMensagem) => {
    socketClient.subscribe(`/topic/reunioes/${message.reuniaoId}`, handleMessages);
    setReuniao((prev: IBaseWsMessage) => message);
    console.log("REUNIAO ENCONTRADA", { message });
  }

  const handleReuniaoCancelada = (message: IReuniaoCanceladaMensagem) => {
    socketClient.unsubscribe(`/topic/reunioes/${message.reuniaoId}`);
    setReuniao((prevMessage: IBaseWsMessage) => message);
    console.log("REUNIAO CANCELADA", { message });
  }

  const handleAguardandoMaisParticipantes = (message: IAguardandoMaisParticipantes) => {
    setReuniao((prevMessage: IBaseWsMessage) => message);
    console.log("AGUARDANDO MAIS PARTICIPANTES", { message });
  }

  const handleTopicosSeparados = (message: ITopicoSeparadoMensagem) => {
    setTopicos(() => message.topicos);
    console.log("TOPICOS SEPARADOS INDIVIDUAL", { message });
  }

  const handleInicioTempoEstudo = (message: ITempoEstudoIniciouMensagem) => {
    setReuniao((prevMessage: IBaseWsMessage) => message);
    console.log("TEMPO ESTUDO COMEÇOU", { message });
  }

  const handleInicioApresentacoes = (message: IInicioApresentacoesMensagem) => {
    setReuniao((prevMessage: IBaseWsMessage) => message);
    setApresentacoes(prev => message.apresentacoes);
    setApresentacaoAtual(prev => message.apresentacaoAtual);

    console.log("INICIARAM AS APRESENTACOES", { message });
  }

  const handleIniciarDiscussao = (message: IInicioDiscussaoMensagem) => {
    setDiscussion((prev) => {
      return {
        inDiscussion: true,
        topicos: message.topicos
      }
    });

    console.log("INICIARAM AS DISCUSSOES", { message });
  }

  const handleTrocarApresentacao = (message: ITrocarApresentacaoMensagem) => {
    setDiscussion(prev => {
      return { inDiscussion: false, topicos: [] }
    });
    setApresentacaoAtual(prev => message.apresentacaoAtual);


    console.log("INICIARAM AS DISCUSSOES", { message });
  }

  const handleFinalizarReuniao = (message: IReuniaoFinalizadaMensagem) => {
    console.log("mensagem", message);
    setReuniao((prevMessage: IBaseWsMessage) => message);

    console.log("FINALIZARAM AS DISCUSSOES", { message });

    navigate('/student')
  }

  const messageHandlers = {
    ["REUNIAO_ENCONTRADA"]: (message: IBaseWsMessage) => handleReuniaoEncontrada(message as ReuniaoEncontradaMensagem),
    ["REUNIAO_CANCELADA"]: (message: IBaseWsMessage) => handleReuniaoCancelada(message as IReuniaoCanceladaMensagem),
    ["AGUARDANDO_MAIS_PARTICIPANTES"]: (message: IBaseWsMessage) => handleAguardandoMaisParticipantes(message as IAguardandoMaisParticipantes),
    ["TOPICOS_SEPARADOS"]: (message: IBaseWsMessage) => handleTopicosSeparados(message as ITopicoSeparadoMensagem),
    ["TEMPO_ESTUDO_INICIOU"]: (message: IBaseWsMessage) => handleInicioTempoEstudo(message as ITempoEstudoIniciouMensagem),
    ["APRESENTACOES_INICIADAS"]: (message: IBaseWsMessage) => handleInicioApresentacoes(message as IInicioApresentacoesMensagem),
    ["INICIAR_DISCUSSAO"]: (message: IBaseWsMessage) => handleIniciarDiscussao(message as IInicioDiscussaoMensagem),
    ["NOVO_USUARIO_APRESENTAR"]: (message: IBaseWsMessage) => handleTrocarApresentacao(message as ITrocarApresentacaoMensagem),
    ["FINALIZAR_REUNIAO"]: (message: IBaseWsMessage) => handleFinalizarReuniao(message as IReuniaoFinalizadaMensagem)

  };

  const handleMessages = useCallback((message: IBaseWsMessage) => {
    let parsedMessage = message;

    if (typeof parsedMessage == "string") {
      parsedMessage = JSON.parse(message as string);
    }


    if (typeof parsedMessage == "string") {
      parsedMessage = JSON.parse(message as string);
    }


    if (typeof parsedMessage == "string") {
      parsedMessage = JSON.parse(message as string);
    }

    console.log("tem 3 agora, resultado: ", parsedMessage);


    if (!parsedMessage.context) return;

    if (parsedMessage.context !== null && !["REUNIOES_TOPICOS", "REUNIOES", "REUNIOES_APRESENTACOES"].includes(parsedMessage.context)) return; // remover o finalizar reuniao do contexto de reunioes apresentacoes



    if (parsedMessage.message !== null && parsedMessage.message !== undefined) {
      messageHandlers[parsedMessage.message](parsedMessage);
    }

  }, [reuniao, socketClient]);

  useEffect(() => {
    if (isClientConnected) {
      console.log("conectou");
      if (reuniao == null) {
        sendMessage();
      }
    }
  }, [isClientConnected, sendMessage]);

  useEffect(() => {
    if (privateReceivedMessage && (reuniao == null || privateReceivedMessage?.context === "REUNIOES_TOPICOS")) {
      handleMessages(privateReceivedMessage);
    }
  }, [privateReceivedMessage, handleMessages]);

  return { sendMessage, reuniao, topicos, apresentacoes, apresentacaoAtual, discussion }
}

export { useRoomMeeting }