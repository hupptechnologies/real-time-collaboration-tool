import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import process from 'node:process';
import { checkIsUserExists } from '../controller/auth.controller';
import { Response, statusCodes, message } from './index';
import { TTokenDetail } from '../interface';

const tokenSecretKey: string = process.env.JWT_SECRET_KEY || '';
const refershTokenSecretKey: string = process.env.REFRESH_JWT_SECRET_KEY || '';

export const generateResponseTokens = (detail: TTokenDetail) =>
	new Promise<{ token: string; refreshToken: string }>((resolve, reject) => {
		try {
			const token = jwt.sign(detail, tokenSecretKey, {
				expiresIn: '1m',
			});
			const refreshToken = jwt.sign(detail, refershTokenSecretKey, {
				expiresIn: '15m',
			});
			resolve({ token, refreshToken });
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
	jwt.verify(token, tokenSecretKey, (err: any, decoded: any) => {
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

export const verifyToken = async (req: FastifyRequest, res: FastifyReply) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return Response.send(res, {
			status: statusCodes.UNAUTHORIZED,
			message: message.UNAUTHORIZED,
		});
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, tokenSecretKey) as { id: number };
		const userExists = await checkIsUserExists(decoded.id);

		if (!userExists) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}
		req.user = decoded;
	} catch (error: any) {
		console.info('Auth error', error);
		return Response.send(res, {
			status: statusCodes.UNAUTHORIZED,
			message: message.UNAUTHORIZED,
		});
	}
};

export const verifyRefeshToken = async (
	req: FastifyRequest,
	res: FastifyReply,
) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return Response.send(res, {
			status: statusCodes.UNAUTHORIZED,
			message: message.UNAUTHORIZED,
		});
	}
	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, refershTokenSecretKey) as { id: number };
		const userExists = await checkIsUserExists(decoded.id);

		if (!userExists) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED,
			});
		}
		req.user = decoded;
	} catch (error: any) {
		console.info('Auth error', error);
		return Response.send(res, {
			status: statusCodes.UNAUTHORIZED,
			message: message.UNAUTHORIZED,
		});
	}
};
