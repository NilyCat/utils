## Date

Date conversions methods.

### Unix timestamp

```
import { date } from '@nily/utils'
// or
import { date } from '@nily/utils/date'

date.timestamp() // => 1600822237
```

### Parse date string to second number

```
import { date } from '@nily/utils'
// or
import { date } from '@nily/utils/date'

date.seconds('1m') // => 60
date.seconds('1h') // => 3600
```

### Format second number to string

```
import { date } from '@nily/utils'
// or
import { date } from '@nily/utils/date'

date.formatSeconds(5 * 60 * 60) // => 5 hours
date.formatSeconds(86_400)      // => 1 day'
```

### Parse date string to milliseconds

```
import { date } from '@nily/utils'
// or
import { date } from '@nily/utils/date'

date.milliseconds('1m') // => 60_000
```