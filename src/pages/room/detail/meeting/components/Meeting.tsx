import React from "react";
import { JaaSMeeting, JitsiMeeting } from "@jitsi/react-sdk";
import { Box, Container, useMediaQuery } from "@mui/material";
import { DarkTheme } from "../../../../../theme";
import { useAuth } from "../../../../../contexts/AuthContext";
import { InformationCard } from "./InformationCard";
import { IApresentacao, IDiscussion } from "../useRoomMeeting";
import { PersonalizedMeeting } from "./PersonalizedMeeting";

interface IMeeting {
  reuniao?: any,
  topicos?: string[],
  apresentacoes: IApresentacao[],
  apresentacaoAtual: number | null,
  discussion: IDiscussion,
  token: string
}

const Meeting = ({ reuniao, topicos, apresentacoes, apresentacaoAtual, discussion, token }: IMeeting) => {
  const isLargeScreen = useMediaQuery(DarkTheme.breakpoints.up('md'));
  const { user } = useAuth();

  const meetConfigOverwrite = {
    startWithAudioMuted: false,
    disableModeratorIndicator: true,
    startScreenSharing: true,
    enableEmailInStats: false,
    prejoinConfig: {
      enabled: false
    },
    deeplinking: {
      disabled: true
    }
  }
  return (
    <Container sx={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-evenly', padding: '10px' }
    }>
      <Box>
        {token !== "" && <PersonalizedMeeting
          appId="vpaas-magic-cookie-5949bf32cbbe4eb082c593fa88929944"
          jwt={token}
          roomName={`vpaas-magic-cookie-5949bf32cbbe4eb082c593fa88929944/${reuniao?.reuniaoId}`}
          configOverwrite={meetConfigOverwrite}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          // userInfo={{
          //   displayName: user?.name ?? 'Anônimo',
          //   email: user?.email ?? 'teste@email.com'
          // }}
          // onApiReady={async (externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
            // externalApi.addListener('participantJoined', (participant) => {
            //   console.log('entrou participante: ', participant)
            // });
          // }}
          // getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
        />}
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <InformationCard reuniao={reuniao} topicos={topicos} apresentacoes={apresentacoes} apresentacaoAtual={apresentacaoAtual} discussion={discussion} />
      </Box>

      <p>{token}</p>
    </Container >
  );
};

export { Meeting };