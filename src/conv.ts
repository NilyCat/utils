import { AnyArray, AnyMap } from './interface'
import { isBoolean, isEmpty, isNumber, isString, isTrue } from './validate'

function toBool(value: unknown, defaults?: boolean): boolean {
  if (isEmpty(value)) {
    return defaults || false
  }

  if (isBoolean(value)) {
    return value as boolean
  }

  return isTrue(value)
}

function toInt(
  value: unknown,
  defaults?: number,
  maxValue?: number
): number | undefined {
  let val: number

  if (isNumber(value)) {
    val = Number(value)
  } else {
    val = parseInt(value as string, 10)
  }

  if (!isFinite(val)) {
    return defaults
  }

  return maxValue ? Math.min(maxValue, val) : val
}

function toFloat(
  value: unknown,
  defaults?: number,
  maxValue?: number
): number | undefined {
  let val: number

  if (isNumber(value)) {
    val = Number(value)
  } else {
    val = parseFloat(value as string)
  }

  if (!isFinite(val)) {
    return defaults
  }

  return maxValue ? Math.min(maxValue, val) : val
}

function toJson(
  text: string,
  defaults?: AnyArray | AnyMap
): AnyArray | AnyMap | undefined {
  if (isEmpty(text) || !isString(text)) {
    return
  }

  let value: AnyArray | AnyMap | undefined

  try {
    value = JSON.parse(text)
  } catch (e) {
    // eslint-disable-line
  }

  if (defaults && !value) {
    value = defaults
  }

  return value
}

function toJsonString(value: AnyArray | AnyMap): string {
  return JSON.stringify(value)
}

export const conv = {
  int: toInt,
  float: toFloat,
  bool: toBool,
  json: toJson,
  jsonString: toJsonString
}
