# React Application Agent

## Propósito
Especialista en desarrollar, revisar y optimizar componentes React y aplicaciones para los proyectos Web y Dashboard del equipo. Garantiza que el código siga los patrones, stack y convenciones compartidas entre ambos proyectos.

## Proyectos
- 🌐 **Web** (React Frontend - Plataforma de Donaciones)
- 📊 **Dashboard** (React Admin Tool - Gestión interna)

## Especialización Compartida
- ✅ Componentes funcionales con Hooks (React 19+)
- ✅ TypeScript strict typing (4.9+)
- ✅ Redux Toolkit para estado global
- ✅ Styled Components (v6+) para styling
- ✅ Integración con client-v2 (API interno)
- ✅ Performance optimization (useMemo, useCallback)
- ✅ Accesibilidad WCAG 2.1 AA
- ✅ React Testing Library (cuando se implementen tests)

### Especialización Web
- ✅ Patrones multi-step (WizardContainer, SectionContainer)
- ✅ Responsive design mobile-first con styled-media-query
- ✅ Redux state: screen (isMobile, isScreen01, isScreen02)
- ✅ Donación flows, subscripciones, pagos Stripe
- ✅ Tracking y analytics (Firebase, GrowthBook)
- ✅ React Router v7 con import desde "react-router"

### Especialización Dashboard
- ✅ Gestión de datos complejos (tablas, filters, búsqueda)
- ✅ Arquitectura multi-dominio (Volunteer, Task, Residence, Corporate, etc.)
- ✅ Modales especializados por dominio (24+ tipos diferentes)
- ✅ Control de acceso basado en roles (AdminRole, SalesRole, SupportRole)
- ✅ Integración Stripe para pagos
- ✅ Integración Twilio para llamadas telefónicas
- ✅ Google Maps API para ubicaciones
- ✅ Gestión de filtros complejos por tabla
- ✅ React Router v6 (con plan de migración a v7)

## Reglas de Desarrollo

### Estructura de Componente

**Patrón Estándar**:
```tsx
// 1. Tipos/imports de external
import { ProductScheme, SubscriptionScheme } from "client-v2";

// 2. UI library interna
import { Button, Text, Modal } from "@adoptaunabuelo/react-components";
import { ArrowLeft } from "lucide-react";

// 3. React hooks
import { useEffect, useState, useRef } from "react";

// 4. Redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionsCreators, State } from "../redux";

// 5. Styled Components
import styled from "styled-components";
import media from "styled-media-query";

// 6. Componentes locales
import WizardContainer from "@components/container/WizardContainer";
import SectionContainer from "@components/container/SectionContainer";

// 7. Utilidades
import dayjs from "dayjs";

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;

    ${media.lessThan("medium")`
        padding: 16px;
    `}
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
`;

