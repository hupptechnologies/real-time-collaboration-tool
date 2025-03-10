import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.get('/ping', async (_req, res) => {
	res.send('Hello... I am working fine');
});

fastify.register(cors, {
	origin: '*',
	exposedHeaders: 'token',
});

const PORT = Number(process.env.PORT || 3001);
const start = async () => {
	try {
		const address = await fastify.listen({ port: PORT, host: '0.0.0.0' });
		fastify.log.info(`🚀 Server running at ${address}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
