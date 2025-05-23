import { FastifyReply } from 'fastify';

interface ResponseModel {
	success?: boolean;
	status: number;
	error?: string;
	data?: any;
	totalCount?: number;
	message?: string;
}

export class Response {
	static send(res: FastifyReply, response: ResponseModel) {
		res.code(response.status).send(response);
	}
}

export const sendError = (res: FastifyReply, msg: string) =>
	Response.send(res, {
		status: statusCodes.BAD_REQUEST,
		success: false,
		message: msg,
	});

export const statusCodes = {
	SUCCESS: 200,
	INTERNAL_SERVER_ERR: 500,
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
};
