[![npm version](https://img.shields.io/npm/v/depined.svg)](https://www.npmjs.com/package/depined)
[![Downloads](https://img.shields.io/npm/dm/depined.svg)](https://www.npmjs.com/package/depined)
[![Size](https://img.shields.io/bundlephobia/min/depined)](https://www.npmjs.com/package/depined)

# Depined

Depined is a dependency injection tool for JavaScript and TypeScript. It is a lightweight solution with full typing support.

- Awesome testability
- Works great for JavaScript
- Works even better for TypeScript without (beta) annotation and type casting
- Only needed dependencies are being build
- Works with interfaces, classes, functions and constants
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

### Class based

```typescript
import depined from "depined";

interface ILogger {
  info(msg: string): void;
  error(err: Error): void;
}

class ConsoleLogger implements ILogger {
  info(msg: string): void {
    console.log(msg);
  }
  error(err: Error): void {
    console.error(err);
  }
}

class Program {
  constructor(private readonly logger: ILogger) {}

  run() {
    this.logger.info("Started program");
  }
}

type Dependencies = {
  logger: ILogger;
  program: Program;
};

const container = depined<Dependencies>({
  logger: () => new ConsoleLogger(),
  program: ({ logger }) => new Program(logger),
});

container.program.run();
```

### Function based

```Typescript
import depined from "../injector";

function programBuilder({ log }: Pick<Dependencies, 'log'>) {
  return function program() {
    log('program started')
  }
}

type Context = { env: () => 'prod' | 'test' | 'dev' }
function contextBuilder(): Context {
  return {
    env() {
      return 'prod'
    }
  }
}

function logBuilder({ context }: Pick<Dependencies, 'context'>) {
  const env = context.env();

  return (msg: string) => console.log(`[${env}] ${msg}`)
}

type Dependencies = {
  log: typeof console.log,
  program: ReturnType<typeof programBuilder>,
  context: Context,
}

const container = depined<Dependencies>({
  log: logBuilder,
  context: contextBuilder,
  program: programBuilder,
});

container.program(); // [prod] program started
```

## Using it for testing

Using example above

```typescript
test("program", () => {
  const log = jest.fn();
  const program = programBuilder({ log });

  program();

  expect(log).toBeCalledWith("program started");
});
```

## Test driven development

1. Create a test for your function
2. Develop the function
3. Add types for your dependencies as you need them
4. Implement the dependencies starting at 1.
