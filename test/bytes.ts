import { bytes } from '../src/bytes'

describe('bytes', () => {
  test('1.5b', () => {
    expect(bytes.parse('1.5b')).toBe(1.5)
  })

  test('32kb', () => {
    expect(bytes.parse('32kb')).toBe(32_768)
  })

  test('1.5mb', () => {
    expect(bytes.parse('1.5mb')).toBe(1_572_864)
  })

  test('5gb', () => {
    expect(bytes.parse('5gb')).toBe(5_368_709_120)
  })

  test('5tb', () => {
    expect(bytes.parse('5tb')).toBe(5_497_558_138_880)
  })

  test('5pb', () => {
    expect(bytes.parse('5pb')).toBe(5_629_499_534_213_120)
  })

  test('blank string', () => {
    expect(bytes.parse('    ')).toBe(undefined)
  })

  test('invalid unit', () => {
    expect(bytes.parse('5y')).toBe(undefined)
  })

  test('invalid value', () => {
    expect(bytes.parse('five_days')).toBe(undefined)
  })
})

describe('pretty bytes', () => {
  test('1.5B', () => {
    expect(bytes.stringify(1.5)).toBe('1.5B')
  })

  test('32KB', () => {
    expect(bytes.stringify(32_768)).toBe('32KB')
  })

  test('1.5MB', () => {
    expect(bytes.stringify(1_572_864)).toBe('1.5MB')
  })

  test('5gb', () => {
    expect(bytes.stringify(5_368_709_120)).toBe('5GB')
  })

  test('5tb', () => {
    expect(bytes.stringify(5_497_558_138_880)).toBe('5TB')
  })

  test('5pb', () => {
    expect(bytes.stringify(5_629_499_534_213_120)).toBe('5PB')
  })
})
