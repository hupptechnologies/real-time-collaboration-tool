import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth.route';
import spaceRoutes from './space.route';
import users from './users.route';

const routes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.register(authRoutes, {
		prefix: '/api/auth',
	});
	fastify.register(users, {
		prefix: '/api/user',
	});
	fastify.register(spaceRoutes, {
		prefix: '/api/space',
	});
};

export default routes;
