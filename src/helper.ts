import { isValidArray } from './validate'

export function arrayUnique(value: any): any[] {
  if (!isValidArray(value)) {
    return []
  }
  return Array.from(new Set(value))
}
