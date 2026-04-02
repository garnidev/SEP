# SEP Local — Sistema Especializado de Proyectos

Plataforma empresarial de gestión de proyectos para el GGPC — SENA y la DSNFT, construida sobre un stack moderno y escalable.

## Stack tecnológico

| Capa         | Tecnología                          | Versión  |
|--------------|-------------------------------------|----------|
| Frontend     | Next.js (App Router) + TypeScript   | 15.x     |
| Estilos/UI   | Tailwind CSS + ShadCN/ui            | 3.4.x    |
| Estado       | Zustand + TanStack Query            | 5.x      |
| Backend      | NestJS + TypeORM                    | 11.x     |
| Base de datos| Oracle Database 19c / XE            | —        |
| Proxy        | Nginx                               | stable-alpine |
| Runtime      | Node.js                             | 22 LTS   |
| Contenedores | Docker + Compose                    | —        |
| Gestor pkgs  | pnpm (workspaces)                   | latest   |

## Arquitectura

```
Usuario → Nginx (:8080) → Next.js (:3000) → NestJS (:4000) → Oracle
```

## Estructura del monorepo

```
SEPLocal/
├── frontend/          # Next.js App Router
│   └── src/
│       ├── app/       # Páginas y layouts (App Router)
│       ├── components/
│       │   ├── layout/  # AppSidebar
│       │   └── ui/      # Button, Card, Badge, StatCard (ShadCN-style)
│       ├── lib/         # utils.ts, api.ts (axios)
│       └── types/       # Tipos globales TypeScript
├── backend/           # NestJS API REST
│   └── src/
│       └── ...        # Módulos por dominio
├── docker/
│   └── nginx/
│       └── default.conf
└── docker-compose.yml
```

## Levantar entorno

```bash
# Copiar variables de entorno
cp .env.example .env   # completar credenciales Oracle

# Levantar todos los servicios
docker compose up -d --build
```

La app queda disponible en `http://localhost:8080`

| Servicio        | URL local                        |
|-----------------|----------------------------------|
| Frontend        | http://localhost:8080            |
| API docs (Swagger) | http://localhost:8080/api/docs |
| Backend directo | http://localhost:4000/docs       |

## Desarrollo local

```bash
# Instalar dependencias
pnpm install

# Frontend (Next.js dev server con Turbopack)
pnpm dev:frontend   # → http://localhost:3000

# Backend (NestJS watch mode)
pnpm dev:backend    # → http://localhost:4000
```

## Variables de entorno requeridas

```env
ORACLE_USER=
ORACLE_PASSWORD=
ORACLE_CONNECT_STRING=
BACKEND_PORT=4000
NODE_ENV=development
```
