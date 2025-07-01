import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request) {

    const { pathname } = request.nextUrl;
    const token = await cookies().get('token');

    if (!token) {

        if (pathname === '/login') {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {

        const verifiedToken = jwtVerify(token.value,new TextEncoder().encode(process.env.AUTHENTICATION_KEY));
        if (!verifiedToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        else {

            if (pathname === '/login') {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
        return NextResponse.next();

    } catch (error) {

        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

}

export const config = {

    matcher: ['/admin/:path*','/login']
}