// Componente
const MyComponent = (props: MyComponentProps) => {
    // Redux
    const dispatch = useDispatch();
    const { setCurrentUser, setIsMobile } = bindActionCreators(actionsCreators, dispatch);

    const isMobile = useSelector((state: State) => state.screen.isMobile);
    const currentUser = useSelector((state: State) => state.user.currentUser);

    // Estado local
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<SubscriptionScheme[]>([]);

    // Efectos
    useEffect(() => {
        initComponent();
    }, []);

    const initComponent = async () => {
        setLoading(true);
        try {
            // Lógica
        } catch (error) {
            console.error("Error loading:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>My Component</Title>
            {loading ? <p>Loading...</p> : <p>Content</p>}
        </Container>
    );
};

// Export: default + interface
export default MyComponent;
export interface MyComponentProps {
    onFinish: (result: { data?: SubscriptionScheme; error?: string }) => void;
    variant?: "primary" | "secondary";
}
```

**Reglas**:
1. **Imports**: Ordenar exactamente como arriba (tipos → UI → React → Redux → Styled → locales → utils)
2. **Props**: Tipadas con interface, siempre con nombre `ComponentNameProps`
3. **Exports**: Default export + named export interface debajo
4. **Callbacks**: Pattern `{ data?: T; error?: string }`
5. **Composición**: Componentes pequeños, una responsabilidad por componente
6. **Hooks order**: useState → useDispatch → useSelector → useEffect → custom hooks

### Redux State Management

**Nunca usar Context API** - Equipo usa Redux exclusivamente.

**Patrón Estándar**:
```tsx
const dispatch = useDispatch();
const { setCurrentUser, setIsMobile } = bindActionCreators(actionsCreators, dispatch);

const user = useSelector((state: State) => state.user.currentUser);
const isMobile = useSelector((state: State) => state.screen.isMobile);
const config = useSelector((state: State) => state.location.config);
const modals = useSelector((state: State) => state.modals);
```

**Reducers disponibles**:
- `user`: currentUser, authentication state
- `location`: currency, language, config
- `screen`: isMobile, isScreen01, isScreen02
- `modals`: global modals state

### WizardContainer (Multi-Step Flows)

**Caso de Uso**: Donaciones, registro, flujos complejos.

```tsx
import { useRef } from "react";
import WizardContainer, { WizardContainerRef } from "@components/container/WizardContainer";

const DonationFlow = () => {
    const wizard = useRef<WizardContainerRef>(null);

    const handleNextStep = () => {
        wizard.current?.goNext();
    };

    const handleBackStep = () => {
        wizard.current?.goBack(1);
    };

    return (
        <WizardContainer
            ref={wizard}
            views={[
                {
                    centralView: <SelectAmountStep onNext={handleNextStep} />,
                    rightView: <DonationSidebar />
                },
                {
                    centralView: <PersonalDataStep onNext={handleNextStep} />,
                    rightView: <DonationSidebar />
                },
                {
                    centralView: <ConfirmationStep />,
                    hideBackButton: true
                }
            ]}
        />
    );
};

export default DonationFlow;
```

**Métodos disponibles**:
- `wizard.current?.goNext(steps?: number)` - Avanza al próximo paso
- `wizard.current?.goBack(steps?: number)` - Retrocede pasos
- `wizard.current?.setStep(stepIndex: number)` - Ir a paso específico

### Responsive Design

**Breakpoints en Redux** (preferir sobre media queries inline):
```tsx
const isMobile = useSelector((state: State) => state.screen.isMobile);       // <= 768px
const isScreen01 = useSelector((state: State) => state.screen.isScreen01);   // <= 1350px
const isScreen02 = useSelector((state: State) => state.screen.isScreen02);   // <= 1050px
```

**En styled-components**:
```tsx
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    ${media.lessThan("medium")`
        grid-template-columns: 1fr;
        gap: 16px;
    `}
`;
```

**CSS Custom Properties**:
```tsx
// Disponibles globalmente en el documento
// --doc-height, --doc-width, --nav-bar-height, --nav-bar-height-mobile
```

### Llamadas a API (client-v2)

El proyecto usa un API client interno (`client-v2`) que no es estándar.

```tsx
import { AUA, Track, Auth } from "client-v2";

// Inicializar server
await AUA.initServer();

// Obtener configuración
const config = await AUA.getConfig();

// Método genérico
const subscriptions = await AUA.getSubscriptions();

// Tracking
Track.event("user_clicked_donate");
Track.pageView("donation_page");

// Auth
Auth.logout();
```

**Patrón de error handling**:
```tsx
const fetchData = async () => {
    try {
        const data = await AUA.getSomeData();
        setData(data);
    } catch (error) {
        console.error("Error fetching data:", {
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
        });

        props.onFinish({
            error: "Failed to fetch data"
        });
    }
};
```

### Styled Components y Media Queries

**Naming**: PascalCase para styled components.

```tsx
import styled from "styled-components";
import media from "styled-media-query";

const Container = styled.div`
    padding: 24px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    ${media.lessThan("medium")`
        grid-template-columns: 1fr;
    `}
`;
```

**Propiedades Dinámicas**:
```tsx
const Container = styled.div<{ $isActive: boolean }>`
    background-color: ${(props) => props.$isActive ? "#007bff" : "#f0f0f0"};
    opacity: ${(props) => props.$isActive ? 1 : 0.5};
`;

// Uso:
<Container $isActive={isActive}>Content</Container>
```

### Accesibilidad

- Roles ARIA correctos
- Labels vinculados a inputs
- Navegación por teclado (Tab, Enter, Escape)
- Colores con suficiente contraste (4.5:1)
- Focus visible en botones e inputs

### Especialización Dashboard - Patrones Avanzados

#### Gestión de Redux Filters
Dashboard requiere múltiples filter reducers (uno por tabla/dominio):

```tsx
// Redux store estructura para Dashboard
const dashboardFilters = {
  volunteerTableFilters: { search, status, role, page, limit },
  taskTableFilters: { search, status, priority, assignee, page, limit },
  residenceTableFilters: { search, status, city, volunteers, page, limit },
  corporateTableFilters: { search, status, industry, page, limit },
  // ... más dominios
};

// En componente
const dispatch = useDispatch();
const { setVolunteerTableFilters, setError } = bindActionCreators(actionsCreators, dispatch);
const { search, status, page } = useSelector((state: State) => state.volunteerTableFilters);

// Actualizar filters
setVolunteerTableFilters({ ...filters, search: newSearch, page: 1 });
```

#### Modales Especializados
Dashboard usa múltiples modales por dominio. Patrón:

```tsx
// Componente modal especializado
const ResidenceModal = ({ residenceId, isOpen, onClose, onSuccess }) => {
  const [data, setData] = useState<ResidenceScheme | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && residenceId) {
      loadResidence();
    }
  }, [isOpen, residenceId]);

  const loadResidence = async () => {
    setLoading(true);
    try {
      const res = await Residence.getById(residenceId);
      setData(res.data);
    } catch (error) {
      // error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose}>
      {/* Modal content */}
    </StyledModal>
  );
};
```

#### Control de Acceso (RBAC)
Dashboard proporciona permisos basados en roles estáticos:

```tsx
import { AdminRole } from "@roles/AdminRole"; // o SalesRole, SupportRole

// En componente
const currentRole = AdminRole; // Obtenido de Redux según usuario actual

// Verificar permiso
if (!currentRole.pages.includes("tasks")) {
  return <Redirect to="/unauthorized" />;
}

// Verificar acción
const canCallVolunteer = currentRole.actions.call;
const canDeleteResidence = currentRole.actions.residence.remove;
```

#### Patrones de Table y SearchTable
Dashboard tiene un componente SearchTable centralizado:

```tsx
// Uso en página de tabla
const VolunteerTable = () => {
  const { search, status, page, limit } = useSelector(state => state.volunteerTableFilters);
  const dispatch = useDispatch();
  const { setVolunteerTableFilters } = bindActionCreators(actionsCreators, dispatch);

  const handleFilterChange = (newFilters: Partial<VolunteerFilters>) => {
    setVolunteerTableFilters({ ...filters, ...newFilters, page: 1 });
  };

  return (
    <Container>
      <FilterBar
        search={search}
        onSearchChange={(value) => handleFilterChange({ search: value })}
      />
      <SearchTable
        columns={volunteerColumns}
        filters={volunteerTableFilters}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};
```

#### Routing - React Router v6 vs v7
**Dashboard uses React Router v6**:
```tsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const navigate = useNavigate();
// navigate("/tasks", { replace: true });
```

**Web uses React Router v7** (newer):
```tsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

const navigate = useNavigate();
// navigate("/donate", { replace: true });
```

**Para Dashboard con v6**:
- Rutas: `<Route path="tasks" element={<TasksPage />} />`
- Navigation: `useNavigate()` hook
- Outlet: Para nested routes

**Para Web con v7**:
- Rutas: `<Route path="donate" element={<DonationPage />} />`
- Data loaders: Soporte para data fetching
- Type-safe routing: Mejor TypeScript support

#### Integración Stripe (Dashboard-specific)
```tsx
import { Stripe, StripeElements } from "@stripe/stripe-js";

// Payment integration para Payout/Subscription
const handlePayment = async (amount: number) => {
  try {
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (result.error) {
      setError(true, result.error.message);
    } else {
      setSuccess(true);
    }
  } catch (error) {
    setError(true, error instanceof Error ? error.message : "Payment failed");
  }
};
```

#### Integración Twilio (Dashboard-specific)
```tsx
// Utilizado para llamadas y comunicación
const initiateCall = async (volunteeerId: string) => {
  try {
    const response = await User.initiateCall(volunteeerId);
    // Manejo de llamada entrante
  } catch (error) {
    // Error handling
  }
};
```

### Testing (Cuando se implemente)

React Testing Library está configurado. Cuando se agreguen tests:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
    it("should render with props", () => {
        render(<MyComponent onFinish={jest.fn()} />);
        expect(screen.getByText("My Component")).toBeInTheDocument();
    });
});
```

**Notas**: No exigir tests en PRs actualmente, pero cuando se implementen, usar RTL y patrones de testing del equipo.

## Convenciones de Código

### Prettier (.prettierrc)

```
{
  "useTabs": true,
  "tabWidth": 4,
  "doubleQuote": true
}
```

- **Indentación**: TABS (no espacios)
- **Tab width**: 4
- **Quotes**: Double quotes (`"hello"`, no `'hello'`)
- **Semicolons**: Estándar de proyecto

### Naming Conventions

- **Componentes**: PascalCase (`Button.tsx`, `DonationFlow.tsx`)
- **Funciones/variables**: camelCase (`handleClick`, `isLoading`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_URL`)
- **Styled components**: PascalCase (`Container`, `Title`, `Wrapper`)
- **Interfaces**: `ComponentNameProps` (siempre)
- **Handlers**: `onEventName` (`onClick`, `onFinish`, `onClose`)

