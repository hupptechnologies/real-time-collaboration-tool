import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TQuery, TSpace } from '../interface';
import { message, statusCodes, Response, sendError } from '../utils';
import { getSocketInstance } from '../utils/socket';
import { Op } from 'sequelize';
const { Spaces, Folder, Page } = models;

const create = async (
	req: FastifyRequest<{ Body: TSpace }>,
	res: FastifyReply,
) => {
	try {
		const spaceData = req.body;
		const userId = req.user.id;
		const existingSpace = await Spaces.findOne({
			where: {
				name: {
					[Op.eq]: spaceData.name?.trim(),
				},
				ownerId: userId,
			},
		});
		if (existingSpace) {
			return sendError(res, message.SPACE_ALREADY_EXISTS);
		}

		spaceData.ownerId = userId;
		const newSpace = await Spaces.create(spaceData);
		const io = getSocketInstance();
		io.emit('space:created', newSpace);
		Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_SUCCESS,
			data: newSpace,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const list = async (
	req: FastifyRequest<{ Querystring: TQuery }>,
	res: FastifyReply,
) => {
	try {
		const { field = 'createdAt', sort = 'DESC' } = req.query;
		const userId = req.user.id;
		const { count, rows } = await Spaces.findAndCountAll({
			where: {
				ownerId: userId,
			},
			order: [[field, sort]],
		});

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_LIST_SUCCESS,
			totalCount: count,
			data: rows,
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
		const userId = req.user.id;

		const existingSpace = await Spaces.findOne({
			where: {
				id: id,
				ownerId: userId,
			},
			include: [
				{
					model: Folder,
					as: 'folders',
					required: false,
					include: [
						{
							model: Page,
							as: 'pages',
							required: false,
							where: {
								parentId: null,
							},
							include: [
								{
									model: Page,
									as: 'pages',
									required: false,
									where: {
										folderId: null,
									},
								},
							],
						},
					],
				},
				{
					model: Page,
					as: 'pages',
					required: false,
					where: {
						parentId: null,
						folderId: null,
					},
					include: [
						{
							model: Page,
							as: 'pages',
							required: false,
							where: {
								folderId: null,
							},
						},
					],
				},
			],
		});

		if (!existingSpace) {
			return sendError(res, message.DETAIL_NOT_FOUND);
		}

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_DETAIL_FETCHED,
			data: existingSpace,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const update = async (
	req: FastifyRequest<{ Body: TSpace; Params: { id: number } }>,
	res: FastifyReply,
) => {
	try {
		const { name, description } = req.body;
		const { id } = req.params;
		const userId = req.user.id;
		const existingSpace = await Spaces.findOne({
			where: {
				id: id,
				ownerId: userId,
			},
		});
		if (!existingSpace) {
			return sendError(res, message.DETAIL_NOT_FOUND);
		}
		const existingSpaceName = await Spaces.findOne({
			where: {
				name: name,
				ownerId: userId,
			},
		});
		if (existingSpaceName) {
			return sendError(res, message.SPACE_ALREADY_EXISTS);
		}

		await Spaces.update(
			{
				name,
				description,
			},
			{
				where: {
					id: id,
				},
			},
		);

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_UPDATE_SUCCESS,
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
		const userId = req.user.id;
		const existingSpace = await Spaces.findOne({
			where: {
				id: id,
				ownerId: userId,
			},
		});
		if (!existingSpace) {
			return sendError(res, message.DETAIL_NOT_FOUND);
		}

		await Spaces.destroy({
			where: {
				id: id,
				ownerId: userId,
			},
		});

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_DELETED_SUCCESS,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

export default { create, list, findById, update, remove };
