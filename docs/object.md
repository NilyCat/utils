## Object

### Deep clone a object

```
import { deepClone } from '@nily/utils'
// or
import { deepClone } from '@nily/utils/object'

const obj = {
  x: 1
}

const cloned = deepClone(obj)

cloned !== obj     // => true
cloned.x === obj.x // => true
```

### Pick some properties from a object

```
import { pick } from '@nily/utils'
// or
import { pick } from '@nily/utils/object'

const obj = {
  x: 1,
  y: 2,
  z: 3
}

pick(obj, ['y', 'z']) // => { y: 2, z：3 }
```

### Exclude some properties from a object

```
import { exclude } from '@nily/utils'
// or
import { exclude } from '@nily/utils/object'

const obj = {
  x: 1,
  y: 2,
  z: 3
}

exclude(obj, ['y']) // => { x: 1, z：3 }
```
