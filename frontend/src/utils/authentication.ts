import { useAuth } from '@/context/AuthContext';
import { NextResponse } from 'next/server';
const protectedRoutes = ['/dashboard', '/counter'];

const authentication = (req: any) => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathName)) {
		const url = new URL('/', req.nextUrl.origin);
		return NextResponse.redirect(url.toString());
	}
};

export default authentication;
