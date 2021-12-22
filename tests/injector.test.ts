import { injector } from "../src/injector"

describe('injector', () => {
  it("should infer the types from the builder", () => {
    const container = injector({ sayHelloTo: () => (name: string) => `Hello ${name}` });

    expect(container.sayHelloTo('world')).toBe('Hello world')
  })

  it("should only build service once", () => {
    let buildTimes = 0;
    const container = injector({
      service: () => {
        buildTimes++;
        return true;
      }
    });

    expect(container.service).toBe(true)
    expect(container.service).toBe(true)
    expect(buildTimes).toBe(1)
  })

  it("should throw on circular dependency", () => {
    type Services = {
      service: true
    }

    const container = injector<Services>({
      service: ({ service }: Pick<Services, 'service'>) => service || true
    });

    expect(() => container.service).toThrow('circular dependency');
  })

  it("should build services in order", () => {
    type Services = {
      serviceTrue: boolean,
      serviceInverse: boolean,
    }

    const log: string[] = [];

    const container = injector<Services>({
      serviceTrue: () => { log.push('serviceTrue'); return true },
      serviceInverse: ({ serviceTrue }: Pick<Services, 'serviceTrue'>) => {
        log.push('serviceInverse');
        return !serviceTrue;
      }
    });

    expect(container.serviceInverse).toBe(false)

    expect(log).toEqual(["serviceTrue", "serviceInverse"]);
  })

  it("should only build services that are needed", () => {
    type Services = {
      serviceTrue: boolean,
      serviceInverse: boolean,
    }

    const log: string[] = [];

    const container = injector<Services>({
      serviceTrue: () => { log.push('serviceTrue'); return true },
      serviceInverse: ({ serviceTrue }: Pick<Services, 'serviceTrue'>) => {
        log.push('serviceInverse');
        return !serviceTrue;
      }
    });

    expect(container.serviceTrue).toBe(true)
    expect(log).toEqual(["serviceTrue"]);
  })
})