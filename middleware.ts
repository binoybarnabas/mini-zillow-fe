// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that don't need authentication
const publicPaths = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isPublic = publicPaths.includes(request.nextUrl.pathname);

  // If not logged in and accessing a protected route → redirect to login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
    // return NextResponse.redirect(new URL('/property-finder', request.url));
  }

  // If logged in and trying to access login/register → redirect to dashboard
  if (token && publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/', '/dashboard/:path*', '/admin/:path*', '/auth/:path*', '/property/:path*'],
};
