import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.get('/ping', async (req, res) => {
	res.send('Hello... I am working fine');
});

fastify.listen({
	port: Number(process.env.PORT),
	host: '0.0.0.0'
}, (err, address) => {
	if (err) {
		fastify.log.error(err);
	}
	fastify.log.info(`### Server listening at ${address} ###`);
});