## Date

Date conversions methods.

### Unix timestamp

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.timestamp() // => 1600822237
```

### Parse date string to seconds

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.seconds('1m') // => 60
date.seconds('1h') // => 3600
```

### Parse date string to milliseconds

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.milliseconds('1m') // => 60_000
```