import depined from "../injector";

export function programBuilder({ log }: Pick<Dependencies, 'log'>) {
  return function program() {
    log('program started')
  }
}

export type Context = { env: () => 'prod' | 'test' | 'dev' }
function contextBuilder(): Context {
  return {
    env() {
      return 'prod'
    }
  }
}

export function logBuilder({ context }: Pick<Dependencies, 'context'>) {
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