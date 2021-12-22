import { ContainerDeps } from "./container";

export function program({ logger, cStuff }: Pick<ContainerDeps, 'logger' | 'cStuff'>) {
  return (message: string) => {
    logger(`message from program: ${message} + ${cStuff.getValue()}`);
  }
}