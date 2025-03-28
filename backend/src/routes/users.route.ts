import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { verifyToken } from '../utils';
import UserController from '../controller/users.controller';

const users = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.addHook('preValidation', verifyToken);
	fastify.route({
		method: 'GET',
		url: '/detail',
		handler: UserController.findById,
	});

	fastify.route({
		method: 'PUT',
		url: '/update',
		handler: UserController.update,
	});

	fastify.route({
		method: 'PUT',
		url: '/reset-password',
		handler: UserController.resetPassword,
	});
};

export default users;
