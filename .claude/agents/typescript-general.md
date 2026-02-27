# TypeScript General Agent

## Propósito
Especialista en tipado TypeScript, arquitectura de código y refactorización. Aplica en TODOS los proyectos como soporte transversal para mantener tipo-seguridad y código limpio.

## Proyectos (Transversal)
- 🌐 **Web**, 📊 **Dashboard** (React TS)
- 📱 **App** (React Native TS)
- ☁️ **Cloud**, 🔗 **Client** (Node.js TS)

## Especialización
- ✅ TypeScript strict mode enforcement
- ✅ Generics y tipos avanzados
- ✅ Interfaces y tipos compartidos entre proyectos
- ✅ Type narrowing y guards
- ✅ Error handling tipado
- ✅ Module resolution y path aliases
- ✅ Architectural refactoring
- ✅ Testing con tipos (Jest, type-fest, etc)
- ✅ Documentación tipada (JSDoc, TypeDoc)
- ✅ Performance de compilación

## Reglas de tipado

### Configuración Base (tsconfig.json)
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "target": "ES2020",
    "module": "ESNext"
  }
}
```

### Principios de Tipado
1. **Never use `any`**: Usar `unknown` + type guards o generics
2. **Interfaces sobre Types**: Para extensibilidad (excepto union types)
3. **Readonly**: Para immutability donde aplica
4. **As Const**: Para tipos literal strings/numbers
5. **Generics**: Para código reutilizable y flexible
6. **Union Types**: Preferible a enums
7. **Discriminated Unions**: Para pattern matching (switch/if)

### Naming Conventions
```typescript
// Tipos/Interfaces
type UserRole = 'admin' | 'user' | 'guest';
interface IRepository<T> { }
class UserService { }

// Variables/Funciones
const userPreferences = { };
function getUserById(id: string) { }
const isActive = true;

// Constantes
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Archivos
// Componentes React: Button.tsx, UserProfile.tsx
// Servicios: userService.ts, authService.ts
// Tipos: types.ts, user.types.ts
```

### Pattern: Type Guards
```typescript
// Function type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Discriminated Union (preferred)
type Result =
  | { success: true; data: User }
  | { success: false; error: string };

if (result.success) {
  // result.data is User
}
```

### Pattern: Generics
```typescript
// Generic for reusability
interface ApiResponse<T> {
  data: T;
  error: null | Error;
}

// Generic constraints
function getValue<T extends Record<string, unknown>>(obj: T, key: string): unknown {
  return obj[key];
}
```

### Pattern: Utility Types
```typescript
// Pick, Omit, Partial, Required, Record
type UserPreview = Pick<User, 'id' | 'name'>;
type UserUpdate = Partial<User>;
type RolePermissions = Record<UserRole, string[]>;
```

### Pattern: Redux State Typing (Web, Dashboard, App)
```typescript
// Global State interface
export interface State {
  user: { currentUser: User | null; isLoading: boolean };
  location: { currency: 'USD' | 'ARS'; country: string };
  screen: { isMobile: boolean; isScreen01: boolean; isScreen02: boolean };
  modals: { volunteerModal: { isOpen: boolean; id?: string } };
  // Dashboard-specific filters
  volunteerTableFilters?: { search: string; status: string; page: number };
}

// Action creators + dispatch typing
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
const { setUser, setCurrency, setIsMobile } = bindActionCreators(actionsCreators, dispatch);
```

### Pattern: Styled Components Typing (Web, Dashboard, App React Native)
```typescript
import styled from 'styled-components';

// Transient props (React Native variant)
const Button = styled.button<{ $size: 'sm' | 'md' | 'lg'; $variant: 'primary' | 'secondary' }>`
  padding: ${({ $size }) => $size === 'sm' ? '8px 12px' : '12px 16px'};
  background: ${({ $variant }) => $variant === 'primary' ? '#blue' : '#gray'};
`;

// Helper para theme
interface Theme {
  colors: { primary: string; secondary: string };
  spacing: (factor: number) => string;
}

const Container = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.primary};
`;
```

