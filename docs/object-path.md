## Object Path

### Get object value

```
import { objectPath } from '@nily/utils'
// or
import { objectPath } from '@nily/utils/object-path'

const obj = {
    a: {
        b: 1
    }
}
objectPath.get(obj, 'a.b') => 1
```

### Set object value

```
import { objectPath } from '@nily/utils'
// or
import { objectPath } from '@nily/utils/object-path'

const obj = {
    a: {
        b: 1
    }
}
objectPath.set(obj, 'a.b', 2) => {
    a: {
        b: 2
    }
}
```