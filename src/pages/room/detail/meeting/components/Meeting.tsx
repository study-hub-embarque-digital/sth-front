import React from "react";
import { JaaSMeeting, JitsiMeeting } from "@jitsi/react-sdk";
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
        <JaaSMeeting
          appId="vpaas-magic-cookie-5949bf32cbbe4eb082c593fa88929944"
          jwt="eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNTk0OWJmMzJjYmJlNGViMDgyYzU5M2ZhODg5Mjk5NDQvNWJhOTJiIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJjaGF0Iiwic3ViIjoidnBhYXMtbWFnaWMtY29va2llLTU5NDliZjMyY2JiZTRlYjA4MmM1OTNmYTg4OTI5OTQ0IiwiYXVkIjoiaml0c2kiLCJleHAiOjE3NDU5MDQwMjMsImNvbnRleHQiOnsiZmVhdHVyZXMiOnsidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlLCJsaXZlc3RyZWFtaW5nIjpmYWxzZSwib3V0Ym91bmQtY2FsbCI6dHJ1ZSwic2lwLW91dGJvdW5kLWNhbGwiOnRydWV9LCJ1c2VyIjp7Im1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6IkNsw7N2aXMgQ2hha3JpYW4iLCJpZCI6IjUxYTUwZGIxLWQ1NjctNDlmZS1iYzQ3LTc3YTE3NDNjYWE0NiIsImF2YXRhciI6bnVsbCwiZW1haWwiOiJjbG92aW5ob3NAZ21haWwuY29tIiwiaGlkZGVuLWZyb20tcmVjb3JkZXIiOmZhbHNlfSwicm9vbSI6IioifX0.jweol03_vhlbHpKvJhG6bmWlJ_ECg-0BWihRNCSXao-Bv4Yo7VqLu5WosC_fe6QG4YeqYGRVi4DumhswQzA8BUeBRDtiLevS2K5Xbi7ShqKRbQNUwhw9GV8qgDwswpdtuHZss5TIetNtLRwi2302E0T4p9lG6G4GnA9c7oHDs4oF4ti10GNAO2F4TSQCGC1Ev96orkf794KBczDhSYkgoDfaUG7Rl-famqk2ePoZ93ZaIBRZ3VjNmY1s-rlc1JpgqdL6MNEs-CLCvyvq5sTjyqtY6m_9Odk3jKQ8VxxYfBSAvqFfIZjDz-1VQvKvArihOXbPKFTSjBxfl7UFlME6LQ"
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