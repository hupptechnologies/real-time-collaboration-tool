import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TFloder, TQuery } from '../interface';
import { message, statusCodes, Response, sendError } from '../utils';
import { Op } from 'sequelize';
const { Folder, Spaces } = models;

const create = async (
	req: FastifyRequest<{ Body: TFloder }>,
	res: FastifyReply,
) => {
	try {
		const folderData = req.body;
		const userId = req.user.id;
		const [existingFolder, existingSpace] = await Promise.all([
			Folder.findOne({
				where: {
					name: folderData.name?.trim(),
					spaceId: folderData.spaceId,
					userId: userId,
				},
			}),
			Spaces.findOne({
				where: {
					id: folderData.spaceId,
				},
			}),
		]);

		if (existingFolder) {
			return sendError(res, message.FOLDER_ALREADY_EXISTS);
		}
		if (!existingSpace) {
			return sendError(res, message.SPACE_NOT_FOUND);
		}

		if (folderData.parentFolderId !== null) {
			const isParentFolderExists = await Folder.findOne({
				where: {
					id: folderData.parentFolderId,
				},
			});
			if (!isParentFolderExists) {
				return sendError(res, message.FOLDER_PARENT_ERROR);
			}
		}

		folderData.userId = userId;
		const newFolder = await Folder.create(folderData);

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.FOLDER_SUCCESS,
			data: newFolder,
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
		const { count, rows } = await Folder.findAndCountAll({
			where: {
				userId: userId,
			},
			order: [[field, sort]],
		});

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.FOLDER_LIST_SUCCESS,
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
		const existingFolder = await Folder.findOne({
			where: {
				id: id,
				userId: userId,
			},
		});
		if (!existingFolder) {
			return sendError(res, message.DETAIL_NOT_FOUND);
		}

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.FOLDER_DETAIL_FETCHED,
			data: existingFolder,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

const update = async (
	req: FastifyRequest<{ Body: TFloder; Params: { id: number } }>,
	res: FastifyReply,
) => {
	try {
		const { name, description } = req.body;
		const { id } = req.params;
		const userId = req.user.id;
		const trimmedName = name?.trim();
		const existingFolder = await Folder.findOne({
			where: {
				id: id,
				userId: userId,
			},
		});
		if (!existingFolder) {
			return sendError(res, message.DETAIL_NOT_FOUND);
		}
		const existingFolderName = await Folder.findOne({
			where: {
				name: trimmedName,
				userId: userId,
				id: { [Op.ne]: id },
			},
		});
		if (existingFolderName) {
			return sendError(res, message.FOLDER_ALREADY_EXISTS);
		}

		await Folder.update(
			{
				name: trimmedName,
				description,
			},
			{
				where: {
					id,
				},
			},
		);

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.FOLDER_UPDATE_SUCCESS,
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
		const deletedCount = await Folder.destroy({
			where: {
				id,
				userId,
			},
		});

		if (deletedCount === 0) {
			return sendError(res, message.DETAIL_NOT_FOUND);
		}

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.FOLDER_DELETED_SUCCESS,
		});
	} catch (error: any) {
		return sendError(res, error.message);
	}
};

export default { create, update, remove, findById, list };
