## Type

Get the type of argument. This function is the foundation of helper.

```
import { type } from '@nily/utils'
// or
import { type } from '@nily/utils/type'

type(1)       => number
type('hello') => string
type([])      => array
```