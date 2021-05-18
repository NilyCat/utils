import { AnyMap } from '../src/interface'
import { copy, deepClone, deepExtend, extend, pick } from '../src/object'
import { hasOwnProp } from '../src/validate'

const obj = {
  a: 1,
  b: [2, 3],
  c: {
    x: 'x',
    y: 'y'
  },
  d: true
}
const obj2 = {
  a: null,
  b: [2, 3],
  c: {
    x: 'x',
    y: 'y'
  },
  d: false
}
const obj3 = {
  a: 1,
  b: [2, 3],
  c: {
    x: 'o',
    y: 'l'
  },
  d: false
}
const obj4 = {
  a: 100,
  b: ['o', 'l'],
  c: {
    x: 'x',
    y: 'y'
  },
  d: true,
  f: ['i', 'h'],
  g: {
    o: 'p'
  }
}

describe('object', () => {
  test('null does not have own prop', () => {
    expect(hasOwnProp(null, 'x')).toBe(false)
  })

  test('cant clone null', () => {
    expect(deepClone(null)).toBe(null)
  })

  test('cant clone undefined', () => {
    expect(deepClone(undefined)).toBe(undefined)
  })

  test('deep clone', () => {
    const cloned = deepClone(obj)
    const target = JSON.parse(JSON.stringify(obj))

    expect(cloned === obj).toBe(false)
    expect(cloned.b === obj.b).toBe(false)
    expect(cloned.c === obj.c).toBe(false)
    expect(cloned).toStrictEqual(target)
  })

  test('extend', () => {
    const cloned = deepClone(obj)
    const value = extend(cloned, {
      // @ts-ignore
      a: null,
      d: false
    })
    expect(value.c === cloned.c).toBe(true)
    expect(value).toStrictEqual(obj2)
  })

  test('cant deep extend array', () => {
    expect(deepExtend([])).toStrictEqual([])
  })

  test('cant deep extend number', () => {
    expect(deepExtend(5 as any)).toBe(5)
  })

  test('deep extend object', () => {
    const cloned = deepClone(obj)
    const value = deepExtend(cloned, {
      // @ts-ignore
      a: null,
      c: obj3.c,
      d: false
    })
    expect(obj3.c === value.c).toBe(false)
    expect(value).toStrictEqual(obj3)
  })

  test('deep extend array', () => {
    const cloned = deepClone(obj)
    const value = deepExtend(cloned, {
      a: 100,
      // @ts-ignore
      b: obj4.b,
      f: ['i', 'h'],
      g: {
        o: 'p'
      }
    })
    // @ts-ignore
    expect(obj4.b === value.b).toBe(false)
    expect(value).toStrictEqual(obj4)
  })

  test('shallow pick', () => {
    const picked = pick(obj, ['b', 'c', 'd'])
    expect(picked.b === obj.b).toBe(true)
    expect(picked.c === obj.c).toBe(true)
    expect(picked.d).toBe(true)
  })

  test('deep pick', () => {
    const picked = pick(obj, ['b', ['c', 'g.k'], 'd'], {
      deepClone: true
    })
    expect(picked.b === obj.b).toBe(false)
    // @ts-ignore
    expect(picked.g.k === obj.c).toBe(false)
    expect(picked.b).toStrictEqual(obj.b)
    // @ts-ignore
    expect(picked.g.k).toStrictEqual(obj.c)
    expect(picked.d).toBe(true)
  })

  test('pick without nil value', () => {
    const picked = pick(obj2, ['a', ['d', 'd.d']], {
      ignoreNil: true
    })
    expect(picked).toStrictEqual({
      d: {
        d: false
      }
    })
  })

  test('pick non-object', () => {
    expect(pick([] as any, ['a'])).toStrictEqual({})
  })

  test('copy object', () => {
    const to: AnyMap = {}

    copy(obj2, to, ['a', 'c', ['d', 'd.d']], {
      ignoreNil: true,
      deepClone: false
    })
    expect(to).toStrictEqual({
      c: {
        x: 'x',
        y: 'y'
      },
      d: {
        d: false
      }
    })
    expect(obj2.c === to.c).toBe(true)
  })

  test('deep copy object', () => {
    const to: AnyMap = {}
    copy(obj2, to, ['a', 'c', ['d', 'd.d']], {
      deepClone: true
    })
    expect(to.a).toBe(undefined)
    // @ts-ignore
    expect(to.d.d).toBe(false)
    expect(obj2.c === to.c).toBe(false)
  })

  test('copy non-object', () => {
    expect(copy([] as any, {}, ['a'])).toStrictEqual(undefined)
  })
})
