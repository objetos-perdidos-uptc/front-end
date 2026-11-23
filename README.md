# Objetos perdidos y encontrados — Frontend (MVP)

React 18 + Vite + TypeScript (strict) + React Router v6 + TanStack Query v5 + Zustand + React Hook Form + Zod + Axios + Tailwind CSS.

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- Backend corriendo con el API Gateway en `http://localhost:8080`

## Instalación y arranque

```bash
cp .env.example .env     # VITE_API_URL=/api (usa el proxy de Vite)
npm install
npm run dev              # http://localhost:5173
```

Otros comandos:

```bash
npm run build            # typecheck + build de producción
npm run preview          # sirve el build
npm run typecheck        # solo tsc --noEmit
```

## Credenciales de prueba

| Email              | Contraseña |
| ------------------ | ---------- |
| `ana@uptc.edu.co`  | `secret123` |

## Cómo se conecta al backend

- En dev, el frontend llama a `/api/*` y Vite lo reenvía a `http://localhost:8080/*` quitando el prefijo `/api` (ver `vite.config.ts`). Así no hay problemas de CORS.
- Si `VITE_API_URL` no está definida, el cliente usa `http://localhost:8080` directamente (requiere CORS habilitado en el gateway).
- Para un build de producción, define `VITE_API_URL` con la URL pública del gateway.
- Solo se habla con el API Gateway; nunca con los servicios directos.

## Estructura

```
src/
  app/            # bootstrap: router, providers, layouts, dashboard, 404
  shared/         # api (axios + hooks), components, hooks, utils, types
  features/
    auth/         # api, components, hooks, pages, schemas, store, types
    reports/      # api, components, hooks, pages, schemas, types
    claims/       # api, components, hooks, pages, schemas, types
```

Reglas:

- Cada feature es autocontenida. Si dos features comparten algo, se sube a `shared/`.
- No hay imports entre features. Solo `app/` (que compone) puede importar de varias.
- `shared/` nunca importa de `features/`. El cliente axios recibe `getToken` y `onUnauthorized` desde `app/configureApi.ts`.

## Manejo de sesión

- `authStore` (Zustand + `persist`) guarda `token` y `user` en `localStorage` (clave `lost-found-auth`).
- `<ProtectedRoute>` redirige a `/login` si no hay token.
- Ante un `401` en cualquier endpoint que no sea `/auth/*`, el interceptor limpia el store, muestra el toast "Sesión expirada" y navega a `/login`.
- Todos los errores del backend se normalizan a `{ message, code, status }`.

## Supuestos sobre el backend

- Los campos de `POST /auth/register` son `name`, `email`, `password`, `campusId`, `universityId`.
- Los IDs (`categoryId`, `campusId`, `universityId`, `reportId`) se envían como texto. Si tu backend los espera numéricos, ajusta los schemas en `features/*/schemas`.
- `date` de un reporte se envía como `YYYY-MM-DD`.
- Los listados pueden venir como array o paginados (`content` / `items` / `data` / `results`); ambos se aceptan.
- Hay funciones de API para `GET /reports/feed` y `GET /claims/:id` (`getFeed`, `getClaim`), pero aún no tienen página.
