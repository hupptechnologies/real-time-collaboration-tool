import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import AuthController from '../controller/auth.controller';

const authRoutes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.route({
		method: 'POST',
		url: '/signup',
		handler: AuthController.signup,
	});

	fastify.route({
		method: 'POST',
		url: '/admin/signup',
		handler: AuthController.signup,
	});

	fastify.route({
		method: 'POST',
		url: '/login',
		handler: AuthController.login,
	});
};

export default authRoutes;
