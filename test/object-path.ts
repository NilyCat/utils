import { objectPath } from '../src/object-path'

const obj = {
  b: {
    a: [2, 3],
    u: {
      v: true,
      w: {
        p: 10
      }
    },
    x: 'x',
    y: 'y',
    z: null
  }
}

describe('object path', () => {
  test('invalid object', () => {
    expect(objectPath.get(1, 'a')).toBe(undefined)
  })

  test('invalid path', () => {
    expect(objectPath.get(obj, [] as any)).toBe(undefined)
  })

  test('invalid path prototype', () => {
    expect(objectPath.get(obj, 'prototype')).toBe(undefined)
  })

  test('int', () => {
    expect(objectPath.get(obj, 'b.u.w.p')).toBe(10)
  })

  test('array', () => {
    expect(objectPath.get(obj, 'b.a')).toStrictEqual([2, 3])
  })

  test('bool', () => {
    expect(objectPath.get(obj, 'b.u.v')).toBe(true)
  })

  test('get undefined property', () => {
    expect(objectPath.get(obj, 'a')).toBe(undefined)
  })

  test('get undefined property width default value', () => {
    expect(objectPath.get(obj, 'j.k', 1)).toBe(1)
  })

  test('replace to array', () => {
    objectPath.set(obj, 'z.0.0', [2, 3])
    expect(objectPath.get(obj, 'z.0.0')).toStrictEqual([2, 3])
  })

  test('set invalid object', () => {
    expect(objectPath.set(1, 'a', 0)).toBe(1)
  })

  test('set to int', () => {
    objectPath.set(obj, 'b.u.w.p', 100)
    expect(objectPath.get(obj, 'b.u.w.p')).toBe(100)
  })

  test('set to array', () => {
    objectPath.set(obj, 'b.a.0', 88)
    expect(objectPath.get(obj, 'b.a.0')).toStrictEqual(88)
  })

  test('set undefined property', () => {
    objectPath.set(obj, 'a.y.a', 10)
    expect(objectPath.get(obj, 'a.y.a')).toBe(10)
  })

  test('has property', () => {
    expect(objectPath.has(obj, 'b.u.w.p')).toBe(true)
  })

  test('does not has property', () => {
    expect(objectPath.has(obj, 'nil.b')).toBe(false)
  })

  test('does not has property', () => {
    expect(
      objectPath.has(
        {
          nil: null
        },
        'nil.b'
      )
    ).toBe(false)
  })

  test('has invalid path prototype', () => {
    expect(objectPath.has(obj, 'prototype')).toBe(false)
  })

  test('does not has undefined property', () => {
    expect(objectPath.has(obj, 'b.a.3')).toBe(false)
  })

  test('invalid object has property', () => {
    expect(objectPath.has(1 as any, 'b.u.w.p')).toBe(false)
  })

  test('remove property', () => {
    objectPath.remove(obj, 'b.u.w')
    expect(obj.b.u.w).toBe(undefined)
  })

  test('remove undefined property', () => {
    expect(objectPath.remove(obj, 'b.a.3')).toBe(false)
  })

  test('remove invalid object', () => {
    expect(objectPath.remove(false, 'a')).toBe(false)
  })
})
