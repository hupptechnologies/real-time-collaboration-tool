import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import {
	message,
	statusCodes,
	Response,
	generateEncryptedPassword,
} from '../utils';
import { TQuery, TUsers } from '../interface';

const { Users } = models;
const list = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const { field = 'createdAt', sort = 'DESC' } = req.query as TQuery;
		const { count, rows } = await Users.findAndCountAll({
			order: [[field, sort]],
		});

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.USER_LIST_SUCCESS,
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
		const userId = req.user.id;
		const existingUser = await Users.findOne({
			where: {
				id: userId,
				isDeleted: false,
			},
		});
		if (!existingUser) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}

		delete existingUser.dataValues.password;
		delete existingUser.dataValues.isDeleted;
		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.USER_DETAIL_FETCHED,
			data: existingUser,
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
		const { username } = req.body as TUsers;
		const userId = req.user.id;

		const missingKeys = [];
		if (!username) {
			missingKeys.push('username');
		}

		if (missingKeys.length > 0) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: `Required Keys: ${missingKeys.join(', ')}`,
			});
		}

		const existingUser = await Users.findOne({
			where: {
				id: userId,
				isDeleted: false,
			},
		});
		if (!existingUser) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}

		await Users.update(
			{
				username,
			},
			{
				where: {
					id: userId,
				},
			},
		);

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.USER_UPDATE_SUCCESS,
		});
	} catch (error: any) {
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

const resetPassword = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const { password } = req.body as TUsers;
		const userId = req.user.id;

		const missingKeys = [];
		if (!password) {
			missingKeys.push('password');
		}

		if (missingKeys.length > 0) {
			Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: `Required Keys: ${missingKeys.join(', ')}`,
			});
		}

		const existingUser = await Users.findOne({
			where: {
				id: userId,
				isDeleted: false,
			},
		});
		if (!existingUser) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}

		const newPassword = await generateEncryptedPassword(password);
		await Users.update(
			{
				password: newPassword,
			},
			{
				where: {
					id: userId,
				},
			},
		);

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.RESET_PASSWORD_SUCCESS,
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
		const userId = req.user.id;

		const existingUser = await Users.findOne({
			where: {
				id: userId,
				isDeleted: false,
			},
		});
		if (!existingUser) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}

		await Users.update(
			{
				isDeleted: true,
			},
			{
				where: {
					id: userId,
				},
			},
		);

		return Response.send(res, {
			status: statusCodes.SUCCESS,
			success: true,
			message: message.USER_DELETE_SUCCESS,
		});
	} catch (error: any) {
		return Response.send(res, {
			status: statusCodes.BAD_REQUEST,
			success: false,
			message: error.message,
		});
	}
};

export default { list, findById, update, remove, resetPassword };
