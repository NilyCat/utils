import { date } from '../src/date'

describe('date', () => {
  test('parse seconds', () => {
    expect(date.seconds(null as any)).toBe(undefined)
    expect(date.seconds('5s')).toBe(5)
    expect(date.seconds('5sec')).toBe(5)
    expect(date.seconds('5secs')).toBe(5)
    expect(date.seconds('5second')).toBe(5)
    expect(date.seconds('5seconds')).toBe(5)

    expect(date.seconds('5m')).toBe(5 * 60)
    expect(date.seconds('5min')).toBe(5 * 60)
    expect(date.seconds('5mins')).toBe(5 * 60)
    expect(date.seconds('5minute')).toBe(5 * 60)
    expect(date.seconds('5minutes')).toBe(5 * 60)

    expect(date.seconds('5h')).toBe(5 * 60 * 60)
    expect(date.seconds('5hr')).toBe(5 * 60 * 60)
    expect(date.seconds('5hrs')).toBe(5 * 60 * 60)
    expect(date.seconds('5hour')).toBe(5 * 60 * 60)
    expect(date.seconds('5hours')).toBe(5 * 60 * 60)

    expect(date.seconds('1d')).toBe(86_400)
    expect(date.seconds('1day')).toBe(86_400)
    expect(date.seconds('1days')).toBe(86_400)

    expect(date.seconds('5w')).toBe(5 * 7 * 86_400)
    expect(date.seconds('5week')).toBe(5 * 7 * 86_400)
    expect(date.seconds('5weeks')).toBe(5 * 7 * 86_400)

    expect(date.seconds('5y')).toBe(5 * 365 * 86_400)
    expect(date.seconds('5yr')).toBe(5 * 365 * 86_400)
    expect(date.seconds('5yrs')).toBe(5 * 365 * 86_400)
    expect(date.seconds('5year')).toBe(5 * 365 * 86_400)
    expect(date.seconds('5years')).toBe(5 * 365 * 86_400)

    expect(date.seconds('y5')).toBe(undefined)
    expect(date.seconds('5-d')).toBe(undefined)
    expect(date.seconds('5dy')).toBe(undefined)
    expect(date.seconds('m5d')).toBe(undefined)
    expect(date.seconds('5_000s')).toBe(undefined)
  })

  test('format seconds', () => {
    expect(date.formatSeconds(null as any)).toBe(undefined)
    expect(date.formatSeconds(5)).toBe('5 seconds')
    expect(date.formatSeconds(5 * 60)).toBe('5 minutes')
    expect(date.formatSeconds(5 * 60 * 60)).toBe('5 hours')
    expect(date.formatSeconds(86_400)).toBe('1 day')
    expect(date.formatSeconds(3 * 86_400)).toBe('3 days')
  })

  test('milliseconds', () => {
    expect(date.milliseconds('5s')).toBe(5_000)
  })

  test('timestamp', () => {
    const now = Math.floor(Date.now() / 1e3)
    expect(Math.abs(now - date.timestamp()) < 1).toBe(true)
  })
})
