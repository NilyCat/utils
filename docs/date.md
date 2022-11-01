## Date

Date conversions methods.

### Unix timestamp

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.timestamp() // => 1600822237
```

### Parse date string to second number

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.seconds('1m') // => 60
date.seconds('1h') // => 3600
```

### Format second number to string

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.formatSeconds(5 * 60 * 60) // => 5 hours
date.formatSeconds(86_400)      // => 1 day'
```

### Parse date string to milliseconds

```
import { date } from '@hpnp/utils'
// or
import { date } from '@hpnp/utils/date'

date.milliseconds('1m') // => 60_000
```