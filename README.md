[![npm version](https://img.shields.io/npm/v/depined.svg)](https://www.npmjs.com/package/depined)
[![Downloads](https://img.shields.io/npm/dm/depined.svg)](https://www.npmjs.com/package/depined)
[![Size](https://img.shields.io/bundlephobia/min/depined)](https://www.npmjs.com/package/depined)

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

Check out the unit tests: tests/depined.test.ts

## Test driven development

1. Create a test for your function
2. Develop the function
3. Add types for your dependencies as you need them
4. Implement the dependencies starting at 1.
