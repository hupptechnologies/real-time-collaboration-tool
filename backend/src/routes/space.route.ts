import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { verifyToken } from '../utils';
import spaceController from '../controller/space.controller';

const spaceRoutes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.addHook('preValidation', fastify.auth([verifyToken]));

	fastify.route({
		method: 'POST',
		url: '/create',
		handler: spaceController.create,
	});

	fastify.route({
		method: 'GET',
		url: '/list',
		handler: spaceController.list,
	});
};

export default spaceRoutes;
