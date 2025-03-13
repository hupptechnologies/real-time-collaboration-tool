import { Server } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

let io: IOServer | null = null;

export const intiSocket = (server: Server) => {
	io = new IOServer(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket: Socket) => {
		socket.on('myEvent', (data: any) => {
			console.info('myEvent received:', data);
		});

		socket.on('disconnect', () => {
			console.info('Socket Disconnected:', socket.id);
		});
	});
};

export const getSocketInstance = (): IOServer => {
	if (!io) {
		throw new Error('Socket is not initialized');
	}

	return io;
};
