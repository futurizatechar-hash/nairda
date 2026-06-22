import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  const url = request.nextUrl.clone();

  const isLoginPage = url.pathname === '/admin/login';

  if (url.pathname.startsWith('/admin')) {
    if (!token && !isLoginPage) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    
    if (token && isLoginPage) {
      url.pathname = '/admin/agenda';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
