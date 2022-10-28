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
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
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

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
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

## Implementation

Consider this section a submission note, where I explain my decision-making process, assumptions, design considerations and trade-offs. I recommend you read this while having the app running in a separate window, so you could see what I’m referencing.

### Look & Feel

I tried to match the Figma design as closely as possible. However, in situations where I would approach the problem somewhat differently, I implemented it my way. Those are the details I would normally provide feedback to designer on, so we could discuss both options. Overall, there isn’t many places where I took a different approach from what the Figma designs were suggesting. One example is service version type label (`HTTP` vs. `REST`) in service details component (`service/ServiceVersions.vue` in my code). Here I thought it would make more sense displaying just 1 label for service type, rather than displaying both `HTTP` and `REST` and highlighting the applicable one. That helped me to save a little bit of space and squeeze that component in a pretty narrow location I chose for it (it appears when user clicks on any of the service cards on the home page).

**I tried to pay close attention to things like font sizes, colors, spacings (margins and paddings). I found the provided design very appealing and tried to do my best to match user experience in browser, to extend the feel of this design beyond Figma and into user interaction.**

I tried to make sure I double-check all space-size-related values in Figma. Sometimes I had to trust my eye, when Figma was giving me some funny values (”there is no way this is 1.67px padding… dude, it’s gotta be at least 4px, what are you talking about??”).

### CSS / SCSS

When it comes to self-evaluating my CSS/SCSS code in this codebase, I wanna start with mentioning that I fully recognize that I did a lot of cutting the corners in the interest of saving time and submitting this assignment before the deadline. Normally, I would love to build a design system, specifying at least majority of values that exist in this simple yet multifaceted page. I am talking about things like defining variables and rules for all possible font sizes, most margins and paddings, etc. Creating whole range of different “shortcut” classes that help developer easily apply most common rules in 1 vs. 3 lines of CSS. For example:
```css
display: inline-flex;
justify-content: space-between;
align-items: center;
```
Those 3 rules are somewhat commonly used together, so uniting them under class name `inline-flex-center` could result in saving some developer time and lines of code when dealing with majority of designs. While working on this project though, I didn't go into that much detail because that would take too much time. Instead, I wrote all CSS rules in the scope of particular component and it's nested children (taking full advantage of SCSS nesting, of course). Hopefully, I demonstrated level of detail I like to go to by creating different `.scss` files for defining variables and classes for typography, colors and screen sizes.

I also tried to avoid hardcoding any width or height as much as possible and only did it in places where truncating text could be necessary (for example, version name, version description and developer name elements in the sidebar slide-in component). Don’t worry too much about the developer whose name got truncated - you can hover their avatar and see their full name in a little pop-up bubble.

### Component & Logic Organization

Same deal as above - would normally love to go into much more detail and make components more reusable and customizable, but in the interest of time had to cut some corners. I am proud to declare that no component I wrote is bigger than 200 lines (okay maybe 229 lines in `service/ServiceCatalog.vue`). I tried to take advantage of composition API as much as possible and break down long components by moving code into separate composables. I would be even more proud if I managed to make that logic more abstract in order to make it reusable in other parts of application, but again - didn’t want to code through the nights to achieve that. And of course I tried to comment my code in hard to understand places.

### Typescript

Overall I tried to take advantage of type checking as much as possible (better safe then sorry, like I am when it throws some `cannot access property of undefined` error on me, God forbid in prod). I did make some props optional here and there to avoid over-restricting the API. I made sure to run `yarn typecheck` every now and then to make sure the build command will go through, if needed.

### Tests

Would love to have written more of those, but only added two more component tests.

### Store

Simple store setup with login method and state persistence. At the beginning I wanted to implement the logout action to handle the non-authenticated view, but then realized that’s a little bit outside of scope.

### Dependancies

I tried not to add a ton of new packages. The less dependancies javascript project has - the better. When I had to introduce a new package I tried to make sure it’s stable, reliable, efficient in size, well mentioned and well documented (ya, a unicorn).

### Outro

Hopefully this wasn’t too much read for you. Thank you if you came this far! I was trying to demonstrate that I actually like writing documentation (my very first freelance job was copywriting, way back in high school - so I like to write sometimes). Have a great day!
