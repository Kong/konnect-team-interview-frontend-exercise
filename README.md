# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, you should code your submission as if you are using a production API

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>

## Functional Requirements

- Vue 3 and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-service-packages-endpoint))
- User should be able to paginate through services (client-side implementation)
- The create Service Package button and clicks on service cards don't have to be operable -- interacting with these elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- Routing and views (e.g. navigating to a given service from its card)
- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- State management with Pinia
- [Component Tests](#run-component-tests-with-cypress-component-testing) and/or [Unit Tests](#run-unit-tests-with-vitest)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- How you dedicate the allotted time to focus on your strengths
- Code coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

```sh
yarn install --frozen-lockfile
```

### Compile and Hot-Reload for Development

Start the backend:

```sh
yarn server
```

Separately, start the frontend:

```sh
yarn dev
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `yarn server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
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

### Run Component Tests with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)

Component test files must be located in the `/src/` directory and have a filename format of `*.cy.ts`

```sh
# Run component tests
yarn test:component

# or run the component tests in the Cypress UI
yarn test:component:open
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

Unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`

```sh
# Run unit tests
yarn test:unit

# or run unit tests and view in the Vitest UI
yarn test:unit:ui

# or view test coverage via Vitest
yarn test:unit:coverage
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar, it is **recommended** to use the following command in order to create your commits:

```sh
yarn commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