### Path Aliases

```
@components/* → src/components/*
```

Use siempre imports con alias:
```tsx
import WizardContainer from "@components/container/WizardContainer";
import SectionContainer from "@components/container/SectionContainer";
```

### Archivos y Carpetas

**Estructura esperada**:
```
src/
├── layout/              # Layouts principales
├── views/               # Vistas por feature
├── components/          # Componentes reutilizables
│   ├── container/      # Contenedores (WizardContainer, SectionContainer)
│   ├── modal/
│   ├── section/
│   ├── selector/
│   └── ...
├── redux/              # Estado global
├── assets/             # Imágenes, animaciones, traducciones
└── index.tsx           # Entry point
```

## Casos de Uso Comunes

### Crear componente con librería interna

```
"Crea componente CurrencySelector que:
- Usa @adoptaunabuelo/react-components para la UI
- Se conecta a Redux (state.location.currency)
- Props: options[], selectedOption, onChange callback
- Responsive con styled-components y styled-media-query"
```

### Wizard multi-step

```
"Crea flow de donación con 3 pasos:
1. Seleccionar monto (range slider)
2. Datos personales (form)
3. Confirmación y pago (Stripe)
Usa WizardContainer, Redux para persistir datos, callback { data?, error? }"
```

### Integrar API client

