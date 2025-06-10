import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import pageController from '../controller/page.controller';
import { verifyToken } from '../utils';
import { createPageSchema, updatePageSchema } from '../validation/page';

const page = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.addHook('preValidation', verifyToken);

	fastify.route({
		method: 'POST',
		url: '/new',
		schema: createPageSchema,
		handler: pageController.create,
	});

	fastify.route({
		method: 'PUT',
		url: '/:id',
		schema: updatePageSchema,
		handler: pageController.update,
	});

	fastify.route({
		method: 'GET',
		url: '/:id',
		handler: pageController.findById,
	});

	fastify.route({
		method: 'GET',
		url: '/all/:spaceId',
		handler: pageController.getAll,
	});

	fastify.route({
		method: 'DELETE',
		url: '/:id',
		handler: pageController.remove,
	});
};

export default page;
