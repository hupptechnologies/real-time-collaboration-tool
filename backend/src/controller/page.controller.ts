import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TPage } from '../interface';
import { message, Response, sendError, statusCodes } from '../utils';

const { Page } = models;

const create = async (
	req: FastifyRequest<{ Body: TPage }>,
	res: FastifyReply,
) => {
	try {
		const userId = req.user.id;
		const {
			title = '',
			content = '',
			spaceId,
			status,
			parentId,
			folderId,
		} = req.body;

		const page = await Page.create({
			title,
			content,
			spaceId,
			status,
			parentId,
			folderId,
			userId,
		});

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.PAGE_SUCCESS,
			data: page,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const update = async (
	req: FastifyRequest<{
		Body: Partial<TPage>;
		Params: { id: number };
	}>,
	res: FastifyReply,
) => {
	try {
		const { id } = req.params;
		const updateData = req.body;

		const validUpdateProperties = [
			'title',
			'content',
			'status',
			'parentId',
			'folderId',
		];

		const hasValidProperty = validUpdateProperties.some(
			(prop) => prop in updateData,
		);

		if (!hasValidProperty) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.PAGE_UPDATE_INVALID,
			});
		}

		const page = await Page.findByPk(id);
		if (!page) {
			return Response.send(res, {
				status: statusCodes.NOT_FOUND,
				success: false,
				message: message.PAGE_NOT_FOUND,
			});
		}

		await page.update({
			...updateData,
			updatedAt: new Date(),
		});

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.PAGE_UPDATED,
			data: page,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const findById = async (
	req: FastifyRequest<{ Params: { id: number } }>,
	res: FastifyReply,
) => {
	try {
		const { id } = req.params;
		const page = await Page.findByPk(id);
		if (!page) {
			return Response.send(res, {
				status: statusCodes.NOT_FOUND,
				success: false,
				message: message.PAGE_NOT_FOUND,
			});
		}
		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.PAGE_DETAIL_FETCHED,
			data: page,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const getAll = async (
	req: FastifyRequest<{ Params: { spaceId: number } }>,
	res: FastifyReply,
) => {
	try {
		const { spaceId } = req.params;
		const pages = await Page.findAll({
			where: {
				spaceId,
			},
		});
		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.PAGE_LIST_SUCCESS,
			data: pages,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const remove = async (
	req: FastifyRequest<{ Params: { id: number } }>,
	res: FastifyReply,
) => {
	try {
		const { id } = req.params;
		const page = await Page.findByPk(id);
		if (!page) {
			return Response.send(res, {
				status: statusCodes.NOT_FOUND,
				success: false,
				message: message.PAGE_NOT_FOUND,
			});
		}
		await page.destroy();
		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.PAGE_DELETED,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

export default { create, update, findById, getAll, remove };
