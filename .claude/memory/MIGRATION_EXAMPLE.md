# Path Aliases Migration Example

This document shows a real example of how to migrate existing components to use path aliases.

## Example: Button Component Migration

### Before (Old Style with Relative Paths)

```typescript
// src/components/Button/ButtonPrimary.tsx (OLD)
import React, { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import Color from "../../constants/Color";                    // ❌ Relative path
import loadingAnimation from "../../assets/button-loading.json";  // ❌ Relative path
import successAnimation from "../../assets/button-success.json";  // ❌ Relative path
import Text from "../Text/Text";                              // ❌ Inconsistent - could be alias

export interface ButtonPrimaryProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  success?: boolean;
  size?: "small" | "normal";
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  loading,
  success,
  ...restProps
}) => {
  return (
    <StyledButton
      $loading={loading}
      $success={success}
      {...restProps}
    >
      {loading ? (
        <Player src={loadingAnimation} autoplay loop style={{ width: 24, height: 24 }} />
      ) : success ? (
        <Player src={successAnimation} autoplay loop style={{ width: 24, height: 24 }} />
      ) : (
        <Text>{restProps.children}</Text>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $loading?: boolean;
  $success?: boolean;
  $size?: "small" | "normal";
}>`
  background-color: ${Color.background.primary};
  color: ${Color.text.white};
  border: none;
  padding: ${props => props.$size === "small" ? "8px 16px" : "12px 24px"};
  border-radius: 8px;
  cursor: ${props => props.$loading ? "not-allowed" : "pointer"};

  &:hover {
    background-color: ${Color.background.primaryHover};
  }
`;

export default ButtonPrimary;
```

### After (New Style with Path Aliases)

```typescript
// src/components/Button/ButtonPrimary.tsx (NEW)
import React, { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import { Color } from "@constants/Color";                     // ✅ Path alias
import loadingAnimation from "@assets/button-loading.json";   // ✅ Path alias
import successAnimation from "@assets/button-success.json";   // ✅ Path alias
import Text from "@components/Text/Text";                     // ✅ Path alias

export interface ButtonPrimaryProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  success?: boolean;
  size?: "small" | "normal";
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  loading,
  success,
  ...restProps
}) => {
  return (
    <StyledButton
      $loading={loading}
      $success={success}
      {...restProps}
    >
      {loading ? (
        <Player src={loadingAnimation} autoplay loop style={{ width: 24, height: 24 }} />
      ) : success ? (
        <Player src={successAnimation} autoplay loop style={{ width: 24, height: 24 }} />
      ) : (
        <Text>{restProps.children}</Text>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $loading?: boolean;
  $success?: boolean;
  $size?: "small" | "normal";
}>`
  background-color: ${Color.background.primary};
  color: ${Color.text.white};
  border: none;
  padding: ${props => props.$size === "small" ? "8px 16px" : "12px 24px"};
  border-radius: 8px;
  cursor: ${props => props.$loading ? "not-allowed" : "pointer"};

  &:hover {
    background-color: ${Color.background.primaryHover};
  }
`;

export default ButtonPrimary;
```

### Changes Summary

Only 4 lines changed:

```diff
- import Color from "../../constants/Color";
+ import { Color } from "@constants/Color";

- import loadingAnimation from "../../assets/button-loading.json";
+ import loadingAnimation from "@assets/button-loading.json";

- import successAnimation from "../../assets/button-success.json";
+ import successAnimation from "@assets/button-success.json";

- import Text from "../Text/Text";
+ import Text from "@components/Text/Text";
```

## Migration Checklist

When migrating a component to use path aliases:

### 1. Identify Imports to Change

- [ ] Look for imports with `../../` or `../`
- [ ] Find imports from `components/`, `constants/`, or `assets/`
- [ ] Keep same-directory imports as relative (e.g., `./ButtonPrimary`)

### 2. Replace with Appropriate Alias

```typescript
// Components
"../../components/X"  → "@components/X"
"../components/X"     → "@components/X"
"../X"                → "@components/X"  (if X is a component)

// Constants
"../../constants/X"   → "@constants/X"
"../../../constants/X"→ "@constants/X"

// Assets
"../../assets/X"      → "@assets/X"
```

### 3. Update Named Imports

Change default imports to named imports for constants (recommended for better tree-shaking):

```typescript
// Before
import Color from "@constants/Color";
const { background } = Color;

// After (better)
import { Color } from "@constants/Color";
const { background } = Color;
```

### 4. Test the Component

After migration:

- [ ] Run `npm run build` to ensure no build errors
- [ ] Start Storybook with `npm run storybook`
- [ ] Verify component renders correctly
- [ ] Check that no TypeScript errors appear

### 5. Verify Auto-complete Works

In your IDE:
- [ ] Type `import X from "@components/` and verify auto-complete shows components
- [ ] Type `import { Color } from "@constants/` and verify auto-complete works
- [ ] Cmd+Click on import paths should navigate to correct files

## Common Migration Patterns

### Pattern 1: Component Importing Another Component

```typescript
// Before
import Card from "../Card/Card";
import Button from "../Button/Button";

// After
import Card from "@components/Card/Card";
import Button from "@components/Button/Button";
```

### Pattern 2: Component Importing Constants

```typescript
// Before
import Color from "../../constants/Color";
import ColorV2 from "../../constants/ColorV2";

// After
import { Color } from "@constants/Color";
import { ColorV2 } from "@constants/ColorV2";
```

### Pattern 3: Component Importing Assets

```typescript
// Before
import logo from "../../assets/logo.png";
import animation from "../../assets/loading.json";

// After
import logo from "@assets/logo.png";
import animation from "@assets/loading.json";
```

### Pattern 4: Same Directory (Don't Change!)

```typescript
// Before
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

// After (SAME - don't use aliases for same directory)
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
```

## Automated Migration

For bulk migration, you can use find-and-replace with regex:

### VSCode Find & Replace (Cmd+Shift+H)

1. **Find components imports:**
   ```regex
   import (.*) from ["'](\.\./)+components/(.*)["']
   ```
   **Replace with:**
   ```
   import $1 from "@components/$3"
   ```

2. **Find constants imports:**
   ```regex
   import (.*) from ["'](\.\./)+constants/(.*)["']
   ```
   **Replace with:**
   ```
   import $1 from "@constants/$3"
   ```

3. **Find assets imports:**
   ```regex
   import (.*) from ["'](\.\./)+assets/(.*)["']
   ```
   **Replace with:**
   ```
   import $1 from "@assets/$3"
   ```

**⚠️ Warning:** Always review automated changes before committing!

## Testing After Migration

Run these commands to ensure everything works:

```bash
# Clean build
npm run build

# Run Storybook
npm run storybook

# Visual testing (if configured)
npm run chromatic
```

## Rollback if Needed

If you encounter issues, you can easily revert using git:

```bash
# Revert specific file
git checkout HEAD -- src/components/Button/ButtonPrimary.tsx

# Revert all changes
git reset --hard HEAD
```

## Questions?

- See [PATH_ALIASES.md](./PATH_ALIASES.md) for complete documentation
- See [CLAUDE.md](./CLAUDE.md) for project patterns
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
