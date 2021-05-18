import { AnyMap } from './interface'
import {
  isEmpty,
  isInt,
  isNil,
  isObject,
  isObjectOrArray,
  isString
} from './validate'

const DISALLOWED_KEYS = new Set(['__proto__', 'prototype', 'constructor'])

function getPathSegments(path: string): string[] {
  return path
    .split('.')
    .filter(p => !DISALLOWED_KEYS.has(p))
    .map(p => p.replace(/#/g, '.'))
}

function get<T = unknown, K = AnyMap>(
  object: K,
  path: string,
  defaults?: T
): T | K | undefined {
  if (!isObject(object) || !isString(path) || isEmpty(path)) {
    return
  }

  const pathArray = getPathSegments(path)
  if (pathArray.length === 0) {
    return
  }

  for (let i = 0; i < pathArray.length; i++) {
    // @ts-ignore
    object = object[pathArray[i]]

    if (isNil(object)) {
      if (i !== pathArray.length - 1) {
        return defaults
      }

      break
    }
  }

  return object ?? defaults
}

function set<T = unknown, K = AnyMap>(
  object: K,
  path: string,
  value: T
): T | K {
  if (!isObjectOrArray(object) || !isString(path) || isEmpty(path)) {
    return object
  }

  const pathArray = getPathSegments(path)

  for (let i = 0; i < pathArray.length; i++) {
    const p = pathArray[i] as keyof K

    if (!isObjectOrArray(object[p])) {
      const numericalPath = Number(pathArray[i + 1])

      if (isInt(numericalPath) && numericalPath >= 0) {
        object[p] = [] as any
      } else {
        object[p] = {} as any
      }
    }

    if (i === pathArray.length - 1) {
      object[p] = value as any
    }

    object = object[p] as any
  }

  return object
}

function remove<T = AnyMap>(object: T, path: string): boolean | undefined {
  if (!isObjectOrArray(object) || !isString(path) || isEmpty(path)) {
    return false
  }

  const pathArray = getPathSegments(path)

  for (let i = 0; i < pathArray.length; i++) {
    const p = pathArray[i]

    if (i === pathArray.length - 1) {
      // @ts-ignore
      delete object[p]
      return true
    }

    // @ts-ignore
    object = object[p]

    if (!isObject(object)) {
      return false
    }
  }
}

function has<T = AnyMap>(object: T, path: string): boolean {
  if (!isObjectOrArray(object) || !isString(path) || isEmpty(path)) {
    return false
  }

  const pathArray = getPathSegments(path)
  if (pathArray.length === 0) {
    return false
  }

  for (const key of pathArray) {
    if (isObjectOrArray(object)) {
      if (!(key in object)) {
        return false
      }

      // @ts-ignore
      object = object[key]
    } else {
      return false
    }
  }

  return true
}

export const objectPath = {
  getPathSegments,
  get,
  set,
  remove,
  has
}
