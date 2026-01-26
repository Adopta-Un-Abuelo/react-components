# Migration Guide: Peer Dependencies

## Overview

Starting from version 0.3.143, `@adoptaunabuelo/react-components` has moved several dependencies to **peer dependencies** to reduce bundle size and improve compatibility. This follows npm best practices for component libraries.

## Why This Change?

### Benefits:
- ✅ **Smaller bundle size**: Core dependencies (React, styled-components) are no longer bundled
- ✅ **No version conflicts**: Your app controls the React and styled-components versions
- ✅ **Better tree-shaking**: Unused optional dependencies won't be installed
- ✅ **Faster installation**: Only install what you actually use
- ✅ **Production best practice**: Follows standard npm library patterns

### Impact:
- **Before**: 32 dependencies (React, Next.js, Stripe, Tiptap all bundled)
- **After**: 14 core dependencies + 3 peer dependencies + 11 optional peer dependencies
- **Removed**: Next.js (16MB), date-fns (redundant with moment)

## What You Need to Do

### 1. Install Required Peer Dependencies

If you're **installing for the first time** or **upgrading**, ensure you have these peer dependencies:

```bash
npm install react react-dom styled-components
```

Most React projects already have these, so you likely don't need to do anything.

### 2. Install Optional Dependencies (Only if Needed)

Only install these if you use the specific components:

#### Google Maps (InputLocation component)
```bash
npm install @react-google-maps/api
```

#### Stripe (Payout component)
```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

#### Rich Text Editor (TextArea component)
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions
```

#### Lottie Animations (Button loading states)
```bash
npm install @lottiefiles/react-lottie-player
```

#### Webcam (InputImage component)
```bash
npm install react-webcam
```

#### Styled Components Optimization
```bash
npm install @emotion/is-prop-valid
```

## Version Compatibility

| Package | Supported Versions |
|---------|-------------------|
| React | ^18.0.0 or ^19.0.0 |
| React DOM | ^18.0.0 or ^19.0.0 |
| Styled Components | ^5.0.0 or ^6.0.0 |

## Breaking Changes

### Removed Dependencies
- ❌ **Next.js** - Was never needed, removed entirely
- ❌ **date-fns** - Redundant with moment, removed (internal change only)

### Moved to Peer Dependencies
- 🔄 **react** & **react-dom** - Now peer dependencies (required)
- 🔄 **styled-components** - Now peer dependency (required)

### Moved to Optional Peer Dependencies
- 🔄 **@stripe/react-stripe-js** & **@stripe/stripe-js**
- 🔄 **@react-google-maps/api**
- 🔄 **@tiptap/\*** (all Tiptap packages)
- 🔄 **@lottiefiles/react-lottie-player**
- 🔄 **react-webcam**

## Troubleshooting

### Error: "Cannot find module 'react'"
**Solution**: Install peer dependencies
```bash
npm install react react-dom styled-components
```

### Error: "Cannot find module '@stripe/stripe-js'"
**Solution**: You're using the Payout component. Install Stripe:
```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

### Error: "Cannot find module '@react-google-maps/api'"
**Solution**: You're using InputLocation. Install Google Maps:
```bash
npm install @react-google-maps/api
```

### Error: "Cannot find module '@tiptap/react'"
**Solution**: You're using TextArea with rich text. Install Tiptap:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions
```

### Peer dependency warnings during installation
**This is normal**. npm will warn you about missing optional peer dependencies. Only install what you actually use.

## For Library Maintainers

If you're maintaining this library:

### Installing Dependencies for Development
```bash
npm install
```

This will install all dependencies including optional ones for Storybook development.

### Building the Library
```bash
npm run build
```

The build process uses `rollup-plugin-peer-deps-external` to automatically exclude peer dependencies from the bundle.

## Migration Checklist

- [ ] Update to latest version: `npm install @adoptaunabuelo/react-components@latest`
- [ ] Verify peer dependencies are installed: `npm ls react react-dom styled-components`
- [ ] Install optional dependencies for components you use (see table above)
- [ ] Test your application
- [ ] Remove any manual workarounds for dependency conflicts

## Questions?

If you encounter issues during migration, please [open an issue](https://github.com/Adopta-Un-Abuelo/react-components/issues) on GitHub.
