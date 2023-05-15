import { depined } from '../src/depined'

describe('depined', () => {
    test('simple config', async () => {
        const container = await depined()
            .set('config', 'secret')
            .resolve();

        expect(container.config).toBe('secret')
    })

    test('two configs with seperate types', async () => {
        const container = await depined()
            .set('config', 'secret')
            .set('configInt', 5)
            .resolve()

        expect(container.config).toBe('secret')
        expect(container.configInt).toBe(5)
    })

    test('dependent injector', async () => {
        const container = await depined()
            .set('config', 'secret')
            .inject('dep', ({ config }) => `hello ${config}`)
            .resolve()

        expect(container.dep).toBe('hello secret')
    })

    test('simple promise injector', async () => {
        const container = await depined()
            .inject('dep', () => Promise.resolve('depined'))
            .resolve()

        expect(container.dep).toBe('depined')
    })

    test('dependent promise injector', async () => {
        const container = await depined()
            .inject('name', () => Promise.resolve('Henk'))
            .inject('greeting', async ({ name }) => `Hello ${await name}`)
            .resolve()

        expect(container.greeting).toBe('Hello Henk')
    })

    test('double promise injector', async () => {
        const container = await depined()
            .inject('greeter', () => async (name: string) => `Hello ${await name}`)
            .resolve()

        await expect(container.greeter('Henk')).resolves.toBe('Hello Henk')
    })

    test('class injector', async () => {

        class Person {
            constructor(public readonly name: string) { }
        }

        const container = await depined()
            .inject('name', () => Promise.resolve('Henk'))
            .inject('person', async ({ name }) => new Person(await name))
            .inject('greeter', () => (person: Person) => `Hello ${person.name}`)
            .resolve()

        expect(container.person.name).toBe('Henk')
        expect(container.greeter(container.person)).toBe('Hello Henk')
    })
})