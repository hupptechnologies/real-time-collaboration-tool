import { FastifySchema } from 'fastify';

export const createFolderSchema: FastifySchema = {
	body: {
		type: 'object',
		required: ['name', 'spaceId', 'parentFolderId'],
		properties: {
			name: { type: 'string', minLength: 1, pattern: '^(?!\\s*$).+' },
			spaceId: { type: 'number' },
			parentFolderId: { type: ['number', 'null'] },
			description: { type: 'string' },
		},
		additionalProperties: false,
	},
};
