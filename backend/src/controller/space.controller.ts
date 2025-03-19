import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TQuery, TSpace } from '../interface';
import { message, statusCodes, Response } from '../utils';
const { Spaces } = models;

class SpaceContorller {
	async create(req: FastifyRequest, res: FastifyReply) {
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
	}

	async list(req: FastifyRequest, res: FastifyReply) {
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
	}
}

export default new SpaceContorller();
