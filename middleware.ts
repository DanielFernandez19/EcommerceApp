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
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Excepción: /dashboard/cart es accesible para todos los usuarios autenticados
    if (pathname.startsWith('/dashboard/cart')) {
      // Solo verificar que esté autenticado, no el rol
      return NextResponse.next();
    }

    // Para otras rutas del dashboard, validar que el usuario tenga rol de admin (1 o 2)
    try {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      
      // Protección especial para rutas de ABM de usuarios - Solo Admin (rol 1)
      if (pathname.startsWith('/dashboard/abm/users')) {
        if (userData.idRole !== 1) {
          // Si es vendor (rol 2) o cualquier otro rol, redirigir al dashboard principal
          const dashboardUrl = new URL('/dashboard', request.url);
          return NextResponse.redirect(dashboardUrl);
        }
      }
      
      // Validar que el usuario tenga rol de admin o vendor (1 o 2) para el resto del dashboard
      if (![1, 2].includes(userData.idRole)) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      const loginUrl = new URL('/login', request.url);
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
    matcher: ['/dashboard/:path*', '/login', '/register', '/']
  };