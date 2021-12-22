import { injector } from "./../injector";


import { ClassStuff } from "./ClassStuff";
import { program } from "./program";


export type ContainerDeps = {
  program: ReturnType<typeof program>,
  logger: (msg: string) => void,
  cStuff: ClassStuff,
}

export const container = injector<ContainerDeps>({
  program: program,
  logger: () => console.log,
  cStuff: () => new ClassStuff(9),
})