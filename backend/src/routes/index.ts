import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth.route';
import spaceRoutes from './space.route';
import users from './users.route';
import folder from './folder.route';
import page from './page.route';

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
	fastify.register(folder, {
		prefix: '/api/folder',
	});
	fastify.register(page, {
		prefix: '/api/page',
	});
};

export default routes;
