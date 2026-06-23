# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) cuando trabaja con el código de este repositorio.

## Descripción del Proyecto

Esta es `@adoptaunabuelo/react-components`, una librería de componentes React construida con TypeScript y styled-components. La librería se publica en npm y se documenta mediante Storybook.

## Comandos Comunes

### Desarrollo
```bash
npm run storybook          # Levanta el servidor de Storybook en el puerto 6006
npm run build              # Compila la librería con Rollup
npm run build-storybook    # Genera el Storybook estático
npm run chromatic          # Ejecuta las pruebas visuales con Chromatic
```

### Testing
- Las pruebas se escriben como stories interactivas de Storybook usando `@storybook/test`
- Cada archivo `.stories.tsx` de un componente incluye funciones `play` con aserciones
- No hay un test runner separado; se usa Storybook y Chromatic para testear

### Release
```bash
npm run release            # Ejecuta auto shipit (release automatizado)
```
- Los releases están automatizados mediante GitHub Actions al hacer push a main
- Usa el paquete `auto` para generación de changelog y publicación en npm

### Mantenimiento
```bash
npm run clean              # Instalación limpia (elimina node_modules, package-lock.json, dist)
```

## Arquitectura

### Patrón de Estructura de Componentes

Los componentes siguen un **patrón de router de variantes**:

1. **Componente Principal** (`ComponentName.tsx`): Actúa como router que delega a las implementaciones de variantes según las props
2. **Componentes de Variante** (`ComponentPrimary.tsx`, `ComponentSecondary.tsx`): Implementaciones reales
3. **Stories** (`Component.stories.tsx`): Documentación de Storybook con pruebas interactivas

Ejemplo del componente Button:
```typescript
// Button.tsx enruta a las variantes
const Button = ({ design, ...props }) => {
  return design === "secondary" ? <ButtonSecondary {...props} />
    : design === "text" ? <ButtonText {...props} />
    : <ButtonPrimary {...props} />;
};
```

### Estructura de Directorios

```
src/
├── components/          # Todos los componentes React
│   ├── Button/
│   │   ├── Button.tsx           # Componente router principal
│   │   ├── ButtonPrimary.tsx    # Implementación de variante
│   │   ├── ButtonSecondary.tsx  # Implementación de variante
│   │   └── Button.stories.tsx   # Stories de Storybook + tests
│   ├── Input/               # Los componentes complejos tienen subdirectorios
│   │   ├── Basic/
│   │   ├── Phone/
│   │   ├── Location/
│   │   └── ...
│   └── ...
├── constants/          # Constantes compartidas (Color, ColorV2, Country)
└── assets/            # Recursos estáticos (principalmente animaciones Lottie)
```

### Alias de Rutas (IMPORTANTE)

Este proyecto usa alias de rutas de TypeScript para imports consistentes y mantenibles:

| Alias | Ruta | Uso |
|-------|------|-----|
| `@components/*` | `src/components/*` | Importar componentes |
| `@constants/*` | `src/constants/*` | Importar constantes |
| `@assets/*` | `src/assets/*` | Importar recursos |

**Ejemplos de uso:**
```typescript
// ✅ CORRECTO: Usa alias de rutas para imports entre directorios
import Text from "@components/Text/Text";
import { Color } from "@constants/Color";
import loadingAnimation from "@assets/button-loading.json";

// ✅ CORRECTO: Usa rutas relativas para imports del mismo directorio
import ButtonPrimary from "./ButtonPrimary";

// ❌ INCORRECTO: No uses rutas relativas para imports entre directorios
import Text from "../../components/Text/Text";
import Color from "../../../constants/Color";
```

**Beneficios:**
- Imports consistentes sin importar la ubicación del archivo
- Refactorización más sencilla (mover archivos no rompe los imports)
- Mejor legibilidad y mantenibilidad
- Mejor autocompletado en el IDE

Los paths se configuran en `tsconfig.json` bajo `compilerOptions.paths` y se resuelven en build mediante `babel-plugin-module-resolver`.

### Patrón de Exports

Todos los exports siguen este flujo:
1. Cada archivo de componente exporta su componente
2. `src/components/index.ts` exporta todos los componentes
3. `src/index.ts` re-exporta desde components y constants
4. Los consumidores del paquete importan desde `@adoptaunabuelo/react-components`

### Configuración del Build

- **Rollup** empaqueta a formato ESM en `dist/esm/`
- Excluye los archivos `*.stories.tsx` del build
- Genera las declaraciones TypeScript en `dist/index.d.ts`
- Usa los plugins: TypeScript, PostCSS, Terser, SVGR para imports de SVG

## Crear Nuevos Componentes

1. Crear la carpeta del componente: `src/components/ComponentName/`
2. Crear el componente principal: `ComponentName.tsx`
3. Crear variantes si es necesario: `ComponentPrimary.tsx`, `ComponentSecondary.tsx`
4. Crear el archivo de story: `ComponentName.stories.tsx` con tests interactivos
5. Exportar en `src/components/index.ts`:
   ```typescript
   export { default as ComponentName } from "./ComponentName/ComponentName";
   ```

### Patrón del Archivo de Story

Las stories deben incluir:
- Configuración de Meta con el tag `autodocs`
- Múltiples variantes de story que demuestren los estados del componente
- Funciones `play` con tests de interacción usando `@storybook/test`
- Ejemplo:
  ```typescript
  export const Primary: Story = {
    args: { ... },
    play: async ({ canvasElement, step }) => {
      const canvas = within(canvasElement);
      await step("render", async () => {
        expect(canvas.getByRole("button")).toBeInTheDocument();
      });
    }
  };
  ```

## Estilos

- Se usa **styled-components** para todos los estilos
- Props transitorias (con prefijo `$`) para props de styled-components que no deben pasarse al DOM
- Las constantes de color se importan desde `src/constants/Color.tsx` (evita colores hardcodeados)
- Utilidades responsivas disponibles vía `styled-media-query`

## Dependencias Especiales

- **Tiptap**: Editor de texto enriquecido (componente TextArea)
- **Google Maps API**: Necesaria para el componente `InputLocation`
  - Añade `GOOGLE_MAPS_API=YOUR_KEY` al `.env` para desarrollo local
  - Los usuarios deben añadir el script en su app: `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&language=es"/>`
- **Stripe**: Integración del componente Payout
- **Lottie**: Animaciones (estados de loading/success del botón)
- **Lucide React**: Librería de iconos

## Notas Importantes

- **No modificar** los archivos en `src/constants/` (según CONTRIBUTING.md)
- Versión mínima de Node.js: 16.15+ (según CONTRIBUTING.md)
- Peer dependencies: `react`/`react-dom` (`^18.0.0 || ^19.0.0`) y `styled-components` (`^5 || ^6`)
- Muchas integraciones son peer deps opcionales (Tiptap, Lottie, Stripe, react-google-maps, react-webcam) — ver `peerDependenciesMeta` en `package.json`
- TypeScript en modo strict
- La librería compila a ES6

## Variables de Entorno

- `GOOGLE_MAPS_API` — necesaria para `InputLocation` en Storybook local (ver CONTRIBUTING.md)
- `CHROMATIC_PROJECT_TOKEN` — necesaria para `npm run chromatic`; en CI proviene de un GitHub Actions secret con el mismo nombre