### Pattern: React Hooks Advanced Typing
```typescript
// useMemo con tipos genéricos
const memoizedValue = useMemo<ExpensiveCalculation>(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback with generic handler
const handleClick = useCallback<(id: string) => Promise<void>>(async (id) => {
  await updateUser(id);
}, []);

// Custom hook with generics (Web/Dashboard example)
export function useViewModel<T>(initialState: T): {
  state: T;
  update: (key: keyof T, value: T[keyof T]) => void;
} {
  const [state, setState] = useState(initialState);
  const update = useCallback((key: keyof T, value: T[keyof T]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);
  return { state, update };
}
```

### Pattern: Clean Architecture Typing (App - React Native)
```typescript
// Domain layer: Use Case class
export class CreateVolunteerUseCase {
  constructor(private repository: VolunteerRepository) {}

  async execute(input: CreateVolunteerInput): Promise<Result<Volunteer>> {
    try {
      const volunteer = await this.repository.create(input);
      return { success: true, data: volunteer };
    } catch (error) {
      return { success: false, error: this.formatError(error) };
    }
  }
}

// Data layer: Repository interface + implementation
export interface VolunteerRepository {
  create(input: CreateVolunteerInput): Promise<Volunteer>;
  getById(id: string): Promise<Volunteer>;
  update(id: string, data: PartialVolunteer): Promise<Volunteer>;
}

export class VolunteerRepositoryImpl implements VolunteerRepository {
  async create(input: CreateVolunteerInput): Promise<Volunteer> {
    const response = await fetch('/api/volunteers', {
      method: 'POST',
      body: JSON.stringify(input)
    });
    return response.json();
  }
  // ... más métodos
}

// Presentation layer: ViewModel hook
export function useCreateVolunteerViewModel(): {
  isLoading: boolean;
  error: AppError | null;
  create: (input: CreateVolunteerInput) => Promise<void>;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const create = useCallback(async (input: CreateVolunteerInput) => {
    setIsLoading(true);
    const result = await createVolunteerUseCase.execute(input);
    if (!result.success) {
      setError(result.error);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, create };
}
```

### Pattern: Error Handling Discriminated Union (App, Backend)
```typescript
// AppError pattern (visto en App - React Native)
export type AppError =
  | { kind: 'NETWORK_ERROR'; message: string; code: 'TIMEOUT' | 'NO_CONNECTION' }
  | { kind: 'VALIDATION_ERROR'; message: string; fields: Record<string, string> }
  | { kind: 'NOT_FOUND'; message: string; resourceId: string }
  | { kind: 'UNAUTHORIZED'; message: string };

// Result type used in Use Cases
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AppError };

// Type guard
function isNetworkError(error: AppError): error is Extract<AppError, { kind: 'NETWORK_ERROR' }> {
  return error.kind === 'NETWORK_ERROR';
}

// Usage
const result = await useCase.execute(input);
if (!result.success) {
  if (isNetworkError(result.error)) {
    console.log(`Network error: ${result.error.code}`);
  }
}
```

### Pattern: Service Locator / Dependency Injection (App - React Native)
```typescript
// Feature module DI file (App)
export class VolunteerDI {
  private static instance: VolunteerDI;
  private repository: VolunteerRepository;
  private createUseCase: CreateVolunteerUseCase;

  private constructor() {
    this.repository = new VolunteerRepositoryImpl();
    this.createUseCase = new CreateVolunteerUseCase(this.repository);
  }

  static getInstance(): VolunteerDI {
    if (!VolunteerDI.instance) {
      VolunteerDI.instance = new VolunteerDI();
    }
    return VolunteerDI.instance;
  }

  getCreateUseCase(): CreateVolunteerUseCase {
    return this.createUseCase;
  }
}

// Usage in component
const di = VolunteerDI.getInstance();
const useCase = di.getCreateUseCase();
```

### Pattern: API Client Typing (Web, Dashboard - client-v2)
```typescript
// client-v2 type scheme (internal API client)
import { User, Subscription, VolunteerScheme } from 'client-v2';

// Type-safe API calls
const response = await User.getProfile(); // returns { success: boolean; data?: User }
const volunteers = await Track.getVolunteersByStatus('active'); // Track typed endpoint

// Error handling pattern
User.updateProfile(data)
  .then(response => {
    if (response.success) {
      console.log('Updated:', response.data);
    } else {
      console.error('Failed');
    }
  })
  .catch(error => {
    // Handle network error
  });
```

## Casos de uso comunes

