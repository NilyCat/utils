import { AnyArray, AnyMap } from './interface'
import { objectPath } from './object-path'
import { hasOwnProp, isArray, isNil, isObject } from './validate'

export function deepClone<T extends Object>(target: T): T {
  if (isNil(target)) {
    return target
  }

  if (isArray(target)) {
    const to: AnyArray = []

    for (let i = 0; i < target.length; i++) {
      // Prevent the infinite loop caused by a[i] = a
      to[i] = target[i] === target ? to : deepClone(target![i])
    }

    return to as unknown as T
  }

  if (isObject(target)) {
    const to: AnyMap = {}

    for (const key in target) {
      if (hasOwnProp(target, key)) {
        // Prevent the infinite loop caused by a.b = a
        to[key] =
          (target[key] as unknown as T) === target
            ? to
            : deepClone(target![key] as Object)
      }
    }

    return to as unknown as T
  }

  return target
}

export function extend<T extends AnyMap>(target: T, ...sourceList: T[]): T {
  return Object.assign(target, ...sourceList)
}

export function merge<T>(obj: T, defaults: T): T {
  return deepExtend(defaults, obj)
}

export function deepExtend<T>(target: T, ...sourceList: Array<T>): T {
  if (!isObject(target) && !isArray(target)) {
    return target
  }

  for (const source of sourceList) {
    for (const name in source) {
      const key = name as keyof T
      const src = (target as any)[key]
      const copy = source[key]

      if (
        isNil(copy) ||
        target === (copy as unknown as T) ||
        !hasOwnProp(source, <string>key)
      ) {
        continue
      }

      let isCopyArray
      if (isObject(copy) || (isCopyArray = isArray(copy))) {
        let clone
        if (isCopyArray) {
          clone = src && isArray(src) ? src : []
        } else {
          clone = src && isObject(src) ? src : {}
        }
        target[key] = deepExtend(clone, copy)
      } else {
        target[key] = copy
      }
    }
  }

  return target
}

interface PickOptions {
  ignoreNil?: boolean
  deepClone?: boolean
}

const DEFAULT_PICK_OPTIONS = {
  ignoreNil: false,
  deepClone: false
}

export function pick<T extends AnyMap>(
  target: T,
  fields: Array<string | string[]>,
  options?: PickOptions
): T {
  options = merge(options || {}, DEFAULT_PICK_OPTIONS)!
  const to = {} as T

  if (!isObject(target)) {
    return to
  }

  for (const field of fields) {
    let key = String(field)
    let alias: string | undefined

    if (isArray(field)) {
      key = field[0]

      if (field.length > 1) {
        alias = field[1]
      }
    }

    let value = objectPath.get(target, key)

    if (isNil(value)) {
      if (options.ignoreNil) {
        continue
      }
    } else if (options.deepClone && (isObject(value) || isArray(value))) {
      value = deepClone(value as unknown as Object)
    }

    objectPath.set(to, alias || key, value)
  }

  return to
}

export function exclude<T extends AnyMap>(
  target: T,
  excludes: Array<string | string[]>,
  options?: PickOptions
): T {
  options = merge(options || {}, DEFAULT_PICK_OPTIONS)!
  const to = {} as T

  if (!isObject(target)) {
    return to
  }

  const fields = Object.keys(target).filter(key => !excludes.includes(key))

  for (const field of fields) {
    const key = String(field)
    let value = target[key]

    if (isNil(value)) {
      if (options.ignoreNil) {
        continue
      }
    } else if (options.deepClone && (isObject(value) || isArray(value))) {
      value = deepClone(value as unknown as Object)
    }

    ;(to as unknown as AnyMap)[key] = value
  }

  return to
}

export function copy<T extends AnyMap>(
  target: T,
  to: T,
  fields: Array<string | string[]>,
  options?: PickOptions
): void {
  if (!isObject(target) || !isObject(to)) {
    return
  }

  options = merge(options || {}, DEFAULT_PICK_OPTIONS)!

  for (const field of fields) {
    let targetKey: string
    let toKey: string

    if (isArray(field)) {
      targetKey = field[0]
      toKey = field[1]
    } else {
      targetKey = String(field)
      toKey = targetKey
    }

    let value = objectPath.get(target, targetKey)

    if (isNil(value)) {
      if (options.ignoreNil) {
        continue
      }
    } else if (options.deepClone && (isObject(value) || isArray(value))) {
      value = deepClone(value as unknown as Object)
    }

    objectPath.set(to, toKey, value)
  }
}
