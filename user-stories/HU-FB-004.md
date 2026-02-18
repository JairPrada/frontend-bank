# HU-FB-004: Flujo de solicitud de producto

## Descripcion

**Como** usuario  
**Quiero** completar el flujo de solicitud de producto  
**Para** obtener un producto bancario (ahorro, credito o prestamo)

## Criterios de Aceptacion

| # | Criterio | Validacion |
|---|----------|------------|
| 1 | Inicia con formulario de cedula y aceptacion de datos | `/inicio-solicitud` |
| 2 | Valida codigo OTP de 6 digitos | `/validacion-otp` |
| 3 | Permite seleccionar tipo de producto | `/seleccion-producto` |
| 4 | Muestra resumen antes de confirmar | `/resumen-solicitud` |
| 5 | El estado persiste entre paginas | Zustand + sessionStorage |

## Datos Tecnicos

**Rutas del flujo:**
1. `/inicio-solicitud`
2. `/validacion-otp`
3. `/creacion-usuario`
4. `/seleccion-producto`
5. `/resumen-solicitud`

**Store:**
```typescript
interface ApplicationFormState {
  documentNumber: string;
  acceptsDataTreatment: boolean;
}

interface ProductSelectionState {
  selectedProductId: string | null;
}
```

## Diagrama de Flujo

```mermaid
flowchart TD
    A[/inicio-solicitud/] --> B[Ingresa cedula]
    B --> C[Acepta tratamiento datos]
    C --> D[POST /applications]
    D --> E[/validacion-otp/]
    E --> F[Ingresa OTP]
    F --> G{OTP valido?}
    G -->|No| H[Reenviar OTP]
    H --> F
    G -->|Si| I[/creacion-usuario/]
    I --> J[/seleccion-producto/]
    J --> K[Selecciona producto]
    K --> L[/resumen-solicitud/]
    L --> M[Confirmar]
    M --> N[POST /product]
    N --> O[/productos/]
```

## Archivos Relacionados

- `src/app/(features)/inicio-solicitud/`
- `src/app/(features)/validacion-otp/`
- `src/app/(features)/seleccion-producto/`
- `src/app/(features)/resumen-solicitud/`
