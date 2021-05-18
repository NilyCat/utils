import { conv } from './conv'
import { isEmpty } from './validate'

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const YEAR = DAY * 365
const REGX = /^(-?(?:\d+)?\.?\d+)(s|m|h|d|w|y)$/i

function timestamp(): number {
  return Math.floor(Date.now() / 1e3)
}

function toSeconds(value: string): number | undefined {
  if (isEmpty(value)) {
    return
  }

  const matches = value.match(REGX)

  if (!matches) {
    return
  }

  const n = conv.float(matches[1])!
  const type = matches[2].toLowerCase()
  let s

  switch (type) {
    case 'y':
      s = n * YEAR
      break

    case 'w':
      s = n * WEEK
      break

    case 'd':
      s = n * DAY
      break

    case 'h':
      s = n * HOUR
      break

    case 'm':
      s = n * MINUTE
      break

    case 's':
      s = n * SECOND
      break
  }

  if (s) {
    return Math.floor(s)
  }
}

function toMilliseconds(value: string): number | undefined {
  const s = toSeconds(value)

  if (s) {
    return s * 1_000
  }
}

export const date = {
  timestamp,
  seconds: toSeconds,
  milliseconds: toMilliseconds
}
