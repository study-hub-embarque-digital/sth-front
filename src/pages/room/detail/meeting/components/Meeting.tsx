import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { Box, Container, useMediaQuery } from "@mui/material";
import { DarkTheme } from "../../../../../theme";
import { useAuth } from "../../../../../contexts/AuthContext";
import { InformationCard } from "./InformationCard";
import { IApresentacao, IDiscussion } from "../useRoomMeeting";

interface IMeeting {
  reuniao?: any,
  topicos?: string[],
  apresentacoes: IApresentacao[],
  apresentacaoAtual: number | null,
  discussion: IDiscussion
}

const Meeting = ({ reuniao, topicos, apresentacoes, apresentacaoAtual, discussion }: IMeeting) => {
  const isLargeScreen = useMediaQuery(DarkTheme.breakpoints.up('md'));
  const { user } = useAuth();

  const meetConfigOverwrite = {
    startWithAudioMuted: true,
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
        <JitsiMeeting
          roomName={reuniao?.reuniaoId}
          configOverwrite={meetConfigOverwrite}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            displayName: user?.name ?? 'Anônimo',
            email: user?.email ?? 'teste@email.com'
          }}
          onApiReady={async (externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
            externalApi.addListener('participantJoined', (participant) => {
              // A cada participante que entra, vamos pegar o stream de vídeo.
              console.log('participante juntou nessa porra', participant)
            });
            console.log(externalApi)
          }}
          getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
        />
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <InformationCard reuniao={reuniao} topicos={topicos} apresentacoes={apresentacoes} apresentacaoAtual={apresentacaoAtual} discussion={discussion} />
      </Box>
    </Container >
  );
};

export { Meeting };