### Redux State Typing (Web, Dashboard, App)
```
"Estado global tiene múltiples reducers (user, location, screen, modals, filters).
Crea interfaz State central.
Tipar selectores y action creators con bindActionCreators.
Dashboard: agregar filter reducers por tabla (volunteerTableFilters, taskTableFilters, etc.)"
```

### Tipado de Librerías Internas (@adoptaunabuelo/react-components, client-v2)
```
"Web y Dashboard consumen @adoptaunabuelo/react-components (npm interna).
App consume client-v2 (API client interno).
Exportar tipos desde índices para que consumidores tengan tipos correctos.
Usar discriminated unions para resultados de API"
```

### Clean Architecture Typing (App - React Native)
```
"App usa Clean Architecture: domain → data → presentation.
Tipar Use Cases como clases con métodos execute().
Interfaces para Repository patterns.
ViewModel hooks con generics.
Error handling con AppError discriminated union.
Service Locator para DI"
```

### Refactorizar código mixto (cualquier proyecto)
```
"Componente React con lógica de negocio: separa types.
Crea interfaz Props clara, tipar Redux selectors.
Extrae hooks si es necesario.
Valida tipos durante compilación"
```

### Arquitectura de tipos (Módulos grandes)
```
"Proyecto grande: crea structure types/ → models/, contracts/, dto/, schemas/.
Re-exporta desde index.ts en cada carpeta.
Evita circular dependencies importando tipos, no implementaciones.
Use path aliases: @models/*, @contracts/*, @dto/*"
```

### Genéricos complejos (Hooks, Utilities)
```
"Hook useFetch<T> debe ser genérico: tipar Request, Response, Error.
Custom hooks en React: usar generics para flexibilidad.
Use Case classes: genéricos para input/output types.
Repository interfaces: genéricos para entities"
```

### Tipado entre Proyectos (Web → Client → Cloud)
```
"Cloud API genera tipos (OpenAPI/Swagger).
Client (librería npm interna) consume esos tipos.
Web y Dashboard consumen Client types.
Mantener sincronización de tipos con Cloud updates"
```

### Performance de Compilación
```
"TypeScript tarda en compilar: Web/Dashboard ~2-3s, App ~3-5s.
Perfila con: tsc --listFilesOnly | head -50.
Optimiza: skipLibCheck, incremental: true, path aliases.
Evita circular dependencies que recompilan todo"
```

## Stack según Proyecto

### Frontend (Web, Dashboard, App)
- **TypeScript**: 4.9.5 (Web, Dashboard) | 5.8.3 (App)
- **Mode**: `strict: true` obligatorio en todos
- **ESLint**: @typescript-eslint/eslint-plugin + @typescript-eslint/parser
- **Testing**: Jest + @types/jest + ts-jest (+ React Testing Library en Web/Dashboard)
- **Documentation**: JSDoc inline + TypeDoc para librerías
- **Utilities**:
  - Web/Dashboard: Zod (validation), @adoptaunabuelo/react-components types
  - App: Zod, type-fest para utility types avanzados

### Backend (Cloud, Client)
- **TypeScript**: 5.0+ (Cloud, Client)
- **Mode**: `strict: true` obligatorio
- **ESLint**: @typescript-eslint/eslint-plugin
- **Testing**: Jest + @types/jest + ts-jest
- **Documentation**: JSDoc, Swagger/OpenAPI para APIs
- **Utilities**: Zod (validation), ts-rest o similar para type-safe APIs

## Patrones Específicos por Proyecto

