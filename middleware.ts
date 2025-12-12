import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

// Si está tratando de acceder al dashboard o sus rutas hijas
  if (pathname.startsWith('/dashboard')) {
    // Verificar si hay un token en las cookies (forzar lectura fresca)
    const token = request.cookies.get('auth_token')?.value;
    const userCookie = request.cookies.get('auth_user')?.value;

    // Si no hay token o usuario, redirigir al login
    if (!token || !userCookie) {
      const loginUrl = new URL('/Login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Validar que el usuario tenga rol de admin (1 o 2)
    try {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      
      if (![1, 2].includes(userData.idRole)) {
        const loginUrl = new URL('/Login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      const loginUrl = new URL('/Login', request.url);
      return NextResponse.redirect(loginUrl);
    }
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

// Forzar revalidación de cookies y prevenir cache
  const response = NextResponse.next();
  
  // Agregar headers para prevenir cache del navegador
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}

export const config = {
    matcher: ['/dashboard/:path*', '/Login', '/Register', '/']
  };