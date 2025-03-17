import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TSpace } from '../interface';
import { message, statusCodes, Response } from '../utils';
const { Spaces } = models;

class SpaceContorller {
	async create(req: FastifyRequest, res: FastifyReply) {
		try {
			const spaceData = req.body as TSpace;
			const existingSpace = await Spaces.findOne({
				where: {
					name: spaceData.name,
				},
			});
			if (existingSpace) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.EMAIL_ALREADY_IN_USE,
				});
				return;
			}
			const userId = req.user.id;
			spaceData.ownerId = userId;
			const newSpace = await Spaces.create(spaceData);
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.REGISTRATION_SUCCESS,
				data: newSpace,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message:
					error?.message === 'Validation error'
						? message.EMAIL_ALREADY_IN_USE
						: error.message,
			});
		}
	}
}

export default new SpaceContorller();
