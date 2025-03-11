import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import process from 'node:process';
import { checkIsUserExists } from '../controller/auth.controller';
import { Response, statusCodes, message } from './index';
import { TTokenDetail } from '../interface';

const secretKey: string = process.env.JWT_SECRET_KEY || '';
export const generateResponseTokens = (detail: TTokenDetail) =>
	new Promise((resolve, reject) => {
		try {
			const token = jwt.sign(detail, secretKey, {
				expiresIn: '1d',
			});
			resolve(token);
		} catch (error: any) {
			reject(error);
		}
	});

export const generateEncryptedPassword = async (password: any) =>
	await bcrypt.hash(password, 10);

export const comparePassWord = async (password: any, enryptPass: string) =>
	bcrypt.compare(password, enryptPass);

export const verifyAdminToken = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction,
) => {
	const token: any = req.headers['token'];
	jwt.verify(token, secretKey, (err: any, decoded: any) => {
		if (err) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}
		if (decoded.role && decoded.role !== 'admin') {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}
		req.user = decoded;
	});

	done();
};

export const verifyToken = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction,
) => {
	const token: any = req.headers['token'];
	jwt.verify(token, secretKey, async (err: any, decoded: any) => {
		if (err) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}

		const userExists = await checkIsUserExists(decoded.id);
		if (!userExists) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}
		req.user = decoded;
	});

	done();
};
