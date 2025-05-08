import React, { useRef } from "react"
import { Box, Card, CardContent, List, ListItem, ListItemText, ListSubheader, Slide, Typography } from "@mui/material"
import { IApresentacao, IDiscussion } from "../useRoomMeeting";

const WaitingParticipantsCardContent = (
  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '100%' }}>
    <img src="/images/waiting_participants.png" alt="" />
    <Typography variant="h6" sx={{ color: '#FFF', marginTop: '30px' }}>
      Esperando mais participantes...
    </Typography>
  </CardContent>
);

interface IListagemTopicos {
  topicos: string[]
}

const ListagemTopicos = ({ topicos }: IListagemTopicos) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#FFF' }}>
        Seus tópicos:
      </Typography>
      <List>
        {topicos.map(topico => {
          return (
            <ListItem key={topico} disablePadding>
              <ListItemText primary={topico} sx={{ color: "#FFF" }} />
            </ListItem>
          )
        })}
      </List>
    </>
  );
}

interface IListagemApresentacoes {
  apresentacoes?: IApresentacao[],
  apresentacaoAtual: number | null
}

const ListagemApresentacoes = ({ apresentacoes, apresentacaoAtual }: IListagemApresentacoes) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#FFF' }}>
        &#128260; Rodada de Apresentações
      </Typography>
      <section style={{ margin: "10px 0px", color: "#FFF" }}>
        <h5 style={{ margin: 0 }}>
          &#127908; Apresentação atual:
        </h5>
        <ul style={{ margin: "4px 0px" }}>
          <li>
            {apresentacoes?.find(apresentacao => apresentacaoAtual != null && apresentacao.ordem == apresentacaoAtual)?.nome} (5min)
            <ul>
              {apresentacoes?.find(apresentacao => apresentacaoAtual != null && apresentacao.ordem == apresentacaoAtual)?.topicos.map(topico => {
                return (
                  <li key={topico}>
                    {topico}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </section>


      <section style={{ color: "#FFF" }}>
        <h5 style={{ margin: 0 }}>
          &#128512; Próximas apresentações:
        </h5>
        <ol style={{ margin: "4px 0px" }}>
          {apresentacoes?.filter(apresentacao => apresentacaoAtual !== null ? apresentacao.ordem > apresentacaoAtual : apresentacao.ordem > 0)
            .sort(apresentacao => apresentacao.ordem)
            .map(apresentacao => {
              return (
                <>
                  <li key={apresentacao.apresentacaoReuniaoId}>
                    {apresentacao.nome}
                  </li>
                  <ul>
                    {apresentacao.topicos
                      .map(topico => {
                        return (
                          <li key={topico}>
                            {topico}
                          </li>
                        )
                      })}
                  </ul>
                </>
              )
            })}
        </ol>
      </section>
    </>
  );
}

interface IStudyTimeCardContent {
  topicos?: string[]
}

const StudyTimeCardContent = ({ topicos }: IStudyTimeCardContent) => {
  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%' }}>
      <Box sx={{ height: '100%', width: '50%', display: "flex", flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingLeft: '20px' }}>
        <ListagemTopicos topicos={topicos ?? []} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', height: '100%', width: '100%' }}>
        <img src="/images/study_time.png" alt="Relógio" />
        <Typography variant="h6" sx={{ color: '#FFF', marginTop: '30px' }}>
          Rodada de pesquisa:
        </Typography>
        <Typography variant="body1" sx={{ color: '#FFF' }}>
          15min
        </Typography>
      </Box>
    </CardContent>
  );
}

interface IPresentationCardContent {
  apresentacoes: IApresentacao[],
  apresentacaoAtual: number | null
}

const PresentationsCardContent = ({ apresentacoes, apresentacaoAtual }: IPresentationCardContent) => {
  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%' }}>
      <Box sx={{ height: '100%', width: '100%', display: "flex", flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingLeft: '20px' }}>
        <ListagemApresentacoes apresentacoes={apresentacoes} apresentacaoAtual={apresentacaoAtual} />
      </Box>
    </CardContent>
  )
}

const DiscussionCardContent = (discussion: IDiscussion) => {
  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%' }}>
      <Box sx={{ height: '100%', width: '100%', display: "flex", flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingLeft: '20px' }}>
        <h3>Hora do Debate!!</h3>
        <p>É hora de discutir o(s) tópico(s) apresentado(s) pelo colega.</p>
        <ul>
          {discussion.topicos.map(topico => {
            return <li key={topico}>{topico}</li>
          })}
        </ul>
      </Box>
    </CardContent>
  )
}

const LastMinutesToStudyCardContent = (
  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '100%', width: '100%' }}>
    <Typography variant="h6" sx={{ alignSelf: 'flex-start', marginLeft: '20px', marginBottom: '40px', color: '#FFF' }}>
      CORREE QUE DÁ!
    </Typography>
    <img src="/images/last_minutes.png" alt="" />
    <Typography variant="h6" sx={{ color: '#FFF', marginTop: '30px' }}>
      Rodada de pesquisa:
    </Typography>
    <Typography variant="body1" sx={{ color: '#FFF' }}>
      5min
    </Typography>
  </CardContent>
);



interface IInformationCard {
  reuniao: any,
  topicos?: string[],
  apresentacoes: IApresentacao[],
  apresentacaoAtual: number | null,
  discussion: IDiscussion
}

const InformationCard = ({ reuniao, topicos, apresentacaoAtual, apresentacoes, discussion }: IInformationCard) => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <Box ref={containerRef}>
      <Card sx={{ bgcolor: '#6947DB', maxWidth: '570px', height: "max-content" }}>
        {(!discussion.inDiscussion && reuniao?.status === 'AGUARDANDO_PARTICIPANTES') && <Slide direction="right" in={!discussion.inDiscussion && reuniao?.status === 'AGUARDANDO_PARTICIPANTES'}>
          {WaitingParticipantsCardContent}
        </Slide>}

        {(!discussion.inDiscussion && reuniao?.status === 'EM_ESTUDO') && <Slide direction="right" in={!discussion.inDiscussion && reuniao?.status === 'EM_ESTUDO'}>
          <div>
            <StudyTimeCardContent topicos={topicos} />
          </div>
        </Slide>}

        {/* {number === 3 && <Slide direction="right" in={number === 3}>
          {LastMinutesToStudyCardContent}
        </Slide>} -- Liberar esse quando tiver o evento de falta 5 minutos */}

        {(!discussion.inDiscussion && reuniao?.status === 'EM_APRESENTACAO') && <Slide direction="right" in={!discussion.inDiscussion && reuniao?.status === 'EM_APRESENTACAO'}>
          <div>
            <PresentationsCardContent apresentacaoAtual={apresentacaoAtual} apresentacoes={apresentacoes} />
          </div>
        </Slide>}

        {(discussion.inDiscussion && reuniao?.status === 'EM_APRESENTACAO') && <Slide direction="right" in={discussion.inDiscussion && reuniao?.status === 'EM_APRESENTACAO'}>
          <div>
            <DiscussionCardContent {...discussion} />
          </div>
        </Slide>}
      </Card>
    </Box>
  )
}

export { InformationCard };