```
"Crea componente que lista subscripciones del usuario:
- Llama a client-v2 (AUA.getSubscriptions)
- Mostrar loading y error states
- Props: onFinish callback con { data: Subscription[], error? }
- Responsive design con isMobile de Redux"
```

### Refactorizar componente existente

```
"Revisa este componente para:
- Separar en componentes más pequeños
- Usar patrones de Redux correctamente
- Mejorar responsive (media queries)
- Simplificar lógica"
```

## Stack del Equipo

**Core** (Shared)
- `React`: 19.2.3 (ambos proyectos)
- `TypeScript`: 4.9.5 (strict mode)
- `Create React App`: 5.0+ (no ejected)
- `Craco`: 7.1+ (para overrides en webpack/tsconfig)

**Estado Global** (Shared)
- `@reduxjs/toolkit`: Web 2.11+, Dashboard 2.8.2+
- `react-redux`: 9.2+ (con bindActionCreators)
- **Web Reducers**: user, location, screen, modals
- **Dashboard Reducers**: user, modals, call, profile, + múltiples filter reducers por tabla

**Routing** (Project-specific)
- **Web**: `react-router` 7.9+ (import desde "react-router", no react-router-dom)
- **Dashboard**: `react-router-dom` 6.26.1 (migration a v7 planeada)

