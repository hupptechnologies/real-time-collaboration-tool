import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth.route';
import spaceRoutes from './space.route';

const routes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.register(authRoutes, {
		prefix: '/api/auth',
	});
	fastify.register(spaceRoutes, {
		prefix: '/api/space',
	});
};

export default routes;
