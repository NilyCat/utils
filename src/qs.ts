import { deepExtend } from './object'
import { isArray, isEmpty, isObject, isString } from './validate'

interface SharedOptions {
  delimiter?: string
  plainSeparator?: string
  plainArrays?: boolean
  strictNull?: boolean
}

interface ParseOptions extends SharedOptions {
  decoder?: (text: string) => string
  parseArrays?: boolean
}

interface StringifyOptions extends SharedOptions {
  encoder?: (text: string) => string
}

const QUERY_PARSE_REGEX = /^([^?]+)?\?/
const PARSE_ARRAYS_REGEX = /\[(\d+)?]$/
const DEFAULT_SHARED_OPTIONS = {
  delimiter: '&',
  plainSeparator: ',',
  plainArrays: false
}
const DEFAULT_PARSE_OPTIONS: ParseOptions = {
  ...DEFAULT_SHARED_OPTIONS,
  decoder: decodeURIComponent,
  parseArrays: true,
  strictNull: true
}
const DEFAULT_STRINGIFY_OPTIONS: StringifyOptions = {
  ...DEFAULT_SHARED_OPTIONS,
  encoder: encodeURIComponent
}

function parse(text: string, options?: ParseOptions): AnyMap {
  const value: AnyMap = {}

  if (!isString(text)) {
    return value
  }

  const opt: ParseOptions = deepExtend<ParseOptions>(
    DEFAULT_PARSE_OPTIONS,
    options || {}
  )
  const searches = text.replace(QUERY_PARSE_REGEX, '').split(opt.delimiter!)

  for (const search of searches) {
    const rows = search.split('=')
    let key = rows[0]

    if (isEmpty(key)) {
      continue
    }

    key = opt.decoder!(key)
    let val: string | string[] = rows[1]

    if (isEmpty(val)) {
      if (opt.strictNull) {
        value[key] = null
      }
      continue
    }

    val = opt.decoder!(val)

    // a[]=1&a[]=2 => a: [1,2]
    if (opt.parseArrays) {
      if (PARSE_ARRAYS_REGEX.test(key)) {
        key = key.replace(PARSE_ARRAYS_REGEX, '')

        if (isEmpty(value[key])) {
          value[key] = []
        }

        ;(value[key] as AnyArray).push(val)
        continue
      }
    }

    // a=1,2 => a: [1, 2]
    if (opt.plainSeparator && val.includes(opt.plainSeparator!)) {
      val = val.split(opt.plainSeparator)
    }

    value[key] = val
  }

  return value
}

function stringify(value: AnyMap, options?: StringifyOptions): string {
  const text: string[] = []
  const opt: StringifyOptions = deepExtend<StringifyOptions>(
    DEFAULT_STRINGIFY_OPTIONS,
    options || {}
  )

  if (isObject(value)) {
    Object.keys(value).forEach(key => {
      let val = value[key]
      const encodedKey = opt.encoder!(key)

      if (isArray(val)) {
        val = val.map(opt.encoder!)

        if (opt.plainArrays) {
          const ev = (val as StringArray).join(opt.plainSeparator)
          text.push(`${encodedKey}=${ev}`)
        } else {
          ;(val as StringArray).forEach((row: string) => {
            const ev = opt.encoder!(row)
            text.push(`${encodedKey}[]=${ev}`)
          })
        }
      } else {
        if (isEmpty(val)) {
          text.push(`${encodedKey}=`)
        } else {
          const ev = opt.encoder!(val as string)
          text.push(`${encodedKey}=${ev}`)
        }
      }
    })
  }

  return text.join(opt.delimiter)
}

export const qs = {
  parse,
  stringify
}
