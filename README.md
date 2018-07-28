## Usage

```javascript
// root directory,
// undefined for process.cwd(),
// true for directory of main file
var root = undefined;
var find = require('module-find')(root);

// modules versions:
// dep1      -> v1
// dep2      -> v1
// dep3      -> v1
// dep3/dep1 -> v1
// dep3/dep2 -> v2

find('dep1');
// -> /root/node_modules/dep1

find('dep1', 'dep2');
// -> [ '/root/node_modules/dep1', '/root/node_modules/dep2' ]

find(['dep3', 'dep1'])
// -> /root/node_modules/dep1

find(['dep3', 'dep2'])
// -> /root/node_modules/dep3/node_modules/dep2
```
