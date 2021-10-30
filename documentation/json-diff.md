## JSON Diff

### Compare two objects

```
import { compare } from '@hpnp/utils'
// or
import { compare } from '@hpnp/utils/json-diff'

compare({ a: 1 }, { b: 1 }) => [
  {
    op: 'remove',
    path: 'a',
    value: 1
  },
  {
    op: 'add',
    path: 'b',
    value: 1
  }
]
```