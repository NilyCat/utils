## HTML to text

```
import { html2text } from '@hpnp/utils'
// or
import { html2text } from '@hpnp/utils/html2text'

html2text('<p>hello world</p>') // => hello world
html2text('<p>hello world</p>', 5) // => hello
```