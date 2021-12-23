import depined from "depined";

interface ILogger {
  info(msg: string): void,
  error(err: Error): void,
}

class ConsoleLogger implements ILogger {
  info(msg: string): void {
    console.log(msg)
  }
  error(err: Error): void {
    console.error(err)
  }
}

class Program {
  constructor(private readonly logger: ILogger) { }

  run() {
    this.logger.info('Started program')
  }
}

type Dependencies = {
  logger: ILogger,
  program: Program,
}

const container = depined<Dependencies>({
  logger: () => new ConsoleLogger(),
  program: ({ logger }) => new Program(logger),
});

container.program.run();