[![npm version](https://img.shields.io/npm/v/depined.svg)](https://www.npmjs.com/package/depined)
[![Downloads](https://img.shields.io/npm/dm/depined.svg)](https://www.npmjs.com/package/depined)
[![Size](https://img.shields.io/bundlephobia/min/depined)](https://www.npmjs.com/package/depined)
[![depined](https://snyk.io//advisor/npm-package/depined/badge.svg)](https://snyk.io//advisor/npm-package/depined)

# Depined

Depined is a dependency injection tool for JavaScript and TypeScript. It is a lightweight solution with full typing support.

- Awesome testability
- Works great for JavaScript
- Works even better for TypeScript without (beta) annotation and type casting
- Only needed dependencies are being build
- Works with interfaces, classes, functions, promises and constants
- Get typescript errors if the dependencies change without accidentally calling some io as with mocking

## Installation

```bash
npm install depined
```

or

```bash
yarn add depined
```

## Usage

The general idea is to write functions or classes without having strongly coupled dependencies (except for the interfaces). For example, make sure all dependencies are made available via parameters or the constructor.

Here are some code examples:

```ts

// Start by making a container

const container = depined()

// This container is empty and will always be empty because injecting stuff creates a new container, it never changes the current one.

// The main way to use Depined is to call the inject function. it needs 2 arguments, first is the token (should always be unique, second is the actual generator for the function or class)

const filledContainer = container.inject('logger', () => console.log)

// We can use everying in the container to initialize the next function/class

const containerWithClass = filledContainer.inject('class', ({logger}) => new ClassThatNeedsALogger(logger))

// When everying is injected, call the resolve and use it.

const di = await container.resolve()

// di.class is the initialized ClassThatNeedsALogger

```

### Example container module
```ts
const container = await depined()
  .inject('logger', () => console.log)
  .inject('class', ({logger}) => new ClassThatNeedsALogger(logger))
  .resolve()
```

### Constant / Non dependant injections
```ts
const container = await depined()
      .set('config', 'secret')
      .inject('dep', ({ config }) => `hello ${config}`)
      .resolve()

container.dep // 'hello secret'
```

### Async factories
```ts
const container = await depined()
  .inject('dbConfig', async () => {
    const secret = await getSecret();
    return secret.connectionString;
  })
  .inject('dbConnection', async ({dbConfig}) => new Connection(await dbConfig))
  .resolve()

container.dbConnection // Connection class with the async configuration
```

### Combining 2 containers
```ts
const configDi = depined()
  .set('config', 'secret')

const main = await depined()
  .combine(await configDi.resolve())
  .inject('connect', ({ config }) => `connect with config: "${config}"`)
  .resolve()

main.connect // 'connect with config: "secret"'
```

Check out the unit tests: tests/depined.test.ts

## Test driven development

1. Create a test for your function
2. Develop the function
3. Add types for your dependencies as you need them
4. Implement the dependencies starting at 1.
