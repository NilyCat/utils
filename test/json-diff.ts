import { AnyArray, AnyMap } from '../src/interface'
import { compare, Operation, patch } from '../src/json-diff'

const objectA: AnyMap = {
  name: {
    firstName: 'Jack',
    lastName: 'Sparrow'
  },
  luckyNumbers: [[1, 11, 17], 0],
  age: 20
}

const objectB: AnyMap = {
  name: {
    firstName: 'Burt',
    lastName: 'Lancaster'
  },
  navy: true,
  luckyNumbers: [[33, 44, 55, 66], 0]
}

const objectDiff: Operation[] = [
  {
    op: 'replace',
    path: 'name.firstName',
    value: 'Burt'
  },
  {
    op: 'replace',
    path: 'name.lastName',
    value: 'Lancaster'
  },
  {
    op: 'replace',
    path: 'luckyNumbers.0.0',
    value: 33
  },
  {
    op: 'replace',
    path: 'luckyNumbers.0.1',
    value: 44
  },
  {
    op: 'replace',
    path: 'luckyNumbers.0.2',
    value: 55
  },
  {
    op: 'add',
    path: 'luckyNumbers.0.3',
    value: 66
  },
  {
    op: 'remove',
    path: 'age'
  },
  {
    op: 'add',
    path: 'navy',
    value: true
  }
]

const arrayA: AnyArray = [
  {
    name: {
      firstName: 'Jack',
      lastName: 'Sparrow'
    },
    luckyNumbers: [1, 11, 17],
    age: 20
  },
  1
]

const arrayB: AnyArray = [
  {
    name: {
      firstName: 'Burt',
      'maybe.lastName': 'Lancaster'
    },
    navy: true,
    luckyNumbers: null
  },
  0
]

const arrayDiff: Operation[] = [
  {
    op: 'replace',
    path: '0.name.firstName',
    value: 'Burt'
  },
  {
    op: 'remove',
    path: '0.name.lastName'
  },
  {
    op: 'add',
    path: '0.name.maybe#lastName',
    value: 'Lancaster'
  },
  {
    op: 'replace',
    path: '0.luckyNumbers',
    value: null
  },
  {
    op: 'remove',
    path: '0.age'
  },
  {
    op: 'add',
    path: '0.navy',
    value: true
  },
  {
    op: 'replace',
    path: '1',
    value: 0
  }
]

describe('json diff', () => {
  test('compare same object', () => {
    expect(compare(objectA, objectA)).toStrictEqual([])
  })

  test('compare objects', () => {
    expect(compare(objectA, objectB)).toStrictEqual(objectDiff)
  })

  test('compare object with array', () => {
    expect(compare({ x: [] }, [])).toStrictEqual([
      {
        op: 'replace',
        path: '',
        value: []
      }
    ])
  })

  test('compare arrays', () => {
    expect(compare(arrayA, arrayB)).toStrictEqual(arrayDiff)
  })

  test('patch object', () => {
    expect(patch(objectA, objectDiff)).toStrictEqual(objectB)
  })

  test('patch array', () => {
    expect(patch(arrayA, arrayDiff)).toStrictEqual(arrayB)
  })

  test('patch non-object', () => {
    expect(patch(1 as any, [])).toStrictEqual(1)
  })
})
