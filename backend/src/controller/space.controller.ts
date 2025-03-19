import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TQuery, TSpace } from '../interface';
import { message, statusCodes, Response } from '../utils';
const { Spaces } = models;

const create = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const spaceData = req.body as TSpace;
		const userId = req.user.id;
		const existingSpace = await Spaces.findOne({
			where: {
				name: spaceData.name,
				ownerId: userId,
			},
		});
		if (existingSpace) {
			Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.SPACE_ALREADY_EXISTS,
			});
			return;
		}
		spaceData.ownerId = userId;
		const newSpace = await Spaces.create(spaceData);
		Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_SUCCESS,
			data: newSpace,
		});
	} catch (error: any) {
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

const list = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const { field = 'createdAt', sort = 'DESC' } = req.query as TQuery;
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
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

const findById = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const { id } = req.params as { id: number };
		const userId = req.user.id;

		const existingSpace = await Spaces.findOne({
			where: {
				id: id,
				ownerId: userId,
			},
		});

		if (!existingSpace) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.SPACE_DETAIL_FETCHED,
			data: existingSpace,
		});
	} catch (error: any) {
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

const update = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const { name, description } = req.body as TSpace;
		const { id } = req.params as { id: number };
		const userId = req.user.id;
		const existingSpace = await Spaces.findOne({
			where: {
				id: id,
				ownerId: userId,
			},
		});
		if (!existingSpace) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}
		const existingSpaceName = await Spaces.findOne({
			where: {
				name: name,
				ownerId: userId,
			},
		});
		if (existingSpaceName) {
			Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.SPACE_ALREADY_EXISTS,
			});
			return;
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
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

const remove = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const { id } = req.params as { id: number };
		const userId = req.user.id;
		const existingSpace = await Spaces.findOne({
			where: {
				id: id,
				ownerId: userId,
			},
		});
		if (!existingSpace) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
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
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

export default { create, list, findById, update, remove };
