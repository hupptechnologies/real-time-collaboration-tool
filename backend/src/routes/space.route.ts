import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { verifyToken } from '../utils';
import spaceController from '../controller/space.controller';

const spaceRoutes = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.addHook('preValidation', verifyToken);

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

	fastify.route({
		method: 'GET',
		url: '/:id',
		handler: spaceController.findById,
	});

	fastify.route({
		method: 'PUT',
		url: '/:id',
		handler: spaceController.update,
	});

	fastify.route({
		method: 'DELETE',
		url: '/:id',
		handler: spaceController.remove,
	});
};

export default spaceRoutes;
