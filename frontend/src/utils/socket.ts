import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const socket = io(SOCKET_URL, {
	transports: ['websocket'],
	autoConnect: false
});

export default socket;
