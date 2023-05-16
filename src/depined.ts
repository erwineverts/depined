export function depined() {
  return injector({})
}

function combine<T, K extends string, V>(container: T, name: K, value: V) {
  return { ...container, [name]: value } as T & { [k in K]: V }
}

function injector<T extends {}>(container: T): Depined<T> {
  return {
    async resolve() {
      const r = {} as { [K in keyof T]: Awaited<T[K]> }

      for (const key in container) {
        r[key] = await Promise.resolve(container[key])
      }

      return r
    },
    set<K extends string, V>(name: K, value: V) {
      return injector(combine(container, name, value))
    },
    inject<K extends string, V>(name: K, fn: (container: T) => V) {
      const value = fn(container)
      return injector(combine(container, name, value))
    },
    combine<T2 extends {}>(services: T2) {
      return injector({ ...container, ...services })
    }
  }
}

type Depined<T> = {
    set<K extends string, V>(name: K, value: V): Depined<T & { [k in K]: V }>
    inject<K extends string, V>(name: K, fn: (container: T) => V): Depined<T & { [k in K]: V }>
    resolve: () => Promise<{ [K in keyof T]: Awaited<T[K]> }>
    combine<T2 extends {}>(services: T2): Depined<T & T2>;
}
