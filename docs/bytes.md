## Bytes

Parse humanize size to bytes, or stringify bytes to humanize size.

```
import { bytes } from '@nily/utils'
// or
import { bytes } from '@nily/utils/bytes'

bytes.parse('1kb')    // => 1024
bytes.stringify(1024) // => 1kb
```