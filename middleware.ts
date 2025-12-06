import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si está tratando de acceder al dashboard o sus rutas hijas
  if (pathname.startsWith('/dashboard')) {
    // Verificar si hay un token en las cookies o localStorage
    const token = request.cookies.get('auth_token')?.value;

    // Si no hay token, redirigir al login
    if (!token) {
      const loginUrl = new URL('/Login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si está logueado y trata de ir a login/register, redirigir al dashboard
  if ((pathname === '/Login' || pathname === '/Register')) {
    const token = request.cookies.get('auth_token')?.value;
    
    if (token) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/Login', '/Register']
};