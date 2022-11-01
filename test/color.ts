import { Color, isRgbaColor, isRgbColor } from '../src/color'

describe('color', () => {
  test('#800080 to rgba', () => {
    expect(Color('#80008080').arrays()).toStrictEqual([128, 0, 128, 0.5])
  })

  test('#fff to rgba', () => {
    expect(Color('#fff').arrays()).toStrictEqual([255, 255, 255, 1])
  })

  test('rgb(255, 255, 153) is rgb color', () => {
    expect(isRgbColor('rgb(255, 255, 153)')).toBe(true)
  })

  test('rgba(255, 255, 255, 0.5) is rgba color', () => {
    expect(isRgbaColor('rgba(255, 255, 255, 0.5)')).toBe(true)
  })

  test('rgb(255, 255, 153) to hex', () => {
    expect(Color.rgb(255, 255, 153).hex()).toBe('#ffff99')
  })

  test('rgba(255, 255, 255, 0.5) to hex', () => {
    expect(Color('rgba(255, 255, 255, 0.5)').hex()).toBe('#ffffff80')
  })

  test('rgba(255, 255, 255, 0.5) to hex', () => {
    expect(Color.rgba(255, 255, 255, 0.5).hex()).toBe('#ffffff80')
  })

  test('rgba(500, 255, 255, 0.5) to hex', () => {
    expect(Color.rgba(500, 255, 255, 0.5).hex()).toBe('#ffffff80')
  })

  test('rgba(-100, 0, 0, -0.5) to hex', () => {
    expect(Color.rgba(-100, 0, 0, -0.5).hex()).toBe('#0000000')
  })

  test('rgb(17, 17, 123) to hex', () => {
    expect(Color('rgb(17, 17, 123)').hex()).toStrictEqual('#11117b')
  })

  test('transparent #fff', () => {
    expect(Color('#fff').alpha(0.5)).toBe('rgba(255, 255, 255, 0.5)')
  })

  test('transparent #000', () => {
    expect(Color('#000').alpha(0.1)).toBe('rgba(0, 0, 0, 0.1)')
  })

  test('transparent #EB5757', () => {
    expect(Color('#EB5757').alpha(0.1)).toBe('rgba(235, 87, 87, 0.1)')
  })

  test('lighten #000', () => {
    expect(Color('#000').lighten(0.1)).toBe('#1a1a1a')
  })

  test('darken #106bf3', () => {
    expect(Color('#106bf3').darken(0.1)).toBe('#0e60da')
  })

  test('darken #999', () => {
    expect(Color('#999').darken(0.5)).toBe('#4d4d4d')
  })

  test('#000 is dark color', () => {
    expect(Color('#000').isDark()).toBe(true)
  })

  test('#106bf3 is dark color', () => {
    expect(Color('#106bf3').isDark()).toBe(true)
  })

  test('#000000F7 is dark color', () => {
    expect(Color('#000000F7').isDark()).toBe(true)
  })

  test('#ffff99 is light color', () => {
    expect(Color('#ffff99').isLight()).toBe(true)
  })

  test('#fff is light color', () => {
    expect(Color('#fff').isLight()).toBe(true)
  })

  test('invert #000 to #ffffff', () => {
    expect(Color('#000').invert()).toBe('#ffffff')
  })

  test('invert #ffff99 to #000066', () => {
    expect(Color('#ffff99').invert()).toBe('#000066')
  })

  test('invert #106bf3 to #ef940c', () => {
    expect(Color('#106bf3').invert()).toBe('#ef940c')
  })

  test('invert #fff to #000000', () => {
    expect(Color('#fff').invert()).toBe('#000000')
  })
})
