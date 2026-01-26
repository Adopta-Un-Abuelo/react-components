# Path Aliases Configuration

## Overview

This project now uses TypeScript path aliases to improve import consistency and maintainability. This eliminates the confusion of relative paths like `../../` and makes imports cleaner and easier to refactor.

## Available Aliases

| Alias | Resolves To | Usage |
|-------|-------------|-------|
| `@components/*` | `src/components/*` | Import components |
| `@constants/*` | `src/constants/*` | Import constants (Color, ColorV2, Country) |
| `@assets/*` | `src/assets/*` | Import assets (Lottie animations, etc.) |

## Migration Examples

### Before (Relative Paths - Inconsistent ❌)

```typescript
// Some components used:
import Text from "../../components/Text/Text";
import Color from "../../constants/Color";

// Others used:
import Text from "../Text/Text";
import Color from "../../../constants/Color";

// Very confusing and error-prone!
```

### After (Path Aliases - Consistent ✅)

```typescript
import Text from "@components/Text/Text";
import { Color } from "@constants/Color";
import loadingAnimation from "@assets/button-loading.json";
```

## Benefits

1. **Consistency**: All imports look the same regardless of file location
2. **Refactoring**: Moving files doesn't break imports
3. **Readability**: Clear where imports come from
4. **IDE Support**: Better autocomplete and navigation
5. **Maintainability**: Easier for new contributors to understand

## Usage Guidelines

### ✅ DO: Use aliases for cross-directory imports

```typescript
// ComponentA importing ComponentB
import { Button } from "@components/Button/Button";
import { Color } from "@constants/Color";
```

### ✅ DO: Use relative paths for same-directory imports

```typescript
// Button/Button.tsx importing Button/ButtonPrimary.tsx
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
```

### ❌ DON'T: Mix old and new styles

```typescript
// Bad - mixing styles
import Text from "../../components/Text/Text";  // ❌ Old style
import { Color } from "@constants/Color";       // ✅ New style
```

## IDE Configuration

### VSCode

VSCode will automatically recognize the aliases from `tsconfig.json`. No additional configuration needed!

### Storybook

Storybook automatically reads from `tsconfig.json` - aliases work out of the box.

### Build Configuration

The path aliases are resolved during build by:
- **TypeScript Compiler**: Reads `tsconfig.json` paths
- **Rollup**: Uses `rollup-plugin-typescript-paths` to resolve aliases during bundling

## Migration Strategy

For new components, always use path aliases. For existing components:

1. **Immediate**: Use aliases in all new code
2. **Gradual**: Update imports when modifying existing files
3. **Bulk**: Consider mass migration after team approval

## Technical Details

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@constants/*": ["src/constants/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

### Rollup Configuration

```javascript
// rollup.config.cjs
const typescriptPaths = require("rollup-plugin-typescript-paths").default;

plugins: [
  typescriptPaths({
    tsConfigPath: "./tsconfig.json",
    preserveExtensions: true,
  }),
  // ... other plugins
]
```

## Troubleshooting

### Issue: "Cannot find module '@components/...'"

**Solution**: Restart your IDE/TypeScript server
- VSCode: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### Issue: Build fails with path resolution errors

**Solution**: Ensure `rollup-plugin-typescript-paths` is installed:
```bash
npm install --save-dev rollup-plugin-typescript-paths
```

### Issue: Storybook doesn't recognize aliases

**Solution**: Restart Storybook dev server:
```bash
npm run storybook
```

## Questions?

If you have questions about path aliases or need help migrating code, check:
- This document
- [CLAUDE.md](./CLAUDE.md) - Project patterns
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
