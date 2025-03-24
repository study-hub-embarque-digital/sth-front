import { useEffect, useState } from "react";
import { stompClient } from "../api/socket";
import { ActivationState, } from "@stomp/stompjs";
import { useAuth } from "./useAuth";
import { TokenHandler } from "../utils/TokenHandler";

const subscriptionsKey = "subscriptions";

const socketClient = {
  subscribe: (route, handleMessage) => {
    // const subscriptionsFromStorage = sessionStorage.getItem(subscriptionsKey);
    // let subscriptions = [];

    // if (subscriptionsFromStorage != null) {
    //   subscriptions = subscriptionsFromStorage.split(';')
    // }

    // if (subscriptions.includes(route)) {
    //   console.log("Já existe essa subscrição");
    //   return;
    // };

    stompClient.subscribe(route, (message) => {
      // console.log("Recebemos: ", JSON.parse(message.body))
      handleMessage(JSON.parse(message.body));
    });

    // subscriptions.push(route);
    // const subsToSave = subscriptions.join(";")
    // sessionStorage.setItem(subscriptionsKey, subsToSave);
  },

  unsubscribe: (route) => {
    stompClient.unsubscribe(route);

    const subscriptionsFromStorage = sessionStorage.getItem(subscriptionsKey);
    let subscriptions = [];

    if (subscriptionsFromStorage != null) {
      subscriptions = subscriptionsFromStorage.split(';')
    }

    subscriptions = subscriptions.filter(sub => sub !== route);

    sessionStorage.setItem(subscriptionsKey, subscriptions.join(";"));
  },

  publish: (route, message) => {
    stompClient.publish({
      destination: route,
      body: JSON.stringify(message),
    });
  }
}

const useSocketClient = () => {
  const [isClientConnected, setIsClientConnected] = useState(false);
  const [, isAuthenticated, , sub] = useAuth();
  const [subReceivedMessage, setSubReceivedMessage] = useState();
  
  stompClient.onConnect = () => {
    console.info("Conexão Iniciada")
    setIsClientConnected(true);
    socketClient.subscribe(`/topic/user/${sub}`, setSubReceivedMessage);
  };

  stompClient.onStompError = (frame) => {
    console.error("Erro STOMP: ", frame);
  };

  stompClient.onDisconnect = () => {
    console.log("Cliente desconectado")
    setIsClientConnected(false);
    sessionStorage.removeItem(subscriptionsKey);
  };

  stompClient.onChangeState = (state) => {
    console.log("Estado da conexão", state.toString())
    if (state === ActivationState.ACTIVE) {
      setIsClientConnected(true);
    }

    if (state === ActivationState.INACTIVE) {
      setIsClientConnected(false);
    }
  }

  stompClient.onWebSocketClose = () => {
    sessionStorage.removeItem(subscriptionsKey);
  }

  useEffect(() => {
    if (isAuthenticated && !isClientConnected) {
      stompClient.activate();
    }

    if (!isAuthenticated) {
      stompClient.deactivate();
    }
  }, [isAuthenticated, isClientConnected])

  if (!stompClient.connected) {
    console.log("Tentando conectar...")
    stompClient.activate();
  }

  return [socketClient, isClientConnected, subReceivedMessage];
};

export {
  useSocketClient
}