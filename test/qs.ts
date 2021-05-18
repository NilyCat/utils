import { qs } from '../src/qs'

const obj = {
  a: [1, 2, 3],
  b: 'hello',
  c: true,
  d: undefined,
  e: 'https://example.com'
}
const str = 'a=1|2|3&b=hello&c=true&d=&e=https%3A%2F%2Fexample.com'
const str2 = 'a[]=1&a[]=2&a[]=3&b=hello&c=true&d=&e=https%3A%2F%2Fexample.com'

describe('qs parse', () => {
  test('plain arrays', () => {
    expect(
      qs.parse(str, {
        plainArrays: true,
        plainSeparator: '|'
      })
    ).toStrictEqual({
      a: ['1', '2', '3'],
      b: 'hello',
      c: 'true',
      d: null,
      e: 'https://example.com'
    })
  })

  test('parse arrays', () => {
    expect(
      qs.parse(str2, {
        parseArrays: true
      })
    ).toStrictEqual({
      a: ['1', '2', '3'],
      b: 'hello',
      c: 'true',
      d: null,
      e: 'https://example.com'
    })
  })

  test('strict null handling', () => {
    expect(
      qs.parse(str, {
        strictNull: false
      })
    ).toStrictEqual({
      a: ['1', '2', '3'],
      b: 'hello',
      c: 'true',
      e: 'https://example.com'
    })
  })

  test('array', () => {
    expect(qs.parse([] as any)).toStrictEqual({})
  })

  test('empty string', () => {
    expect(qs.parse('')).toStrictEqual({})
  })
})

describe('qs stringify', () => {
  test('stringify object', () => {
    expect(qs.stringify(obj)).toBe(str2)
  })

  test('plain arrays', () => {
    expect(
      qs.stringify(obj, {
        plainArrays: true,
        plainSeparator: '|'
      })
    ).toBe(str)
  })
})