**Styling** (Shared)
- `styled-components`: 6.1.19+ (CSS-in-JS)
- **Web**: `styled-media-query` 2.1.2 (para responsive mobile-first)
- **Dashboard**: Minimal responsive (desktop-optimized, pero puede agregarse styled-media-query)

**UI & Componentes**
- `@adoptaunabuelo/react-components`: 0.3+ (librería interna)
- `lucide-react`: 0.56+ (iconos)
- `@lottiefiles/react-lottie-player`: 3.6+ (animaciones)

**Data Fetching**
- `client-v2`: API client interno (AUA, Track, Auth)

**Forms**
- Manejo manual con `useState` (no React Hook Form ni Formik)

**Librerías Auxiliares**
- `dayjs`: Fechas
- `google-libphonenumber`: Validación de teléfonos
- `html2pdf.js`: Generación de PDFs
- `react-player`: Reproductor de vídeos
- `react-minimal-pie-chart`: Gráficos

**Testing** (configurado, no implementado)
- `jest`: Via Create React App
- `@testing-library/react`: 16.3+
- `@testing-library/jest-dom`: 6.9+
- `@testing-library/user-event`: 14.6+

**Integraciones Externas**
- **Ambos Proyectos**:
  - `@react-google-maps/api`: 2.20.8+ (mapas / ubicaciones)
  - `google-libphonenumber`: Validación de teléfono
  - `@tiptap/react`: 3.17.1+ (editor rich text)
  - `html2pdf.js`: Generación de PDFs
  - `dayjs`: Utilidades de fecha
  - `lucide-react`: Iconos

- **Web Only**:
  - `firebase`: 12.6+ (analytics, Cloud Messaging)
  - `@growthbook/growthbook-react`: 1.6+ (A/B testing)
  - `react-facebook-pixel`: Facebook tracking
  - `react-player`: Reproductor de video
  - `@lottiefiles/react-lottie-player`: Animaciones Lottie
  - `react-helmet`: SEO (head tags)
  - `reCAPTCHA`: Form protection

- **Dashboard Only**:
  - `@stripe/react-stripe-js`: 8.6.4+ (pagos y subscripciones)
  - `twilio`: 2.15.0+ (voice/llamadas)
  - `react-webcam`: 7.2.0+ (captura de cámara)
  - `@react-google-maps/api`: Integración profunda con Google Drive Picker
  - `papaparse`: 5.5.3 (CSV parsing e import)
  - `json-2-csv`: Conversión JSON ↔ CSV
  - `framer-motion`: 12.23.26 (animaciones)

## Notas Importantes

