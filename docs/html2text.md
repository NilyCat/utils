## HTML to text

```
import { html2text } from '@nily/utils'
// or
import { html2text } from '@nily/utils/html2text'

html2text('<p>hello world</p>') // => hello world
html2text('<p>hello world</p>', 5) // => hello
```