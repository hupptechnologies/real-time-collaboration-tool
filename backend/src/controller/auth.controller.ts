import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { TUsers } from '../interface';
import { message, statusCodes, Response } from '../utils';

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
				// password: await generateEncryptedPassword(userData.password),
				role: req.url.includes('admin') ? 'admin' : 'user',
			});

			const newUser = await Users.create(userData);
			// const token = await generateResponseTokens({
			// 	id: newUser.dataValues.id,
			// 	email: newUser.dataValues.email,
			// 	role: newUser.dataValues.role,
			// });
			// res.header('token', token);

			delete newUser.dataValues.password;

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
}

export default new UserContorller();
