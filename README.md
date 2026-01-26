# react-components
A simple, customizable, and accessible library of React components

[![npm latest package](https://img.shields.io/npm/v/@adoptaunabuelo/react-components/latest.svg)](https://www.npmjs.com/package/@adoptaunabuelo/react-components)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui/material-ui/blob/HEAD/LICENSE)
<a href="https://www.chromatic.com/library?appId=64650038c7589bed568201a8" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

## Installation

### React Components

React Components is available as an [npm package](https://www.npmjs.com/package/@adoptaunabuelo/react-components).

**npm:**

```sh
npm install @adoptaunabuelo/react-components react react-dom styled-components
```

**yarn:**

```sh
yarn add @adoptaunabuelo/react-components react react-dom styled-components
```

### Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

| Package | Version | Required |
|---------|---------|----------|
| `react` | ^18.0.0 \|\| ^19.0.0 | ✅ Yes |
| `react-dom` | ^18.0.0 \|\| ^19.0.0 | ✅ Yes |
| `styled-components` | ^5.0.0 \|\| ^6.0.0 | ✅ Yes |

### Optional Dependencies (Required for Specific Components)

Some components require additional dependencies. Install only what you need:

| Component(s) | Package(s) | Installation |
|--------------|-----------|--------------|
| `InputLocation` | `@react-google-maps/api` | `npm install @react-google-maps/api` |
| `Payout` | `@stripe/react-stripe-js` `@stripe/stripe-js` | `npm install @stripe/react-stripe-js @stripe/stripe-js` |
| `TextArea` (Rich Text) | `@tiptap/react` `@tiptap/starter-kit` `@tiptap/extension-text-align` `@tiptap/extension-text-style` `@tiptap/extensions` | `npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions` |
| `Button` (Loading animations) | `@lottiefiles/react-lottie-player` | `npm install @lottiefiles/react-lottie-player` |
| `InputImage` | `react-webcam` | `npm install react-webcam` |
| Styled Components | `@emotion/is-prop-valid` | `npm install @emotion/is-prop-valid` |

## Getting started with React Components

Here is an example of a basic app using React Components `ProgressBar` component:

```jsx
import React from 'react';
import { ProgressBar } from '@adoptaunabuelo/react-components';

function App() {
    return (
        <ProgressBar 
            maxValue={100}
            minValue={0}
            progress={40}
        />;
    )
}
```

### Watch out! 
To be able to use Input type location, you will need to add this line to your project header:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&language=es"/>
```
Please, replace ``YOUR_API_KEY`` with your Google Maps API Key.

## Storybook

You can checkout all the library Components and its docs in our storybook

[Open the Storybook](https://www.chromatic.com/library?appId=64650038c7589bed568201a8)

## Changelog

The [changelog](https://github.com/Adopta-Un-Abuelo/react-components/releases) is regularly updated to reflect what's changed in each new release.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).