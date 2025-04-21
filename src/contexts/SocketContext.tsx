import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { stompClient } from "../api/socket";
import { ActivationState } from "@stomp/stompjs";
import { IBaseWsMessage } from "../pages/room/detail/meeting/useRoomMeeting";

interface ISocketProvider {
  children?: React.ReactNode;
}

interface ISocketClient {
  subscribe: (route: string, handleMessage?: (message: any) => void) => void;
  unsubscribe: (route: string) => void;
  publish: (route: string, message: any) => void;
}

interface ISocketContext {
  socketClient: ISocketClient;
  privateReceivedMessage: IBaseWsMessage;
  isClientConnected: boolean;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

const SocketProvider = ({ children }: ISocketProvider) => {
  const { isAuthenticated, user } = useAuth();
  const [isClientConnected, setIsClientConnected] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [privateReceivedMessage, setPrivateReceivedMessage] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated && !isClientConnected) {
      stompClient.activate();
    }

    if (!isAuthenticated) {
      stompClient.deactivate();
    }
  }, [isAuthenticated, isClientConnected]);

  useEffect(() => {
    stompClient.onConnect = () => {
      setIsClientConnected(true);
      socketClient.subscribe(`/topic/user/${user?.sub}`, setPrivateReceivedMessage);
    };

    stompClient.onStompError = (frame) => {
      console.error("Erro STOMP: ", frame);
    };

    stompClient.onDisconnect = () => {
      setIsClientConnected(false);
    };

    stompClient.onChangeState = (state) => {
      console.log("Estado da conexão", state.toString());
      if (state === ActivationState.ACTIVE) {
        setIsClientConnected(true);
      }

      if (state === ActivationState.INACTIVE) {
        setIsClientConnected(false);
      }
    };

    stompClient.onWebSocketClose = () => {
      setSubscriptions([]);
    };
  }, [user]);

  const socketClient: ISocketClient = useMemo(() => ({
    subscribe: (route: string, handleMessage?: (message: any) => void) => {
      if (subscriptions.includes(route)) return;

      stompClient.subscribe(route, (message) => {
        if (handleMessage !== undefined) {
          handleMessage(JSON.parse(message.body));
        }
      });

      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, route]);
    },

    unsubscribe: (route: string) => {
      stompClient.unsubscribe(route);
      setSubscriptions((prevSubscriptions) => prevSubscriptions.filter(sub => sub !== route));
    },

    publish: (route: string, message: any) => {
      stompClient.publish({
        destination: route,
        body: JSON.stringify(message),
      });
    }
  }), [subscriptions]);

  const socketContextValue = useMemo(() => ({
    socketClient,
    privateReceivedMessage,
    isClientConnected,
  }), [socketClient, privateReceivedMessage, isClientConnected]);

  return <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>;
};

const useSocketClient = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketClient deve ser usado dentro de um SocketProvider");
  }
  return context;
};

export { useSocketClient, SocketProvider };