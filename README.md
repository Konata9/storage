# Storage

Simple **borwser storage** API wrapper. With useful tool functions.

## Install

```shell
npm i @konata9/storage.js
```

## Basic Usage

API familiar to the local/sessionStorage. Easily to use.
```javascript
import Storage from "@konata9/typecheck.js";
// or
const Storage = require("@konata9/typecheck.js");

// Storage default using sessionStorage
// Set & Get single key-values
Storage.set({ hello: "world" });
const world = Storage.get("hello");
console.log(world); // return world

// Set & Get multiple key-values
Storage.set({ a: 1, b: 2, c: 3 });
const values = Storage.get(["a", "b", "c"]);
console.log(values); // return [1, 2, 3]

// Remove single key
Storage.remove("hello");
Storage.get("hello"); // return null

// Remove mutiple keys
Storage.remove(["a", "b"]);
Storage.get("a"); //return null
Storage.get("b"); //return null

// Clear Storage
Storage.clear(); // clear all key-values in the Storage
```

## ALL API

### Property

#### Type

The `type` property decide which Storage (`localStorage` or `sessionStorage`) to use. **Default storage** is _**`sessionStorage`**_.

##### `Storage.getType()`

Return current Storage type `'session'` or `'local'`. **Default value is `'session'`**.

```javascript
Storage.getType(); // return 'session' or 'local'
```

##### `Storage.setType(type)`

Set the Storage type. The `type` only accpet `'session'` and `'local'`. You can use this method to change the Storage type.

  _This method will change the global `type` of storage._

```javascript
Storage.setType("local"); // change localStorage
Storage.getType(); // return 'local'
```

_Although we can set `type` by `Storage.type = 'local'/'session'`, we don't suggest to do like this. Because `Storage.setType()` method will check the value to make sure you use the correct storage._

### Methods

#### Set/Get

##### `Storage.set(insertItem, [type])`

- `insertItem`: Object. Key-Value you want to set, support multiple key-values.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

  _You don't need to use `JSON.string()` to encode the value._

```javaScript
// set single value and use the current storage
Storage.set({a: 1})

// set key-value to localStorage
Storage.set({a: 1}, 'local')

// set multiple key-values to the current storage
Storage.set({a:1, b:2, c:3})

// set multiple key-values to the localStorage
Storage.set({a:1, b:2, c:3}, 'local') 
```

##### `Storage.get(key, [type])`

- `key`: Array | String. You can get single value by passing a string, and get multiple values by passing an array of keys.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javaScript
// get single value and use the current storage
Storage.get('a') // return 1

// get single value from localStorage
Storage.get('a', 'local') // return 1

// get multiple values by passing key-array
Storage.get(['a','b','c']) // return [1, 2, 3] 

// get multiple values by passing key-array from localStorage
Storage.get(['a','b','c'], 'local') // return [1, 2, 3] 
```

#### Remove/Clear

##### `Storage.remove(key, [type])`

- `key`: Array | String. You can remove single value by passing a string, and remove multiple values by passing an array of keys.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javaScript
// remove single key-value from current storage
Storage.remove('a')

// remove key-value from localStorage
Storage.remove('a', 'local') 

// remove multiple key-values from current storage
Storage.set(['a','b','c']) 

// remove multiple key-values from localStorage
Storage.set(['a','b','c'], 'local') 
```

##### `Storage.clear([type])`

- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javaScript
// clear all key-values in current storage
Storage.clear() 

// clear all key-values in localStorage
Storage.clear('local') 
```

#### List/Has

##### `Storage.listKeys([type, full])`
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.
- `full`: Boolean. Default is `false`, return the keys array without `expire-key`. If you set `true`, it will return all keys array(include `expire-key`).

  _**`expire-key`** look like `--key--`, represent the key has an expire time._

```javaScript
// get keys from current storage
Storage.listKeys() // return ['a', 'b', 'c']

// get keys from localStorage
Storage.listKeys('local') // return ['a', 'b', 'c']

// get all keys from current storage
Storage.listKeys(Storage.getType(), true) // return ['a', 'b', 'c', '--a--', '--b--', '--c--']

// get all keys from localStorage
Storage.listKeys('local', true) // return ['a', 'b', 'c', '--a--', '--b--', '--c--']
```

##### `Storage.hasKey(key, [type])`
- `key`: String. You check the key  .
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javaScript
// remove single key-value from current storage
Storage.remove('a')

// remove key-value from localStorage
Storage.remove('a', 'local') 

// remove multiple key-values from current storage
Storage.set(['a','b','c']) 

// remove multiple key-values from localStorage
Storage.set(['a','b','c'], 'local') 
```

#### Expire Key

##### `Storage.setExpireKey(insertItem, [options])`

##### `Storage.checkExpired(key, [type])`

#### Expire Seconds

Storage provide some seconds to set the expires easily. The type of value below is `Number`.

- `Storage.ONE_MINUTE` equals _1000 _ 60\* seconds
- `Storage.ONE_HOUR` equals _1000 _ 60 _ 60_ seconds
- `Storage.ONE_DAY` equals _1000 _ 60 _ 60 _ 24\* seconds
- `Storage.ONE_MONTH` equals _1000 _ 60 _ 60 _ 24 _ 30_ seconds

You can get any time you want.

```javascript
let fiveMinutes = 5 * Storage.ONE_MINUTE;
let oneWeek = 7 * Storage.ONE_DAY;
```

## Test

You can find the test case in test folder. All the test were passed. The result is in the `test/testrunner.html` file or you can run the command `npm run test` to see the report.

_If you want to run the test yourself, you may need to build the `storage.test.js` file. But don't worry, you can run the command `npm run test-build` to build the js file easily. The only thing you need to do is refreshing the page `test/testrunner.html` in the browser._
