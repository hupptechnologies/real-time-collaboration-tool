import { NextResponse } from 'next/server';

const protectedRoutes = ['/home', '/dashboard', '/counter'];

export function middleware(req: Request) {
	const token = req.headers.get('authorization'); // Get token from headers (better approach)
	if (!token && protectedRoutes.includes(new URL(req.url).pathname)) {
		return NextResponse.redirect(new URL('/', req.url));
	}
	return NextResponse.next(); // Continue request if authenticated
}

export const config = {
	matcher: ['/home', '/dashboard', '/counter'] // Apply only to these routes
};
