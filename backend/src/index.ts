import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.get('/ping', async (req, res) => {
	res.send('Hello... I am working fine');
});

fastify.register(cors, {
  origin: '*',
  exposedHeaders: 'token'
});

const PORT = Number(process.env.PORT || 3001);
const start = async () => {
  try {
    const address = await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Server running at ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1); // Exit the process on failure
  }
};

start();