import { type } from './type'
import { isValid, isNil } from './validate'

function setItem<T = string>(key: string, value: T) {
  if (
    isNil(value) ||
    (type(value) === 'number' && isNaN(value as unknown as number))
  ) {
    removeItem(key)
  } else {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

function getItem<T = string>(key: string): T | undefined {
  const value = window.localStorage.getItem(key)

  if (!isNil(value)) {
    try {
      return JSON.parse(value!)
    } catch (_) {}
  }
}

function removeItem(key: string) {
  window.localStorage.removeItem(key)
}

function clear() {
  window.localStorage.clear()
}

function length(): number {
  return window.localStorage.length
}

function keys(): string[] {
  const _keys: string[] = []

  for (let index = 0; index < length(); index++) {
    const key = window.localStorage.key(index)

    if (isValid(key)) {
      _keys.push(key!)
    }
  }

  return _keys
}

export const localStorage = {
  setItem,
  getItem,
  removeItem,
  keys,
  length,
  clear
}
