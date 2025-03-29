import { Client } from '@stomp/stompjs'
import { TokenHandler } from '../utils/TokenHandler';


const stompClient = new Client({
  brokerURL: `ws://localhost:8080/ws?token=${TokenHandler.accessToken}`,
  reconnectDelay: 5000
});

export { stompClient }