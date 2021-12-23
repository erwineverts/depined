import { programBuilder, logBuilder, Context } from '../src/example/functionBuilder'

test('log', () => {
  const context: Context = {
    env: () => 'test'
  }
  const logger = logBuilder({ context })

  const consoleWarnMock = jest.spyOn(console, 'log').mockImplementation();

  logger('hello from inside test')

  expect(consoleWarnMock).toBeCalledWith('[test] hello from inside test')
  consoleWarnMock.mockRestore();
})

test('program', () => {
  const log = jest.fn();
  const program = programBuilder({ log })

  program()

  expect(log).toBeCalledWith('program started')
})