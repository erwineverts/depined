type Gen<T> = {
  [P in keyof T]: (deps: T) => T[P]
}

export function injector<T extends object>(builder: Gen<T>) {
  const container: T = {} as T;
  const loading: { [P in keyof T]?: boolean | undefined } = {}

  const proxyHandler: ProxyHandler<T> = {
    get(target: T, p: string | symbol) {
      const service = p as keyof T;
      if (!target[service]) {
        if (loading[service]) throw new Error('circular dependency')
        loading[service] = true
        target[service] = builder[service](proxy);
      }
      return target[service]
    }
  }

  const proxy = new Proxy(container, proxyHandler);

  return proxy;
}

export default injector;
