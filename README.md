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
npm install @adoptaunabuelo/react-components
```

**yarn:**

```sh
yarn add @adoptaunabuelo/react-components
```

## Getting started with React Components

Here is an example of a basic app using React Components `ProgressBar` component:

```jsx
import * as React from 'react';
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
To be able to use Input location, you will need to add this line to your project header:

```html
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&language=es"/>
```
Please, replace ``YOUR_API_KEY`` with your Google Maps API Key.

## Storybook

You can checkout all the library Components and its docs in our storybook

[Open the Storybook](https://www.chromatic.com/library?appId=64650038c7589bed568201a8)

## Changelog

The [changelog](https://github.com/mui/material-ui/releases) is regularly updated to reflect what's changed in each new release.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).