# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@adoptaunabuelo/react-components`, a React component library built with TypeScript and styled-components. The library is published to npm and documented via Storybook.

## Common Commands

### Development
```bash
npm run storybook          # Run Storybook dev server on port 6006
npm run build              # Build the library with Rollup
npm run build-storybook    # Build static Storybook
npm run chromatic          # Run Chromatic visual testing
```

### Testing
- Tests are written as interactive Storybook stories using `@storybook/test`
- Each component's `.stories.tsx` file includes `play` functions with test assertions
- No separate test runner; use Storybook and Chromatic for testing

### Release
```bash
npm run release            # Run auto shipit (automated release)
```
- Releases are automated via GitHub Actions on push to main
- Uses the `auto` package for changelog generation and npm publishing

### Maintenance
```bash
npm run clean              # Clean install (removes node_modules, package-lock.json, dist)
```

## Architecture

### Component Structure Pattern

Components follow a **variant router pattern**:

1. **Main Component** (`ComponentName.tsx`): Acts as a router that delegates to variant implementations based on props
2. **Variant Components** (`ComponentPrimary.tsx`, `ComponentSecondary.tsx`): Actual implementations
3. **Stories** (`Component.stories.tsx`): Storybook documentation with interactive tests

Example from Button component:
```typescript
// Button.tsx routes to variants
const Button = ({ design, ...props }) => {
  return design === "secondary" ? <ButtonSecondary {...props} />
    : design === "text" ? <ButtonText {...props} />
    : <ButtonPrimary {...props} />;
};
```

### Directory Structure

```
src/
├── components/          # All React components
│   ├── Button/
│   │   ├── Button.tsx           # Main router component
│   │   ├── ButtonPrimary.tsx    # Variant implementation
│   │   ├── ButtonSecondary.tsx  # Variant implementation
│   │   └── Button.stories.tsx   # Storybook stories + tests
│   ├── Input/               # Complex components have subdirectories
│   │   ├── Basic/
│   │   ├── Phone/
│   │   ├── Location/
│   │   └── ...
│   └── ...
├── constants/          # Shared constants (Color, ColorV2, Country)
└── assets/            # Static assets (mainly Lottie animations)
```

### Path Aliases (IMPORTANT)

This project uses TypeScript path aliases for consistent and maintainable imports:

| Alias | Path | Usage |
|-------|------|-------|
| `@components/*` | `src/components/*` | Import components |
| `@constants/*` | `src/constants/*` | Import constants |
| `@assets/*` | `src/assets/*` | Import assets |

**Usage examples:**
```typescript
// ✅ CORRECT: Use path aliases for cross-directory imports
import Text from "@components/Text/Text";
import { Color } from "@constants/Color";
import loadingAnimation from "@assets/button-loading.json";

// ✅ CORRECT: Use relative paths for same-directory imports
import ButtonPrimary from "./ButtonPrimary";

// ❌ WRONG: Don't use relative paths for cross-directory imports
import Text from "../../components/Text/Text";
import Color from "../../../constants/Color";
```

**Benefits:**
- Consistent imports regardless of file location
- Easier refactoring (moving files doesn't break imports)
- Better readability and maintainability
- Improved IDE autocomplete

See [PATH_ALIASES.md](./PATH_ALIASES.md) for complete documentation.

### Export Pattern

All exports flow through:
1. Individual component files export their component
2. `src/components/index.ts` exports all components
3. `src/index.ts` re-exports from components and constants
4. Package consumers import from `@adoptaunabuelo/react-components`

### Build Configuration

- **Rollup** bundles to ESM format in `dist/esm/`
- Excludes `*.stories.tsx` files from build
- Generates TypeScript declarations in `dist/index.d.ts`
- Uses plugins: TypeScript, PostCSS, Terser, SVGR for SVG imports

## Creating New Components

1. Create component folder: `src/components/ComponentName/`
2. Create main component: `ComponentName.tsx`
3. Create variants if needed: `ComponentPrimary.tsx`, `ComponentSecondary.tsx`
4. Create story file: `ComponentName.stories.tsx` with interactive tests
5. Export in `src/components/index.ts`:
   ```typescript
   export { default as ComponentName } from "./ComponentName/ComponentName";
   ```

### Story File Pattern

Stories should include:
- Meta configuration with `autodocs` tag
- Multiple story variants demonstrating component states
- `play` functions with interaction tests using `@storybook/test`
- Example:
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

## Styling

- Uses **styled-components** for all styling
- Transient props (prefixed with `$`) for styled-component props that shouldn't be passed to DOM
- Color constants imported from `src/constants/Color.tsx` (avoid hardcoded colors)
- Responsive utilities available via `styled-media-query`

## Special Dependencies

- **Tiptap**: Rich text editor (TextArea component)
- **Google Maps API**: Required for `InputLocation` component
  - Add `GOOGLE_MAPS_API=YOUR_KEY` to `.env` for local development
  - Users must add script tag to their app: `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&language=es"/>`
- **Stripe**: Payout component integration
- **Lottie**: Animations (button loading/success states)
- **Lucide React**: Icon library

## Important Notes

- **Do not modify** files in `src/constants/` (per CONTRIBUTING.md)
- Minimum Node.js version: 16.15+ (from CONTRIBUTING.md)
- React and react-dom are peer dependencies (version 19.x)
- TypeScript is in strict mode
- Component library targets ES6
