## Type

Get the type of argument. This function is the foundation of helper.

```
import { type } from '@hpnp/utils'
// or
import { type } from '@hpnp/utils/type'

type(1)       => number
type('hello') => string
type([])      => array
```