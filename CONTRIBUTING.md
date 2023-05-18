
# Contribution Guidelines

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to React Components. Feel free to propose changes to this document in a pull request.

## Pull Requests

Feel free to open a pull-request to contribute to this project.

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github)

Guidelines for pull requests:

- __Make your commit messages as descriptive as possible.__ Include as much information as you can. Explain anything that the file diffs themselves won’t make apparent.
- __Document your pull request__. Explain your fix, link to the relevant issue, add screenshots when adding new icons.
- __Make sure the target of your pull request is the relevant branch__. Most of bugfix or new feature should go to the `main` branch.
- __Include only related work__. If your pull request has unrelated commit, it won't be accepted.


## Components Requests

Before creating an new component request, please search to see if someone has requested the component already. If there is an open request, please add a 👍.

If the icon has not already been requested, [create an issue](https://github.com/lucide-icons/lucide/issues/new?title=Icon%20Request:) with a title of `Component request: <component name>` and add as much information as possible.

## Development

You will need minimum version of [Nodejs 16.15+](https://nodejs.org)

After cloning the project you need to run:

```sh
npm install # Install dependencies, including the workspace packages
```

### Run Storybook

To test changes in a local project, you can use `yarn storybook` to run Storybook in localhost and test your changes.

```sh
# in packages/react-components

npm run storybook
```

## Project Structure

Root directories

```sh
react-components
|
└── src
    ├── components
    ├── constants
    └── stories
```

### Components

All the components, distributed by folders. If you want to create a new component, create a new folder and generate a new .tsx file.

You will need to export your new component in the index.ts file.

```jsx
export { default as ProgressBar } from './ProgressBar/ProgressBar';
```

### Constants

A group of constants like Color, that are used to give styles to the components.
> Note: Please, do not make any changes to this files.

### Stories

All the Storybook components stories. If you create a new component, you will need to create a .stories.tsx file to add it to the storybook.
