import React from "react";
import LayoutAluno from "../../../../components/LayoutAluno";
import { InformationCard } from "./components/InformationCard";
import { useRoomMeeting } from "./useRoomMeeting";
import { LookingForMeeting } from "./components/LookingForMeeting";
import { MeetingCanceled } from "./components/MeetCanceled";
import { Meeting } from "./components/Meeting";


const RoomMeeting = () => {
  const { reuniao, topicos, apresentacoes, apresentacaoAtual, discussion } = useRoomMeeting();

  return (
    <>
      {reuniao?.status === 'EM_ESPERA' && <LookingForMeeting />}
      {reuniao?.status === 'CANCELADA' && <MeetingCanceled />}
      {["EM_ESTUDO", "AGUARDANDO_PARTICIPANTES", "EM_APRESENTACAO"].includes(reuniao?.status) &&
        <Meeting
          reuniao={reuniao}
          topicos={topicos}
          apresentacoes={apresentacoes}
          apresentacaoAtual={apresentacaoAtual}
          discussion={discussion}
        />
      }
    </>
  );
};

export { RoomMeeting };


/* <h2>Aguarde Alguns Instantes</h2>
      <button onClick={() => sendMessage()}>Entrar na reunião</button>
      <h3>
        {reuniao?.message}
        <br />
        {reuniao?.reuniaoId}
        <br />
        {reuniao?.status === "EM_ESPERA" && "Você está na espera de outro participante. Após 5min sem outra pessoa entrar, sua sala é cancelada automaticamente."}
        {reuniao?.status === "AGUARDANDO_PARTICIPANTES" && "Aguardando participantes."}
        {reuniao?.status === "CANCELADA" && "Sua reunião foi cancelada."}
        {reuniao?.status === "EM_ESTUDO" && "Sua reunião esta no momento de estudar."}
      </h3>

      <br />
      <br />
      <br />
      {(reuniao?.status === "EM_ESTUDO" && topicos.length >= 1) && (
        <>
          <h3>Seus tópicos já foram separados, hora de estudar!!!</h3>
          <ul>
            {topicos.map(topico => {
              return <li key={topico}>{topico}</li>
            })}
          </ul>
        </>
      )} */