# Welcome

## Goal

Make this Vue 3 app as close to [this mock](https://www.figma.com/file/zeaWiePnc3OCe34I4oZbzN/Service-Card-List?node-id=0%3A1) as possible while utilizing best-practices, coding standards, and great code to improve the example codebase.

The styling should be responsive and look good at different browser window sizes.

The provided exercise files are a starting point; they have room for improvement. Don't treat the mock as gospel -- if you see things that don't make sense, implement what you think is right.

You may use our component library, [Kongponents](https://beta.kongponents.konghq.com), if desired; however, keep in mind we want to see the code **YOU** can write as well.

### Links

- Figma Mock: <https://www.figma.com/file/zeaWiePnc3OCe34I4oZbzN/Service-Card-List?node-id=0%3A1>
- Kongponents (for Vue 3): <https://beta.kongponents.konghq.com>

## Functional Requirements

- Ability to view the name, a brief description, and versions available for services
- Ability to search services (client-side implementation)
- User can paginate through services (client-side implementation)
- Responsive layout
- Update the `README` in the project to describe your design considerations, assumptions and trade-offs made during this exercise
- The Create Service button and clicks on service cards don't have to be operable -- could do nothing, could open a modal with a message, or could be fully implemented (stretch goal)

## Additional Considerations

- TypeScript
- Tests
- Routing and views (e.g. navigating to a given service from its card)
- Pinia state management
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code to see how you work, how you approach UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design
- Code quality, including appropriate componentization and modularity
- Coding practices and industry standards

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

```sh
yarn install --frozen-lockfile
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

It is __highly recommended__ to use the following command in order to create your commits:

```sh
yarn commit
```

This will trigger the Commitizen interactive prompt for building your commit message.

### Compile and Hot-Reload for Development

Start the backend:

```sh
yarn server
```

Separately, start the frontend:

```sh
yarn dev
```

### Lint with ESLint

```sh
# Run the linter
yarn lint

# Fix linting errors
yarn lint:fix
```

### Build and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

Unit test files must be named `*.spec.ts`

```sh
# Run unit tests
yarn test:unit

# or run unit tests and view in the Vitest UI
yarn test:unit:ui

# or view test coverage via Vitest
yarn test:unit:coverage
```

### Run Component Tests with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)

Component test files must be named `*.spec.component.ts`

```sh
# Run component tests
yarn test:component

# or run the component tests in the Cypress UI
yarn test:component:open
```
