import { NextResponse } from 'next/server';
const protectedRoutes = ['/home', '/dashboard', '/counter'];

const authentication = (req: any) => {
	const isAuthenticated = localStorage.getItem('token');
	if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathName)) {
		const url = new URL('/', req.nextUrl.origin);
		return NextResponse.redirect(url.toString());
	}
};

export default authentication;
