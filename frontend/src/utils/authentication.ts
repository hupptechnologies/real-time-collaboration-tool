import { useAuth } from '@/context/AuthContext';
import { NextResponse } from 'next/server';
const protectedRoutes = ['/dashboard'];

const authentication = (req: any) => {
	const { user } = useAuth();
	if (!user && protectedRoutes.includes(req.nextUrl.pathName)) {
		const url = new URL('/', req.nextUrl.origin);
		return NextResponse.redirect(url.toString());
	}
};

export default authentication;
