import { isEmpty, isFloat } from './validate'

const BYTE_MAP = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
}
const BYTE_REGX = /^(-?(?:\d+)?\.?\d+)(b|kb|mb|gb|tb|pb)$/i

function parse(value: string): number | undefined {
  if (isEmpty(value)) {
    return
  }

  const str = String(value)
  const matches = str.match(BYTE_REGX)

  if (!matches) {
    return
  }

  const size = parseFloat(matches[1])
  const unit = matches[2].toLowerCase()

  switch (unit) {
    case 'pb':
      return size * BYTE_MAP.pb

    case 'tb':
      return size * BYTE_MAP.tb

    case 'gb':
      return size * BYTE_MAP.gb

    case 'mb':
      return size * BYTE_MAP.mb

    case 'kb':
      return size * BYTE_MAP.kb

    case 'b':
      return size * BYTE_MAP.b
  }
}

function stringify(bytes: number, fractionDigits = 1): string {
  let size = Math.abs(Number(bytes))
  let unit: string

  if (size >= BYTE_MAP.pb) {
    unit = 'PB'
    size = size / BYTE_MAP.pb
  } else if (size >= BYTE_MAP.tb) {
    unit = 'TB'
    size = size / BYTE_MAP.tb
  } else if (size >= BYTE_MAP.gb) {
    unit = 'GB'
    size = size / BYTE_MAP.gb
  } else if (size >= BYTE_MAP.mb) {
    unit = 'MB'
    size = size / BYTE_MAP.mb
  } else if (size >= BYTE_MAP.kb) {
    unit = 'KB'
    size = size / BYTE_MAP.kb
  } else {
    unit = 'B'
    size = size / BYTE_MAP.b
  }

  if (isFloat(size)) {
    return size.toFixed(fractionDigits) + unit
  }

  return size + unit
}

export const bytes = {
  parse,
  stringify
}
