import { httpClient } from "../api/api";
import { IConteudoEstudo } from "../pages/room/detail/biblioteca/interfaces";

export const getRooms = async () => {
  try {
    const response = await httpClient.get(`/rooms`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};

export const generateRooms = async () => {
  try {
    const response = await httpClient.get(`/rooms/generate`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};

export interface IRoom {
  roomId: string,
  criador: string,
  description: string,
  title: string,
  image: string,
  conteudosRecomendados: IConteudoEstudo[]
}

export interface IConteudoRecomndado {
  conteudoEstudoId: string,
  link: string,
  roomId: string
}

export const getRoom = async (roomId: string): Promise<IRoom> => {
  try {
    const response = await httpClient.get(`/rooms/${roomId}`);

    return response.data as IRoom;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};

export const getSalasOfRoom = async (roomId: string, dificuldade: string) => {
  try {
    const response = await httpClient.get(`/rooms/${roomId}/salas?dificuldade=${dificuldade}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};

export const Dificuldade = {
  INICIANTE: 'INICIANTE',
  INTERMEDIARIO: 'INTERMEDIARIO',
  AVANCADO: 'AVANCADO'
}