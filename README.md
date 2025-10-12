<details>
<summary>Assignment Task Overview</summary>

# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>
- Acceptance criteria: <https://docs.google.com/document/d/1AIXTtrEMZBnfoLYXDlBYiEB-BTk7XNt2QlY7jWYdPv0/edit?tab=t.0#heading=h.8hapmwf98sj>

## Functional Requirements

- [Vue 3](https://vuejs.org/) and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- Routing and views (e.g. navigating to a given service from its card)
- State management with [Pinia](https://pinia.vuejs.org/)
- [Component Tests and/or Unit Tests](#run-component-and-unit-tests-with-vitest-and-optionally-vue-test-utils)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- The project should pass type checking and build successfully
- How you dedicate the allotted time to focus on your strengths
- Test coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

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

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.

</details>
<details>
<summary>Assignment Implementation Overview</summary>

## Overview

This project is my implementation for the Konnect frontend take-home assignment.  
In this README, I’m focusing mainly on my **design decisions**, **reasoning**, and how I structured the frontend layers, rather than describing the feature itself.  
The repo is self-contained, so exploring the code directly will give a clear picture of the implementation.

Even though I don’t have much prior experience with Vue, I tried to approach this the way I’d design it in a production environment thinking in terms of **state segregation**, **Architecture**, and **clear layering**.  
Most of my background is in React and React based ecosytem, so I intentionally tried to map some of the patterns I usually use there into the Vue ecosystem to understand how things work differently here.

---

## App Entry and Plugin Setup

The app starts from `main.ts`.  
Here I’ve initialized:

- `Pinia` for global state management
- A custom small implementation of `DataQuery` plugin (inspired by TanStack Query) (More on this on Data Layer Design section)
- Vue Router
- A **route state sync utility** (similar to NUQS in react ecosytem) (More on this on Data Layer Design section)
- Vue Router

### Why a plugin?
For the data layer, I had two options:
1. Import and use custom data query library's func directly (tight coupling)
2. Register them as a plugin (similar to how Pinia works)

I went with the plugin pattern.  
This keeps the data client loosely coupled and future friendly. For example, tomorrow the same plugin can use a different cache provider (like Redis, or an in-house caching layer) as long as it implements the same `ICacheManager` interface.

The NUQS-style library, however, is just a small wrapper around the vue router (Already tight coupled), so I imported it directly instead of making it a plugin.

---

## Data Layer Design

I divided data into three types:

### 1. Server-Originated Data
This includes anything fetched from APIs (/services list in our case).  
In a real project, I’d use something like **TanStack Query** or **SWR** for caching, background refetching, and error handling.  
For this project, I wrote a small in-house mock version just to simulate the same pattern (`lib/dataQuery`) like caching (currently buggy) and retry on failure etc.  
It’s not production ready and has a few bugs, but it works for the happy path and conveys the idea.

### 2. Client-Side Data
There are two main kinds here:
- **Route-bound data**: pagination and search parameters.  
  These are synced with the URL so that the state can be bookmarked or persisted on refresh.  
  I created a small wrapper over Vue Router to keep this two-way synced with `ref`s.
- **Global client data**: things like the logged-in user or global state. For this assignment Auth related data was one of the global state candidate.
  I kept these in **Pinia**. 

### 3. Modal State
For modal management, I had two choices:
1. Each component manages its own modal state using local refs or composables.
2. A single, centralized modal store that can handle registry, stacking, and observability at global levle.

I went with the **central modal manager** approach because it gives better app level control, especially when dealing with multiple modals, layering, or future observability.  
This is also managed in Pinia.

---

## Component and View Structure

I’ve split components into three clear categories:

1. **Base components** : low level, design-system like primitives (`BaseButton`, `BaseCard`, etc.)
   These are mostly visual and don’t contain logic.
2. **Common components** : combinations of base components that can have their own logic (`SearchInput`, `Pagination`, etc.)
3. **Feature components** : tightly coupled to the feature domain (`ServiceCatalog`, `ServiceCard`, etc.)

Pages are minimal:
- `HomeView` acts as a container for `ServiceCatalog`
- `NotFoundView` handles 404 routes

---

## Layout System

There’s a `DefaultLayout` component that wraps the page structure (fixed header + main content via `RouterView`).  
I chose this layout approach so that adding more layouts in the future (like AuthLayout, DashboardLayout) would be straightforward without restructuring the router.

---

## Styling and Tokens

I’ve used **SCSS** with a **BEM-style** structure for CSS naming.  
In a real world setup, I’d have a full design token system (like `green-500`, `neutral-100`, etc.) with theme level variables that switch per theme.

For this assignment, I created a `variables.css` file to simulate tokens from the provided Figma.  
I rounded values to the closest matches and tried to stay consistent, though a few raw values slipped in due to time constraints.

---

## Design System Notes

I haven’t implemented a full design system here since that would take significant time.  
However, the base components are written with that mindset of reusable and styled with consistent tokens.

---

## Limitations and What I’d Improve

- **Testing** – Only manual testing done due to time limitations and limited knowledge of Vue Ecosystem.  
- **i18n** – Currently, strings are hardcoded. I’d move them into JSON to support i18n.  
- **Accessibility** – Very minimal (Only semantic HTML used) but in real world would add roles, keyboard navigation, and follow aria recommendations.  
- **Observability** – Not implemented 
- **SVGs** – Used as static `<img>` tags for now, would convert to inline components to support dynamic theming.

---

## Reflection

I’m fairly new to Vue Ecosytem, so this assignment was more of a **learn-by-building** experience for me in Vue ecosystem and utilise all my architecture thinking along the way. I tried showcase more of a system design aspect here rather than my solid understanding of Vue.  
I didn’t spend time reading complete docs end-to-end first then implement instead, I tried to reason about how things should work and then implemented them and use docs along the way.

---

## DeepWiki Index

I’ve also indexed this repo on DeepWiki that can give a good HLD/LLD level docs and explain the parts would be easier to follow along:  
[https://deepwiki.com/shivam151395/konnect-team-interview-frontend-exercise](https://deepwiki.com/shivam151395/konnect-team-interview-frontend-exercise)

---


</details>
