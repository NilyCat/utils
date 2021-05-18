import { isString } from './validate'

const HEX_COLOR_REGEX = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i
const INT_COLOR_REGEX = '[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]'
const RGB_COLOR_REGEX = new RegExp(
  `^rgb\\((${INT_COLOR_REGEX}+)\\s*,\\s*(${INT_COLOR_REGEX}+)\\s*,\\s*(${INT_COLOR_REGEX}+)\\s*\\)$`,
  'i'
)
const RGBA_COLOR_REGEX = new RegExp(
  `^rgba\\((${INT_COLOR_REGEX}+)\\s*,\\s*(${INT_COLOR_REGEX}+)\\s*,\\s*(${INT_COLOR_REGEX}+)\\s*,\\s*((0\\.\\d+|1)+)\\s*\\)$`,
  'i'
)
const MIN_COLOR_VALUE = 0x00
const MAX_COLOR_VALUE = 0xff
const WHITE_COLOR = '#fff'
const BLACK_COLOR = '#000'

export function isHexColor(value: string): boolean {
  return isString(value) && HEX_COLOR_REGEX.test(value)
}

export function isRgbColor(value: string): boolean {
  return isString(value) && RGB_COLOR_REGEX.test(value)
}

export function isRgbaColor(value: string): boolean {
  return isString(value) && RGBA_COLOR_REGEX.test(value)
}

class ColorConstructor {
  private r = 0
  private g = 0
  private b = 0
  private a = 1

  public static from(value: string): ColorConstructor {
    const c = new ColorConstructor()

    if (isHexColor(value)) {
      c._initHex(value)
    } else {
      let matches = value.match(RGB_COLOR_REGEX)

      if (matches) {
        c._initRgba(Number(matches[1]), Number(matches[2]), Number(matches[3]))
      } else {
        matches = value.match(RGBA_COLOR_REGEX)

        if (matches) {
          c._initRgba(
            Number(matches[1]),
            Number(matches[2]),
            Number(matches[3]),
            Number(matches[4])
          )
        }
      }
    }

    return c
  }

  public hex(): string {
    return ColorConstructor._rgba2Hex(this.r, this.g, this.b, this.a)
  }

  public arrays(): number[] {
    return [this.r, this.g, this.b, this.a]
  }

  public alpha(alpha: number): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`
  }

  public lighten(alpha: number): string {
    return this.multiply(WHITE_COLOR, 1 - alpha)
  }

  public darken(alpha: number): string {
    return this.multiply(BLACK_COLOR, 1 - alpha)
  }

  public isDark(): boolean {
    return this.brightness() < 170
  }

  public isLight(): boolean {
    return !this.isDark()
  }

  public brightness(): number {
    return (this.a * (this.r * 299 + this.g * 587 + this.b * 114)) / 1000
  }

  public invert(): string {
    return ColorConstructor._rgba2Hex(
      MAX_COLOR_VALUE - this.r,
      MAX_COLOR_VALUE - this.g,
      MAX_COLOR_VALUE - this.b,
      this.a
    )
  }

  public multiply(background: string, alpha: number): string {
    const bg = ColorConstructor.from(background)
    const r = ColorConstructor._multiply(this.r, bg.r, alpha)
    const g = ColorConstructor._multiply(this.g, bg.g, alpha)
    const b = ColorConstructor._multiply(this.b, bg.b, alpha)
    return ColorConstructor._rgba2Hex(r, g, b, 1)
  }

  public static rgb(r: number, g: number, b: number): ColorConstructor {
    const c = new ColorConstructor()
    c._initRgba(r, g, b)
    return c
  }

  public static rgba(
    r: number,
    g: number,
    b: number,
    a: number
  ): ColorConstructor {
    const c = new ColorConstructor()
    c._initRgba(r, g, b, a)
    return c
  }

  private _initHex(value: string) {
    value = value.replace(/^#/, '')

    if (value.length === 3) {
      value = value[0].repeat(2) + value[1].repeat(2) + value[2].repeat(2)
    }

    let alpha = 1
    if (value.length === 8) {
      alpha = ColorConstructor._alphaHex2Float(value.slice(6, 8))
      value = value.slice(0, 6)
    }

    const i = Number.parseInt(value, 16)
    this._initRgba(i >> 16, (i >> 8) & 255, i & 255, alpha)
  }

  private _initRgba(r: number, g: number, b: number, a = 1): void {
    this.r = ColorConstructor._colorLimit(r)
    this.g = ColorConstructor._colorLimit(g)
    this.b = ColorConstructor._colorLimit(b)
    this.a = ColorConstructor._alphaLimit(a)
  }

  private static _rgba2Hex(r: number, g: number, b: number, a: number): string {
    let v = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

    if (a < 1 && a >= 0) {
      v += Math.ceil(a * MAX_COLOR_VALUE).toString(16)
    }

    return '#' + v
  }

  private static _multiply(fore: number, back: number, alpha: number): number {
    fore = ColorConstructor._colorLimit(fore) || 1
    back = ColorConstructor._colorLimit(back) || 1
    return Math.floor(fore * alpha + back * (1 - alpha))
  }

  private static _colorLimit(num: number): number {
    return num < MIN_COLOR_VALUE
      ? MIN_COLOR_VALUE
      : num > MAX_COLOR_VALUE
      ? MAX_COLOR_VALUE
      : num
  }

  private static _alphaLimit(num: number): number {
    return num < 0 ? 0 : num >= 1 ? 1 : num
  }

  private static _alphaHex2Float(hex: string): number {
    const num = parseInt(hex, 16)
    return Number((num / MAX_COLOR_VALUE).toFixed(2))
  }
}

export function Color(value: string): ColorConstructor {
  return ColorConstructor.from(value)
}

Color.rgb = ColorConstructor.rgb
Color.rgba = ColorConstructor.rgba
