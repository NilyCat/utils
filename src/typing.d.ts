export {}

declare global {
  type Nil = null | undefined

  interface AnyMap<T = unknown> {
    [key: string]: T
  }

  type StringMap = AnyMap<string>
  type NumberMap = AnyMap<number>
  type StringArray = string[]
  type NumberArray = number[]
  type AnyArray<T = unknown> = T[]
}
