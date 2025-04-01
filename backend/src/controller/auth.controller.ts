import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TUsers } from '../interface';
import {
	message,
	statusCodes,
	Response,
	generateResponseTokens,
	generateEncryptedPassword,
	comparePassWord,
} from '../utils';

const { Users } = models;

export const checkIsUserExists = async (id: number) => {
	const existingUser = await Users.findOne({
		where: {
			id,
			isDeleted: false,
		},
	});

	return existingUser;
};

class UserContorller {
	async signup(req: FastifyRequest, res: FastifyReply) {
		try {
			const userData = req.body as TUsers;

			const existingUser = await Users.findOne({
				where: {
					email: userData.email?.toLowerCase(),
					isDeleted: false,
				},
			});
			if (existingUser) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.EMAIL_ALREADY_IN_USE,
				});
				return;
			}

			Object.assign(userData, {
				password: await generateEncryptedPassword(userData.password),
				role: req.url.includes('admin') ? 'admin' : 'user',
			});

			const newUser = await Users.create(userData);
			delete newUser.dataValues.password;
			delete newUser.dataValues.isDeleted;

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.REGISTRATION_SUCCESS,
				data: newUser,
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

	async login(req: FastifyRequest, res: FastifyReply) {
		try {
			const userData = req.body as TUsers;
			const existingUser = await Users.findOne({
				where: {
					email: userData.email?.toLowerCase(),
					isDeleted: false,
				},
			});
			if (!existingUser) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.LOGIN_INVALID,
				});
				return;
			}

			const isMatched = await comparePassWord(
				userData.password,
				existingUser?.dataValues.password,
			);

			if (!isMatched) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.LOGIN_INVALID,
				});
				return;
			}

			const { token, refreshToken } = await generateResponseTokens({
				id: existingUser.dataValues.id,
				username: existingUser.dataValues.username,
				email: existingUser.dataValues.email,
				role: existingUser.dataValues.role,
			});
			res.header('token', token);
			res.header('refershToken', refreshToken);
			delete existingUser.dataValues.password;
			delete existingUser.dataValues.isDeleted;

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.LOGIN_SUCCESS,
				data: existingUser,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async refreshToken(req: FastifyRequest, res: FastifyReply) {
		try {
			const user = req.user;
			if (!user) {
				return Response.send(res, {
					status: statusCodes.UNAUTHORIZED,
					success: false,
					message: message.UNAUTHORIZED,
				});
			}

			const { token } = await generateResponseTokens({
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			});
			res.header('token', token);
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.REFRESH_TOKEN_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}
}

export default new UserContorller();
