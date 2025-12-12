# 🛒 MiEcommerce - Aplicación de Comercio Electrónico

Una aplicación moderna de ecommerce desarrollada con Next.js, que ofrece una experiencia completa tanto para clientes como para administradores. Incluye un sistema de autenticación robusto, panel de administración y una interfaz de usuario atractiva y responsive.

## ✨ Características Principales

### 🎯 Para Clientes
- **Landing Page** atractiva con productos destacados
- **Catálogo de productos** completo y navegable
- **Sistema de autenticación** (Registro e Inicio de sesión)
- **Perfil de usuario** personalizable
- **Gestión de pedidos** y historial
- **Páginas informativas** (Sobre Nosotros, Contacto, Ayuda)

### 🔐 Sistema de Autenticación
- Registro de nuevos usuarios con validación
- Inicio de sesión seguro
- Rutas protegidas con middleware
- Gestión de sesiones con cookies
- Control de acceso basado en roles

### 👨‍💼 Panel de Administración
- **Dashboard** con métricas y estadísticas
- **Gestión de Usuarios** (ABM completo)
- **Gestión de Productos** (Catálogo y edición)
- **Control de Stock** (Inventario en tiempo real)
- **Interfaz intuitiva** con sidebar y navegación moderna

## 🚀 Tecnologías Utilizadas

- **[Next.js 16](https://nextjs.org/)** - Framework de React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de estilos utility-first
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first
- **[React Icons](https://react-icons.github.io/react-icons/)** - Iconos populares

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.17 o superior
- **pnpm** (recomendado) o npm/yarn/bun

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ecommerce-app
   ```

2. **Instala las dependencias**
   ```bash
   pnpm install
   # o
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno** (si es necesario)
   ```bash
   # Crea un archivo .env.local con tus configuraciones
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   # o
   yarn dev
   ```

5. **Abre tu navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo en http://localhost:3000

# Producción
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia el servidor de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint para verificar el código
```

## 📁 Estructura del Proyecto

```
ecommerce-app/
├── app/                      # App Router de Next.js
│   ├── (auth)/              # Rutas de autenticación
│   │   ├── Login/
│   │   └── Register/
│   ├── (public)/            # Rutas públicas
│   │   ├── about/
│   │   ├── contact/
│   │   ├── help/
│   │   ├── orders/
│   │   ├── profile/
│   │   └── Landing.tsx
│   ├── dashboard/           # Panel de administración
│   │   ├── abm/            # ABM (Alta, Baja, Modificación)
│   │   │   ├── products/
│   │   │   ├── stock/
│   │   │   └── users/
│   │   └── layout.tsx
│   └── layout.tsx
├── src/
│   ├── actions/            # Server actions
│   ├── components/         # Componentes React
│   │   ├── auth/          # Componentes de autenticación
│   │   ├── dashboard/     # Componentes del dashboard
│   │   ├── features/      # Componentes de características
│   │   ├── forms/         # Formularios
│   │   ├── providers/     # Context providers
│   │   ├── table/         # Componentes de tablas
│   │   └── ui/            # Componentes UI reutilizables
│   ├── data/              # Datos estáticos
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilidades y configuraciones
│   ├── schemas/           # Esquemas de validación (Zod)
│   ├── types/             # Definiciones de tipos TypeScript
│   └── utils/             # Funciones utilitarias
├── public/                # Archivos estáticos
├── middleware.ts          # Middleware de Next.js
└── package.json
```

## 🔑 Funcionalidades Detalladas

### Autenticación y Autorización
- Validación de formularios con Zod
- Middleware para protección de rutas
- Control de acceso basado en roles (Admin/Usuario)
- Gestión de sesiones con cookies seguras

### Panel de Administración
- **Dashboard Principal**: Vista general con métricas y estadísticas
- **Gestión de Usuarios**: Crear, editar, eliminar y listar usuarios
- **Gestión de Productos**: Administrar catálogo completo
- **Control de Stock**: Monitoreo y actualización de inventario
- **Navegación Intuitiva**: Sidebar responsive y breadcrumbs

### Interfaz de Usuario
- Diseño moderno y responsive
- Tema oscuro por defecto
- Componentes reutilizables
- Formularios con validación en tiempo real
- Modales y notificaciones

## 🎨 Diseño

La aplicación utiliza un diseño moderno con:
- **Tema oscuro** como predeterminado
- **Colores principales**: Violeta (#7c3aed) y grises
- **Tipografía**: Geist Sans y Geist Mono
- **Responsive**: Optimizado para móviles, tablets y desktop

## 🔒 Seguridad

- Rutas protegidas con middleware
- Validación de datos en cliente y servidor
- Manejo seguro de tokens de autenticación
- Control de acceso basado en roles

## 🚧 Próximas Mejoras

- [ ] Integración con pasarela de pagos
- [ ] Sistema de carrito de compras
- [ ] Búsqueda y filtros avanzados
- [ ] Sistema de reseñas y calificaciones
- [ ] Notificaciones en tiempo real
- [ ] Integración con servicios de envío

## 📝 Notas de Desarrollo

- El proyecto utiliza el **App Router** de Next.js 16
- Los componentes están organizados por funcionalidad
- Se utiliza TypeScript para mayor seguridad de tipos
- La validación se realiza con Zod para consistencia


