import depined from '../src/index'
import { injector, depined as dep } from '../src/index'

test('depined default export', async () => {
  const container = await depined()
    .set('config', 'secret')
    .resolve()

  expect(container.config).toBe('secret')
})

test('depined named export', async () => {
  const container = await dep()
    .set('config', 'secret')
    .resolve()

  expect(container.config).toBe('secret')
})

test('injector named export', async () => {
  const container = injector({ sayHelloTo: () => (name: string) => `Hello ${name}` })

  expect(container.sayHelloTo('world')).toBe('Hello world')
})
