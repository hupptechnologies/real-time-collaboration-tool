import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import folderController from '../controller/folder.controller';
import { verifyToken } from '../utils';
import { createFolderSchema } from '../validation/folder';

const folder = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.addHook('preValidation', verifyToken);

	fastify.route({
		method: 'POST',
		url: '/new',
		schema: createFolderSchema,
		handler: folderController.create,
	});

	fastify.route({
		method: 'GET',
		url: '/list',
		handler: folderController.list,
	});

	fastify.route({
		method: 'GET',
		url: '/:id',
		handler: folderController.findById,
	});

	fastify.route({
		method: 'PUT',
		url: '/:id',
		handler: folderController.update,
	});

	fastify.route({
		method: 'DELETE',
		url: '/:id',
		handler: folderController.remove,
	});
};

export default folder;
