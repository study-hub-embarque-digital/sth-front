import React, { useEffect, useState } from "react";
import { Dificuldade, getRoom, getSalasOfRoom, IRoom } from "../../../services/roomService";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { RoomTabPanel } from "./room-tab-panel/RoomTabPanel";
import { ISalaTematica, ListagemSalaTematica } from "./sala-tematica/ListagemSalaTematica";

const RoomDetail = () => {
  const [room, setRoom] = useState<IRoom | undefined>();
  const [salas, setSalas] = useState<ISalaTematica[]>([]);
  const [difficulty, setDifficulty] = useState<string>(Dificuldade.INICIANTE);
  const { roomId } = useParams();

  const fetchRoom = async () => {
    try {
      const fetchedRoom = await getRoom(roomId as string);
      setRoom(fetchedRoom);
    } catch (error) {
      console.error('Erro ao buscar rooms:', error);
    }
  };


  const fetchSalas = async () => {
    try {
      const fetchedSalas = await getSalasOfRoom(roomId as string, difficulty);
      setSalas(fetchedSalas);
    } catch (error) {
      console.error('Erro ao buscar rooms:', error);
    }
  };

  useEffect(() => {
    fetchSalas();
  }, [difficulty, roomId]);


  useEffect(() => {
    fetchRoom();
  }, [roomId])

  const handledifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ width: '100%' }}> {/* sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }} */}
      <Box>
        {room?.image ?
          <img src={room?.image} alt={room?.title} />
          :
          <div
            style={{
              height: 130,
              width: '100%',
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px'
            }}
          >
            <Typography variant="body2" sx={{ color: '#666' }}>
              Sem imagem
            </Typography>
          </div>}
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '23px', marginBottom: '13px' }}>{room?.title}</Typography>
        <Typography>{room?.description}</Typography>
      </Box>

      <Box sx={{ marginTop: '30px', marginBottom: '50px' }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Dificuldade</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={difficulty}
            onChange={handledifficultyChange}
            name="radio-buttons-group"
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel value={Dificuldade.INICIANTE} control={<Radio />} label="Iniciante" />
            <FormControlLabel value={Dificuldade.INTERMEDIARIO} control={<Radio />} label="Intermediário" />
            <FormControlLabel value={Dificuldade.AVANCADO} control={<Radio />} label="Avançado" />
          </RadioGroup>
        </FormControl>

        {salas.length > 0 ?
          <ul>
            {salas.map(sala => {
              return <li key={sala.salaTematicaId}>{sala.nome}</li>
            })}
          </ul>
          : <p>Sem tópicos ainda, tente outra dificuldade...</p>}
      </Box>

      <RoomTabPanel
        tabItems={[
          {
            title: 'Salas Temáticas',
            index: 0,
            element: <ListagemSalaTematica salasTematica={salas} roomId={roomId} />
          },
          {
            title: 'Biblioteca',
            index: 1,
            element: <p>Teste 2</p>
          },
          {
            title: 'Playground',
            index: 2,
            element: <p>Teste 3</p>
          }
        ]}
      />
      {/* {salas.map((sala) => (
        <Button key={sala?.salaTematicaId} onClick={() => navigate(`/rooms/${roomId}/${sala?.salaTematicaId}`)}>
          <SalaTematicaCard salaTematica={sala} />
        </Button>
      ))} */}
      {/* <iframe src="https://stackblitz.com/edit/vitejs-vite-9lcy3mbf?embed=1&file=index.html" width={'100%'} height={400}></iframe> */}
    </Box>
  );
};

export { RoomDetail };
