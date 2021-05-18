export interface AnyMap<T = unknown> {
  [key: string]: T
}

export type StringMap = AnyMap<string>
export type NumberMap = AnyMap<number>
export type StringArray = string[]
export type NumberArray = number[]
export type AnyArray<T = unknown> = T[]
