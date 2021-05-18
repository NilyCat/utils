import { random } from '../src/random'

describe('random', () => {
  test('number', () => {
    const num = random.number(1, 10)
    expect(num >= 1).toBe(true)
    expect(num <= 10).toBe(true)
  })

  test('string', () => {
    expect(/^[0-4c-f]{6}$/i.test(random.string('01234cdef'))).toBe(true)
  })

  test('hexic', () => {
    expect(/^[0-9a-f]{6}$/i.test(random.hexic(6))).toBe(true)
  })

  test('alpha', () => {
    expect(/^[a-z]{6}$/i.test(random.alpha(6))).toBe(true)
  })

  test('numeric', () => {
    expect(/^[0-9]{6}$/i.test(random.numeric(6))).toBe(true)
  })

  test('alpha numeric', () => {
    expect(/^[0-9a-z]{6}$/i.test(random.alphaNumeric(6))).toBe(true)
  })
})
