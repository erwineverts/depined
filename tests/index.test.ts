import depined from '../src/index'
import { depined as dep } from '../src/index'

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
