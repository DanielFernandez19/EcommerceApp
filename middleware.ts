import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

// Si está tratando de acceder al dashboard o sus rutas hijas
  if (pathname.startsWith('/dashboard')) {
    // Verificar si hay un token en las cookies
    const token = request.cookies.get('auth_token')?.value;

    // Si no hay token, redirigir al login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // NOTA: El middleware no puede validar el rol sin hacer una petición al backend
    // La validación de rol se hará en el layout del dashboard
  }

// Comentado: Permitir acceso a login/register aunque esté logueado
  // El usuario puede querer cambiar de cuenta o cerrar sesión
  /*
  if ((pathname === '/login' || pathname === '/register')) {
    const token = request.cookies.get('auth_token')?.value;
    
    if (token) {
      const landingUrl = new URL('/', request.url);
      return NextResponse.redirect(landingUrl);
    }
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
};