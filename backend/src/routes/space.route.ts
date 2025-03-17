import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import SpaceController from '../controller/space.controller';
import { verifyToken } from '../utils';

const spaceRoutes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.addHook('preValidation', fastify.auth([verifyToken]));

	fastify.route({
		method: 'POST',
		url: '/create',
		handler: SpaceController.create,
	});
};

export default spaceRoutes;
