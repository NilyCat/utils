import { date } from '../src/date'

describe('date', () => {
  test('parse seconds', () => {
    expect(date.seconds(null as any)).toBe(undefined)
    expect(date.seconds('5s')).toBe(5)
    expect(date.seconds('5m')).toBe(5 * 60)
    expect(date.seconds('5h')).toBe(5 * 60 * 60)
    expect(date.seconds('1d')).toBe(86_400)
    expect(date.seconds('5w')).toBe(5 * 7 * 86_400)
    expect(date.seconds('5y')).toBe(5 * 365 * 86_400)
    expect(date.seconds('y5')).toBe(undefined)
    expect(date.seconds('5-d')).toBe(undefined)
    expect(date.seconds('5dy')).toBe(undefined)
    expect(date.seconds('m5d')).toBe(undefined)
    expect(date.seconds('5_000s')).toBe(undefined)
  })

  test('milliseconds', () => {
    expect(date.milliseconds('5s')).toBe(5_000)
  })

  test('timestamp', () => {
    const now = Math.floor(Date.now() / 1e3)
    expect(Math.abs(now - date.timestamp()) < 1).toBe(true)
  })
})
