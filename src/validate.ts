import { type } from './type'

const WHITE_SPACE_REGX =
  /^[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]+$/

export function hasOwnProp(obj: any, key: string): boolean {
  if (isNull(obj)) {
    return false
  }
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function isBoolean(value: any): boolean {
  return type(value) === 'boolean'
}

export function isString(value: any): boolean {
  return type(value) === 'string'
}

export function isNumber(value: any): boolean {
  return type(value) === 'number' && isFinite(value)
}

export function isInt(value: any): boolean {
  return isNumber(value) && Number.isInteger(value)
}

export function isFloat(value: any): boolean {
  return isNumber(value) && !Number.isInteger(value)
}

export const isArray = Array.isArray

export function isValidArray(value: any): boolean {
  return isArray(value) && value.length > 0
}

export function isSet(value: any): boolean {
  return type(value) === 'set'
}

export function isWeakSet(value: any): boolean {
  return type(value) === 'weakset'
}

export function isMap(value: any): boolean {
  return type(value) === 'map'
}

export function isWeakMap(value: any): boolean {
  return type(value) === 'weakmap'
}

export function isSymbol(value: any): boolean {
  return type(value) === 'symbol'
}

export function isObject(value: any): boolean {
  return type(value) === 'object'
}

export function isObjectOrArray(value: any): boolean {
  return isObject(value) || isArray(value)
}

export function isDate(value: any): boolean {
  return type(value) === 'date'
}

export function isRegExp(value: any): boolean {
  return type(value) === 'regexp'
}

export function isError(value: any): boolean {
  return type(value) === 'error'
}

export function isFunction(value: any): boolean {
  return type(value) === 'function'
}

export function isNull(value: any): boolean {
  return type(value) === 'null'
}

export function isUndefined(value: any): boolean {
  return type(value) === 'undefined'
}

export function isNil(value: any): boolean {
  return isNull(value) || isUndefined(value)
}

export function isNotNil(value: any): boolean {
  return !isNil(value)
}

export function isPlainObject(value: any): boolean {
  if (!isObject(value)) return false

  const ctor = value.constructor
  if (typeof ctor !== 'function') return false

  const proto = ctor.prototype
  if (!isObject(proto)) return false

  return proto.hasOwnProperty('isPrototypeOf')
}

export function isEmpty(value: any): boolean {
  if (isNil(value)) return true

  if (isBoolean(value)) return false

  if (isNumber(value)) return false

  if (isString(value)) {
    return value.length === 0 || WHITE_SPACE_REGX.test(value)
  }

  if (isFunction(value) || isArray(value)) {
    return value.length === 0
  }

  switch (type(value)) {
    case 'file':
    case 'map':
    case 'weakmap':
    case 'set':
    case 'weakset': {
      return value.size === 0
    }

    case 'object': {
      for (const key in value) {
        if (hasOwnProp(value, key)) {
          return false
        }
      }
      return true
    }

    default:
      break
  }

  return false
}

export function isValid(value: any): boolean {
  return !isEmpty(value)
}

export function isEqual(value: any, arg2: any): boolean {
  return String(value) === String(arg2)
}

export function isNotEqual(value: any, arg2: any): boolean {
  return !isEqual(value, arg2)
}

export function isTrue(value: any): boolean {
  return value === true || isEqual(value, 'true') || isEqual(value, '1')
}

export function isFalse(value: any): boolean {
  return value === false || isEqual(value, 'false') || isEqual(value, '0')
}

export function isBool(value: any): boolean {
  return isTrue(value) || isFalse(value)
}

export function isFormData(value: any): boolean {
  return type(value) === 'formdata'
}

export function isPromise<T = any>(value: any): value is Promise<T> {
  return type(value) === 'promise'
}

export function isBlob<T = any>(value: any): value is Promise<T> {
  return type(value) === 'blob'
}
