## Validate

```
import { isValid } from '@hpnp/utils'
// or
import { isValid } from '@hpnp/utils/validate'
```

| Function                      | Description                                                                                 |
| :-----------------------------| :------------------------------------------------------------------------------------------ |
| isBoolean(arg: any)           | check if the argument is Boolean                                                            |
| isString(arg: any)            | check if the argument is String                                                             |
| isNumber(arg: any)            | check if the argument is Number                                                             |
| isInt(arg: any)               | check if the argument is Number                                                             |
| isFloat(arg: any)             | check if the argument is Float                                                              |
| isArray(arg: any)             | check if the argument is Array                                                              |
| isValidArray(arg: any)        | check if the argument is Array and array length greater then 0                              |
| isSet(arg: any)               | check if the argument is Set                                                                |
| isWeakSet(arg: any)           | check if the argument is WeakSett                                                           |
| isMap(arg: any)               | check if the argument is Map                                                                |
| isWeakMap(arg: any)           | check if the argument is WeakMap                                                            |
| isSymbol(arg: any)            | check if the argument is Symbol                                                             |
| isObject(arg: any)            | check if the argument is Object                                                             |
| isDate(arg: any)              | check if the argument is Date or date string                                                |
| isRegExp(arg: any)            | check if the argument is RegExp, like `/\d+/`                                               |
| isError(arg: any)             | check if the argument is Error                                                              |
| isFunction(arg: any)          | check if the argument is Function                                                           |
| isNull(arg: any)              | check if the argument is Null                                                               |
| isUndefined(arg: any)         | check if the argument is Undefined                                                          |
| isNil(arg: any)               | check if the argument is Undefined or Null                                                  |
| isPlainObject(arg: any)       | check if the argument is Plain Object                                                       |
| isEmpty(arg: any)             | check if the argument is empty, like: empty string ` `, empty array `[]`, empty object `{}` |
| isValid(arg: any)             | which equals `!isEmpty(arg: any)`                                                           |
| isEqual(arg1: any, arg2: any) | check if StringA equals StringB                                                             |
| isTrue(arg: any)              | check if the argument is True, contains `"true"` and `1`                                    |
| isFalse(arg: any)             | check if the argument is False, contains `"false"` and `0`                                  |
| isBool(arg: any)              | which equals `isTrue(arg: any) or isFalse(arg: any)`                                        |
| isFormData(arg: any)          | check if the argument is FormData                                                           |
| isPromise(arg: any)           | check if the argument is Promise                                                            |