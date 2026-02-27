# @adoptaunabuelo/react-components

A simple, customizable, and accessible library of React components built with TypeScript and styled-components, developed for the Adopta Un Abuelo ecosystem.

[![npm latest package](https://img.shields.io/npm/v/@adoptaunabuelo/react-components/latest.svg)](https://www.npmjs.com/package/@adoptaunabuelo/react-components)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Adopta-Un-Abuelo/react-components/blob/main/LICENSE)
<a href="https://www.chromatic.com/library?appId=64650038c7589bed568201a8" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg" alt="storybook"></a>

## 🚀 Installation

### 1. Install the package
```sh
# npm
npm install @adoptaunabuelo/react-components react react-dom styled-components

# yarn
yarn add @adoptaunabuelo/react-components react react-dom styled-components
```

### 2. Peer Dependencies
This library requires the following peer dependencies:

| Package | Version | Required |
|---------|---------|----------|
| `react` | ^18.0.0 || ^19.0.0 | ✅ Yes |
| `react-dom` | ^18.0.0 || ^19.0.0 | ✅ Yes |
| `styled-components` | ^5.0.0 || ^6.0.0 | ✅ Yes |

### 3. Optional Dependencies
Some components require additional dependencies for specific functionality:

| Component | Package | Purpose |
|-----------|---------|---------|
| `InputLocation` | `@react-google-maps/api` | Google Maps integration |
| `Payout` | `@stripe/react-stripe-js` `@stripe/stripe-js` | Stripe payments |
| `TextArea` (Rich Text) | `@tiptap/*` packages | Rich text editing |
| `Button` | `@lottiefiles/react-lottie-player` | Loading/Success animations |
| `InputImage` | `react-webcam` | Camera access |

## 📖 Features

- 🛠 **Customizable**: Built with styled-components for easy theming.
- 📦 **Modern Stack**: React 19, TypeScript, Rollup, and Storybook.
- 🧩 **Pattern Driven**: Uses the Variant Router Pattern for clean component architecture.
- ♿ **Accessible**: Focused on meeting standard a11y requirements.
- 🧪 **Tested**: Interactive Storybook stories with play functions and Chromatic visual testing.

## 🛠 Usage

### Basic Example
```jsx
import React from 'react';
import { ProgressBar, Button } from '@adoptaunabuelo/react-components';

function App() {
  return (
    <div>
      <ProgressBar maxValue={100} minValue={0} progress={40} />
      <Button design="primary" text="Click Me" onClick={() => console.log('Clicked!')} />
    </div>
  );
}
```

### Google Maps (InputLocation)
To use `InputLocation`, add the Google Maps script to your project's header:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&language=es"></script>
```

## 🏗 Development

### Environment Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with your `GOOGLE_MAPS_API` key for local testing.

### Common Commands
- `npm run storybook`: Run dev server (port 6006)
- `npm run build`: Build for production (Rollup)
- `npm run chromatic`: Run visual regression tests
- `npm run release`: Automated release (Main branch only)

### Architecture
Components follow the **Variant Router Pattern**:
- `ComponentName.tsx`: Router that delegates to variants.
- `ComponentPrimary.tsx`, `ComponentSecondary.tsx`: Implementations.
- `ComponentName.stories.tsx`: Documentation and tests.

We use **Path Aliases** for clean imports:
- `@components/*` -> `src/components/*`
- `@constants/*` -> `src/constants/*`
- `@assets/*` -> `src/assets/*`

## 🎨 Storybook
Checkout all library components, their documentation, and interactive states in our Storybook:

👉 **[Open Storybook](https://www.chromatic.com/library?appId=64650038c7589bed568201a8)**

## 🤝 Contributing
Contributions are welcome! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

## 📄 License
Licensed under the [MIT License](./LICENSE).