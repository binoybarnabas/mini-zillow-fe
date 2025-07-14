// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that don't need authentication
const publicPaths = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
   return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/', '/dashboard/:path*', '/admin/:path*', '/auth/:path*', '/property/:path*'],
};
