[![npm version](https://badge.fury.io/js/virvar.svg)](https://badge.fury.io/js/virvar)
[![Build status](https://travis-ci.org/gswalden/virvar.svg?branch=master)](https://travis-ci.org/gswalden/virvar)

### Install
```sh
npm install --save virvar
```

*Tested with Node >= 0.12*

### Use
```js
// process.env = {
//   STRING_VAL: 'http://localhost',
//   INT_VAL: '3000',
//   FLOAT_VAL: '33.333',
//   BOOL_VAL1: 'true',
//   BOOL_VAL2: 'yes',
//   BOOL_VAL3: '1',
//   BOOL_VAL3: 'false',
//   JSON_VAL: '{"a":1,"b":2,"c":3}',
//   ARRAY_VAL: 'item1,item2,item3'
// }

var vv = require('virvar');

console.log(vv('STRING_VAL')); // 'http://localhost'
console.log(vv('MISSING_VAL', true)); // throws Error
console.log(vv('INT_VAL', false, 'i')); // 3000
console.log(vv('FLOAT_VAL', false, 'f')); // 33.333
console.log(vv('BOOL_VAL1', false, 'b')); // true
console.log(vv('BOOL_VAL2', false, 'b')); // true
console.log(vv('BOOL_VAL3', false, 'b')); // true
console.log(vv('BOOL_VAL4', false, 'b')); // false
console.log(vv('JSON_VAL', false, 'j')); // { a: 1, b: 2, c: 3 }
console.log(vv('ARRAY_VAL', false, 'a')); // [ item1, item2, item3 ]
```

#### vv(name, required, type)
Returns the value of the environment variable, optionally parsing it into the given type.
Throws an error if the `required` parameter is truthy and the value is loosely equal to `null`.

##### name
Type: `string`

The name of the environment variable.

##### required
Type: `boolean`<br>
Default: `false`

When true, an Error is thrown if the variable is not set.

##### type
Type: `string`

By default, a string is returned. That string can be parsed into a different
type by passing one of these values:

- `'a'` Parses a comma-separated string into an array
- `'b'` Parses the value into a boolean
- `'f'` Parses the value into a float (using `parseFloat`)
- `'i'` Parses the value into an integer (using `parseInt`)
- `'j'` Parses the value into an object (using `JSON.parse`)

#### Why *virvar*?
Because en**vir**onment **var**iable.

🙃
