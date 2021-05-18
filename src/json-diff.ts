import { deepClone } from './object'
import { objectPath } from './object-path'
import {
  hasOwnProp,
  isArray,
  isEmpty,
  isObjectOrArray,
  isUndefined
} from './validate'

interface BaseOperation {
  path: string
}

interface AddOperation<T> extends BaseOperation {
  op: 'add'
  value: T
}

interface DeleteOperation extends BaseOperation {
  op: 'remove'
}

interface UpdateOperation<T> extends BaseOperation {
  op: 'replace'
  value: T
}

interface MoveOperation extends BaseOperation {
  op: 'move'
  from: string
}

interface CopyOperation extends BaseOperation {
  op: 'copy'
  from: string
}

interface GetOperation<T> extends BaseOperation {
  op: 'get'
  value: T
}

export type Operation =
  | AddOperation<unknown>
  | UpdateOperation<unknown>
  | DeleteOperation
  | MoveOperation
  | CopyOperation
  | GetOperation<unknown>

function objectKeys<T = AnyMap>(value: T): StringArray {
  if (isArray(value)) {
    return Array.from({ length: value.length }).map((_, i) => String(i))
  }
  return Object.keys(value)
}

function propPath(root: string, path: string) {
  path = path.replace(/\./g, '#')
  return isEmpty(root) ? path : root + '.' + path
}

function dirtyCompare<T = AnyMap>(
  objectA: T,
  objectB: T,
  patches: Operation[],
  path = ''
) {
  if (objectA === objectB) {
    return
  }

  const newKeys = objectKeys(objectB)
  const oldKeys = objectKeys(objectA)
  let deleted = false

  for (const k of oldKeys) {
    const key = k as keyof T
    const oldVal = objectA[key]

    if (
      hasOwnProp(objectB, <string>key) &&
      !(isUndefined(objectB[key]) && !isUndefined(oldVal) && !isArray(objectB))
    ) {
      const newVal = objectB[key]

      if (
        isObjectOrArray(oldVal) &&
        isObjectOrArray(newVal) &&
        isArray(oldVal) === isArray(newVal)
      ) {
        dirtyCompare(oldVal, newVal, patches, propPath(path, <string>key))
      } else {
        if (oldVal !== newVal) {
          patches.push({
            op: 'replace',
            path: propPath(path, <string>key),
            value: deepClone(newVal)
          })
        }
      }
    } else if (isArray(objectA) === isArray(objectB)) {
      deleted = true
      patches.push({ op: 'remove', path: propPath(path, <string>key) })
    } else {
      patches.push({ op: 'replace', path, value: objectB })
    }
  }

  if (!deleted && newKeys.length == oldKeys.length) {
    return
  }

  for (const k of newKeys) {
    const key = k as keyof T

    if (!hasOwnProp(objectA, <string>key) && !isUndefined(objectB[key])) {
      patches.push({
        op: 'add',
        path: propPath(path, <string>key),
        value: deepClone(objectB[key])
      })
    }
  }
}

function dirtyPatch<T = AnyMap>(object: T, patches: Operation[]): T {
  if (!isObjectOrArray(object) || isEmpty(patches)) {
    return object
  }

  for (const patch of patches) {
    switch (patch.op) {
      case 'add':
      case 'replace':
        objectPath.set(object, patch.path, patch.value)
        break

      case 'remove':
        objectPath.remove(object, patch.path)
        break
    }
  }

  return object
}

export function compare<T = AnyMap>(objectA: T, objectB: T): Operation[] {
  const patches: Operation[] = []
  dirtyCompare(objectA, objectB, patches, '')
  return patches
}

export function patch<T = AnyMap>(object: T, patches: Operation[]): T {
  return dirtyPatch(object, patches)
}
