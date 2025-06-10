import { FastifySchema } from 'fastify';

export const createPageSchema: FastifySchema = {
	body: {
		type: 'object',
		required: ['title', 'content', 'spaceId'],
		properties: {
			title: { type: 'string' },
			content: { type: 'string' },
			spaceId: { type: 'number' },
			status: {
				type: 'string',
				enum: ['draft', 'published', 'archived'],
				default: 'draft',
			},
			parentId: { type: ['number', 'null'] },
			folderId: { type: ['number', 'null'] },
		},
		additionalProperties: false,
	},
};

export const updatePageSchema: FastifySchema = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: { type: 'number' },
		},
	},
	body: {
		type: 'object',
		properties: {
			title: { type: 'string' },
			content: { type: 'string' },
			status: {
				type: 'string',
				enum: ['draft', 'published', 'archived'],
				default: 'draft',
			},
			parentId: { type: ['number', 'null'] },
			folderId: { type: ['number', 'null'] },
		},
		additionalProperties: false,
	},
};
