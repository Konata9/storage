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

  _You don't need to use `JSON.stringify()` to encode the value._

```javascript
// set single value and use the current storage
Storage.set({ a: 1 });

// set key-value to localStorage
Storage.set({ a: 1 }, "local");

// set multiple key-values to the current storage
Storage.set({ a: 1, b: 2, c: 3 });

// set multiple key-values to the localStorage
Storage.set({ a: 1, b: 2, c: 3 }, "local");
```

##### `Storage.get(key, [type])`

Return `Array` or `String` value due to the type of key you pass. _If the key expired, will return `null` and will **remove the key-value from storage**_.

- `key`: Array | String. You can get single value by passing a string, and get multiple values by passing an array of keys.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

  _You don't need to use `JSON.parse()` to decode the value._

```javascript
// get single value and use the current storage
Storage.get("a"); // return 1

// get single value from localStorage
Storage.get("a", "local"); // return 1

// get multiple values by passing key-array
Storage.get(["a", "b", "c"]); // return [1, 2, 3]

// get multiple values by passing key-array from localStorage
Storage.get(["a", "b", "c"], "local"); // return [1, 2, 3]
```

#### Remove/Clear

##### `Storage.remove(key, [type])`

- `key`: Array | String. You can remove single value by passing a string, and remove multiple values by passing an array of keys.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javascript
// remove single key-value from current storage
Storage.remove("a");

// remove key-value from localStorage
Storage.remove("a", "local");

// remove multiple key-values from current storage
Storage.set(["a", "b", "c"]);

// remove multiple key-values from localStorage
Storage.set(["a", "b", "c"], "local");
```

##### `Storage.clear([type])`

- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javascript
// clear all key-values in current storage
Storage.clear();

// clear all key-values in localStorage
Storage.clear("local");
```

#### List/Has

##### `Storage.listKeys([type, full])`

Return `Array` of values, order is equal to the key you pass.

- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.
- `full`: Boolean. Default is `false`, return the keys array without `expire-key`. If you set `true`, it will return all keys array(include `expire-key`).

  _**`expire-key`** look like `--key--`, represent the key has an expire time. You can find detail below._

```javascript
// get keys from current storage
Storage.listKeys(); // return ['a', 'b', 'c']

// get keys from localStorage
Storage.listKeys("local"); // return ['a', 'b', 'c']

// get all keys from current storage
Storage.listKeys(Storage.getType(), true); // return ['a', 'b', 'c', '--a--', '--b--', '--c--']

// get all keys from localStorage
Storage.listKeys("local", true); // return ['a', 'b', 'c', '--a--', '--b--', '--c--']
```

##### `Storage.hasKey(key, [type])`

Return `Boolean`（`true` or `false`).

- `key`: String. You check the key if it is in the storage.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javascript
// check the key from current storage
Storage.hasKey("a"); // return true
Storage.hasKey("e"); // return false if the key didn't exist

// check the from localStorage
Storage.hasKey("a", "local"); // return true
Storage.hasKey("e", "local"); // return false if the key didn't exist
```

#### Expire Key

As we all know, value in the Storage will not delete ifself especially in localStorage. So we provide _expire key_, the value will _destory ifself_ when you get it next time if it is _**expired**_.

##### `Storage.setExpireKey(insertItem, [options])`

Set the key with _**expires time(seconds)**_. This method will create a key like `--key--` to keep the expires seconds. The key: `--key--` is the _**expire key**_. If the value **expired**, it will return `null` and _**remove**_ both _key_ and _expire key_ when you use `Storage.get()` method.

- `insertItem`: Object. Key-Value you want to set, support multiple key-values.
- `options`: Object.
  - `options.type`: String. Will use current storage `type`. This param let you set the storage type temporarily.
  - `options.expires`: Number. Default value is `Storage.ONE_DAY`. This param let you set how long(**seconds**) you want to keep.

```javascript
// set single value and use the current storage and default expires seconds
Storage.setExpireKey({ a: 1 }); // storage will create a expires key --a-- record expires seconds.

// set single value and use the current storage and custom expires seconds
Storage.setExpireKey({ a: 1 }, { expires: Storage.ONE_DAY * 3 }); // expires is three day

// set single value and use localStorage and default expires seconds
Storage.setExpireKey({ a: 1 }, { type: "local" });

// set single value and use localStorage and custom expires seconds
Storage.setExpireKey({ a: 1 }, { type: "local", expires: Storage.ONE_DAY * 3 });

// set multiple values and use the current storage and custom expires seconds
Storage.setExpireKey({ a: 1, b: 2, c: 3 }, { expires: Storage.ONE_DAY * 3 }); // expires is three day

// set multiple values and use the current storage and default expires seconds
Storage.setExpireKey({ a: 1, b: 2, c: 3 });

// set multiple values and use localStorage and default expires seconds
Storage.setExpireKey({ a: 1, b: 2, c: 3 }, { type: "local" });

// set multiple values and use localStorage and custom expires seconds
Storage.setExpireKey(
  { a: 1, b: 2, c: 3 },
  { type: "local", expires: Storage.ONE_DAY * 3 }
);
```

##### `Storage.checkExpired(key, [type])`

Return `Boolean`（`true` or `false`).

- `key`: String. You check the key if it is expired.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javascript
// check the key from current storage
Storage.checkExpired("a"); // return true if the key is expired
Storage.checkExpired("e"); // return false if the key is not expired

// check the from localStorage
Storage.checkExpired("a", "local"); // return true if the key is expired
Storage.checkExpired("e", "local"); // return false if the key is not expired
```

#### Expire Seconds

Storage provide some seconds to set the expires easily. The type of value below is `Number`.

- `Storage.ONE_MINUTE` equals _1000 \* 60_ seconds
- `Storage.ONE_HOUR` equals _1000 \* 60 \* 60_ seconds
- `Storage.ONE_DAY` equals _1000 \* 60 \* 60 \* 24_ seconds
- `Storage.ONE_MONTH` equals _1000 \* 60 \* 60 \* 24 \* 30_ seconds

You can get any time you want.

```javascript
let fiveMinutes = 5 * Storage.ONE_MINUTE;
let oneWeek = 7 * Storage.ONE_DAY;
```

## Test

You can find the test case in test folder. All the test were passed. The result is in the `test/testrunner.html` file or you can run the command `npm run test` to see the report.

_If you want to run the test yourself, you may need to build the `storage.test.js` file. But don't worry, you can run the command `npm run test-build` to build the js file easily. The only thing you need to do is refreshing the page `test/testrunner.html` in the browser._
