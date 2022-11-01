import { conv } from '../src/conv'

describe('convert', () => {
  test('bool', () => {
    expect(conv.bool(null)).toBe(false)
    expect(conv.bool(null, true)).toBe(true)
    expect(conv.bool(1)).toBe(true)
    expect(conv.bool('1')).toBe(true)
    expect(conv.bool(true)).toBe(true)
    expect(conv.bool(0)).toBe(false)
    expect(conv.bool('0')).toBe(false)
    expect(conv.bool(false)).toBe(false)
  })

  test('init', () => {
    expect(conv.int(4)).toBe(4)
    expect(conv.int('10')).toBe(10)
    expect(conv.int('10', 3, 5)).toBe(5)
    expect(conv.int('a', 3)).toBe(3)
  })

  test('float', () => {
    expect(conv.float('0.1')).toBe(0.1)
    expect(conv.float(3.14)).toBe(3.14)
    expect(conv.float('10.1', 3, 5)).toBe(5)
    expect(conv.float('a', 3)).toBe(3)
  })

  test('json', () => {
    const obj = {
      x: 'y',
      y: 1
    }

    expect(conv.json(null as any)).toBe(undefined)
    expect(conv.json('x=y', {})).toStrictEqual({})
    expect(conv.json(conv.jsonString(obj))).toStrictEqual(obj)
  })
})
