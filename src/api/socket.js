import { Client } from '@stomp/stompjs'
import { TokenHandler } from '../utils/TokenHandler';


const stompClient = new Client({
  brokerURL: `${import.meta.env.VITE_WS_URL}?token=${TokenHandler.accessToken}`,
  reconnectDelay: 5000
});

export { stompClient }