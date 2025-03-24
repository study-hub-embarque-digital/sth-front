import { useEffect, useState } from "react";
import { useSocketClient } from "../../../hooks/useSocketConnection";

function RoomsPage() {
  const [data, setData] = useState();
  const [socketClient, isClientConnected] = useSocketClient();
  // Subscribing a um tópico
  useEffect(() => {
    if (isClientConnected) {
      socketClient.subscribe("/topic/reunioes/1964d86e-891c-48f1-861b-a6202245ea72", console.log)
      console.log("conectou")
    }
  }, [isClientConnected])

  const sendMessage = (salaTematicaId) => {
    socketClient.publish(`/app/reunioes.entrar/${salaTematicaId}`, { message: "Testando meu hook" })
  }

  return (
    <div>
      <p>{data ?? ""}</p>
      <button onClick={() => sendMessage("teste")}>Mandar mensagem</button>
    </div>
  );
}

export { RoomsPage };