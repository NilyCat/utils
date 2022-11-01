## Object

### Deep clone a object

```
import { deepClone } from '@hpnp/utils'
// or
import { deepClone } from '@hpnp/utils/object'

const obj = {
  x: 1
}

const cloned = deepClone(obj)

cloned !== obj     // => true
cloned.x === obj.x // => true
```

### Pick some properties from a object

```
import { pick } from '@hpnp/utils'
// or
import { pick } from '@hpnp/utils/object'

const obj = {
  x: 1,
  y: 2,
  z: 3
}

pick(obj, ['y', 'z']) // => { y: 2, z：3 }
```

### Exclude some properties from a object

```
import { exclude } from '@hpnp/utils'
// or
import { exclude } from '@hpnp/utils/object'

const obj = {
  x: 1,
  y: 2,
  z: 3
}

exclude(obj, ['y']) // => { x: 1, z：3 }
```
