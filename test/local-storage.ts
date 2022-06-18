import { localStorage } from '../src/local-storage'

describe('localStorage', () => {
  test('string value', () => {
    localStorage.setItem('key1', 'value1')

    expect(localStorage.getItem('key1')).toBe('value1')
  })

  test('number value', () => {
    localStorage.setItem('key2', 100)

    expect(localStorage.getItem('key2')).toBe(100)
  })

  test('boolean value', () => {
    localStorage.setItem('key3', true)

    expect(localStorage.getItem('key3')).toBe(true)
  })

  test('object value', () => {
    localStorage.setItem('key4', { x: 1 })

    expect(localStorage.getItem('key4')).toStrictEqual({ x: 1 })
  })

  test('array value', () => {
    localStorage.setItem('key5', [1])

    expect(localStorage.getItem('key5')).toStrictEqual([1])
  })

  test('get keys', () => {
    expect(localStorage.keys()).toStrictEqual(['key1', 'key2', 'key3', 'key4', 'key5'])
  })

  test('set with undefiend value', () => {
    localStorage.setItem('key6', undefined)

    expect(localStorage.getItem('key6')).toBe(undefined)
  })

  test('clear keys', () => {
    localStorage.clear()
    expect(localStorage.length()).toBe(0)
  })
})