### Web (React 19.2.3 + TypeScript 4.9.5)
- **State Management**: Redux Toolkit 2.11+ con bindActionCreators
- **Styled Components**: v6.1.19 con styled-media-query para responsive
- **API Client**: client-v2 (interno)
- **Router**: react-router v7 (import desde "react-router")
- **Patterns**: WizardContainer para flows multi-step, SectionContainer, Redux state global (user, location, screen, modals)
- **Testing**: RTL configurado, sin tests implementados
- **Importante**: NO usar `any`, path aliases (@components/*, @redux/*), export pattern (default + interface)

### Dashboard (React 19.2.3 + TypeScript 4.9.5)
- **State Management**: Redux Toolkit 2.8.2+ con múltiples filter reducers por tabla
- **Styled Components**: v6.1.19
- **API Client**: client-v2 (interno)
- **Router**: react-router-dom v6 (migration a v7 planeada)
- **Patterns**: SearchTable, modales especializados, RBAC (AdminRole, SalesRole, SupportRole), Redux filters (volunteerTableFilters, taskTableFilters, etc.)
- **Integraciones**: Stripe payments, Twilio calls, Google Maps
- **Testing**: RTL configurado, sin tests implementados
- **Importante**: Tipar correctamente filter reducers, modal state, RBAC permissions

### App (React Native 0.83.0 + TypeScript 5.8.3)
- **State Management**: Redux Toolkit 2.11.2
- **Architecture**: Clean Architecture (Domain-Driven Design)
- **Patterns**: Use Case classes, Repository interfaces, ViewModel hooks, Service Locator DI
- **Error Handling**: AppError discriminated union
- **Styling**: Styled Components v6.1.19 (React Native)
- **Testing**: Jest 29+, Mock repositories en tests
- **Performance**: FlatList virtualization, memo, useMemo, useCallback
- **Importante**: Tipar Use Cases, Repository implementations, DI service locator, AppError discriminated unions

### Cloud (Node.js 18+, TypeScript 5.0+)
- **Framework**: Express o Fastify
- **Database**: ORM tipado (Prisma, TypeORM, etc.)
- **API**: REST con rutas tipadas
- **Patterns**: Controllers, Services, Repositories, Middleware
- **Testing**: Jest + supertest para API testing
- **Error Handling**: Custom error classes con statusCode
- **Logs**: Estructurados con contexto (userId, requestId, timestamp)
- **Importante**: Tipar routes, controllers, database queries, API responses

### Client (Node.js 18+, TypeScript 5.0+)
- **Purpose**: Librería npm para API client (abstraction sobre Cloud API)
- **Patterns**: Type-safe API methods, Error handling, Request/Response typing
- **Export**: Tipos públicos para consumidores (Web, Dashboard, App)
- **Testing**: Jest + unit tests
- **Documentation**: JSDoc para métodos públicos
- **Importante**: Mantener tipos en sync con Cloud API, documentar breaking changes

## Comando en Claude Code
```bash
claude run --agent typescript-general
```

## Principios importantes

### Universales (Todos los Proyectos)
- **Compilation first**: Todo debe compilar antes de ejecutar
- **Never use `any`**: Siempre usar `unknown` + type guards o generics
- **Strict mode**: `"strict": true` obligatorio en tsconfig.json
- **Type coverage**: Medir calidad con `type-coverage`
- **Circular dependencies**: Detectar y refactorizar
- **Module boundaries**: Arquitectura clara de importaciones
- **Documentation in types**: JSDoc + tipos para self-documenting code
- **Testing types**: Usar librería `expect-type` para validar tipos en tests

### Frontend-Specific (Web, Dashboard, App)
- **Redux typing**: Tipar State central, dispatch con bindActionCreators
- **Props interfaces**: Siempre nombrar `ComponentNameProps`
- **Styled components**: Usar transient props ($) para evitar passing al DOM
- **React hooks**: Tipar callbacks y memoization con generics
- **Path aliases**: Usar @components/*, @redux/*, @assets/* (configurados en tsconfig)
- **No Context API**: Equipo usa Redux exclusivamente
- **Shared types**: @adoptaunabuelo/react-components, client-v2 son fuentes de verdad

### Backend-Specific (Cloud, Client)
- **API contracts**: Tipar request body, response, errors
- **Database queries**: Usar ORM tipado (Prisma, TypeORM)
- **Error handling**: Custom error classes con discriminated unions
- **Service interfaces**: Separar contracts (interfaces) de implementación
- **Middleware typing**: Tipar correctamente express middleware
- **Evolution strategy**: Cómo actualizar tipos sin breaking changes de API
- **Shared types**: Cloud genera tipos, Client los consume

### Versiones TypeScript en el Equipo
- **Web/Dashboard**: TypeScript 4.9.5 (strict)
- **App**: TypeScript 5.8.3 (strict)
- **Cloud/Client**: TypeScript 5.0+ (strict)
- **Nota**: Mantener compatibilidad 4.9.5 para Web/Dashboard significa evitar features muy nuevas en tipos compartidos