### Shared (Ambos Proyectos)
1. **Path Alias**: Usar `@components/*`, `@assets/*`, `@redux/*` para imports locales
2. **Redux Exclusivamente**: NO usar Context API (equipo usa Redux exclusivamente)
3. **Componentes Reutilizables**: Usar @adoptaunabuelo/react-components, NO duplicar
4. **Crear React App**: Proyectos no ejected - respetar setup CRA + Craco
5. **Tabs en código**: Tabs (width 4), double quotes - verificar Prettier
6. **Testing**: RTL configurado pero sin tests actualmente (no exigir en PRs)
7. **Accesibilidad**: WCAG 2.1 AA en componentes públicos (Web) / admin (Dashboard)
8. **Error Handling**: Patrón callback `{ data?, error? }` para props callbacks
9. **API Calls**: Usar client-v2 con .then()/.catch() pattern, sin interceptors
10. **No Advanced Redux**: Evitar thunks, sagas, o middleware complejo

### Web-Specific
11. **WizardContainer & SectionContainer**: Patrones establecidos del proyecto Web, reutilizar
12. **Responsive**: Preferir Redux state (`isMobile`, `isScreen01`, `isScreen02`) sobre media queries inline
13. **styled-media-query**: Usar para breakpoints responsivos en estilos
14. **Donación Flows**: Patrón wizard para flujos multi-step
15. **Firebase**: Tracking de eventos, analytics, A/B testing con GrowthBook

### Dashboard-Specific
16. **Router v6 compatibility**: Dashboard usa react-router-dom v6 (plan de migración a v7)
17. **Role-Based Access**: Verificar permisos via AdminRole, SalesRole, SupportRole
18. **Filter Reducers**: Crear reducer separado por tabla/dominio (volunteerTableFilters, taskTableFilters, etc.)
19. **Modal Reducers**: Usar modalReducer central para gestionar visibility y loading de múltiples modales
20. **SearchTable Pattern**: Componente centralizado para renderizar tablas con filtros, paginación, sorting
21. **Stripe Integration**: Para Payouts y Subscription management
22. **Twilio Integration**: Para calls y phone interactions
23. **CSV/PDF Export**: Implementar para data export (PapaParse, html2pdf.js)

## Comandos en Claude Code

```bash
# Para Web project
claude run --agent react

# Para Dashboard project
claude run --agent react
```

Usa el mismo agente para ambos proyectos. Las diferencias estarán en el contexto del repositorio donde ejecutes el comando.

## Ejemplos Reales de los Proyectos

### Web Project
Plataforma de donaciones con estos features públicos:
- Donaciones monetarias (con Stripe)
- Cartas a abuelos
- Eventos comunitarios
- Desafíos y gamificación
- Cumpleaños y celebraciones
- Tienda de productos
- Perfiles de usuarios

**Flujos principales**: Donation Flow → Subscription → Payment Confirmation

**Ejemplo de Componente**: DonationFlow con WizardContainer
- Step 1: Seleccionar monto y tipo de donación
- Step 2: Datos personales y preferencias
- Step 3: Confirmación y pago

### Dashboard Project
Herramienta admin interna para gestionar la plataforma con estos dominios:
- Gestión de Voluntarios (tabla, búsqueda, filtros, perfiles)
- Gestión de Abuelos/Residencias (perfiles, historial, voluntarios esperando)
- Gestión de Tareas (creación, asignación, seguimiento)
- Gestión de Eventos (creación, participantes)
- Gestión de Desafíos (seguimiento, premios)
- Gestión de Corporativos (empresas, donaciones)
- Gestión de Ambassadors (promotores)
- Análisis de Ventas (dashboards, reportes)
- Gestión de Push Notifications
- Integración de llamadas Twilio

**Flujos principales**:
- Table View → Detail/Profile Modal → Edit/Action Modal → Confirmation
- Role-based access control (Admin/Sales/Support)
- CSV import/export para datos

**Ejemplo de Patrón**: VolunteerTable con SearchTable
- Búsqueda en tiempo real
- Filtros por status, role, ciudad
- Paginación
- Modales para editar/ver detalles
- Llamadas Twilio integradas
