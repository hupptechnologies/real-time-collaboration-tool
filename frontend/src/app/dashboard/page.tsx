'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import socket from '@/utils/socket';

const Home: React.FC = () => {
	const [messages, setMessages] = useState<string[]>([]);
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		socket.connect();

		socket.on('connect', () => {
			console.info('Connected to socket.io server');
		});

		socket.on('message', (msg: string) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => {
			socket.off('message');
			socket.disconnect();
		};
	}, []);

	const sendMessage = () => {
		if (message.trim()) {
			socket.emit('message', message);
			setMessage('');
		}
	};

	return (
		<div>
			<h1>Confluence Collaboration</h1>
			<div>
				{messages.map((msg, index) => (
					<div key={index}>{msg}</div>
				))}
			</div>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type a message..."
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};

export default ProtectedRoute(Home);
