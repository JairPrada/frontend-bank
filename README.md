# Frontend Bank

Aplicacion web para el sistema bancario digital construida con Next.js y React.

## Informacion del Proyecto

| Propiedad | Valor |
|-----------|-------|
| Nombre | frontend-bank |
| Puerto | 3000 |
| Framework | Next.js 16 |
| UI Library | React 19 |
| Estado Global | Zustand |

## Documentacion Tecnica

Para documentacion detallada sobre componentes, rutas, estado global y arquitectura, consultar el archivo [DOCS.md](./DOCS.md).

## Requisitos Previos

- Node.js 20.x o superior
- npm 10.x o superior
- Los servicios backend deben estar corriendo (Product Service y API Gateway)

## Configuracion

Este proyecto no requiere archivo `.env` para desarrollo local. La configuracion por defecto apunta a `http://localhost:5000` (API Gateway).

Si se necesita cambiar la URL del API Gateway, crear un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Instalacion

```bash
npm install
```

## Ejecucion

### Orden de ejecucion de servicios

Este frontend debe ejecutarse DESPUES de los servicios backend:

1. **Primero:** Microservicio Product (puerto 4000)
2. **Segundo:** API Gateway (puerto 5000)
3. **Tercero:** Frontend Bank (este proyecto - puerto 3000)

### Verificar que los servicios backend estan corriendo

Antes de iniciar el frontend, verificar:

```bash
# Verificar Product Service
curl http://localhost:4000/health

# Verificar API Gateway
curl http://localhost:5000/health
```

### Comandos

```bash
# Modo desarrollo
npm run dev

# Modo produccion
npm run build
npm run start
```

La aplicacion estara disponible en `http://localhost:3000`.

## Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage
```

## Scripts Disponibles

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Inicia en modo desarrollo con hot reload |
| `npm run build` | Compila el proyecto para produccion |
| `npm run start` | Inicia el servidor de produccion |
| `npm run test` | Ejecuta tests unitarios |
| `npm run test:coverage` | Ejecuta tests con reporte de coverage |
| `npm run lint` | Ejecuta el linter |

## Rutas de la Aplicacion

| Ruta | Descripcion |
|------|-------------|
| `/` | Landing page |
| `/inicio-sesion` | Login de usuarios |
| `/creacion-usuario` | Registro de usuarios |
| `/inicio-solicitud` | Iniciar solicitud de producto |
| `/validacion-otp` | Validacion de codigo OTP |
| `/seleccion-producto` | Seleccion de producto bancario |
| `/resumen-solicitud` | Resumen de la solicitud |
| `/productos` | Dashboard de productos del usuario |

## Estructura del Proyecto

```
frontend-bank/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── (features)/
│   │       ├── (landing)/
│   │       ├── inicio-sesion/
│   │       ├── creacion-usuario/
│   │       ├── inicio-solicitud/
│   │       ├── validacion-otp/
│   │       ├── seleccion-producto/
│   │       ├── resumen-solicitud/
│   │       └── productos/
│   ├── config/
│   │   ├── axios.instance.ts
│   │   └── endpoints.ts
│   ├── routes/
│   └── shared/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       └── utils/
└── public/
```

## Flujo de Ejecucion Completo

Para ejecutar todo el sistema localmente:

```bash
# Terminal 1 - Product Service
cd product
npm install
npm run start:dev

# Terminal 2 - API Gateway
cd api-gateway
npm install
npm run start:dev

# Terminal 3 - Frontend
cd frontend-bank
npm install
npm run dev
```

Luego abrir el navegador en `http://localhost:3000`.
