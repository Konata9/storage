# Storage

Simple **borwser storage** API wrapper. With useful tool functions.

## Install

```shell
npm i @konata9/storage.js
```

## Basic Usage

Here is the basic usage.

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

The `type` property decide which Storage (`localStorage` or `sessionStorage`) to use. Default storage is **`sessionStorage`**.

##### `Storage.getType()`

Return current Storage type `'session'` or `'local'`. Default value is `'session'`.

```javascript
Storage.getType(); // return 'session' or 'local'
```

##### `Storage.setType(type)`

Set the Storage type. The `type` only accpet `'session'` and `'local'`. You can use this method to change the Storage type. _This method will change the global `type` of storage._

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
Storage.set({a: 1}) // set single value and use the current storage
Storage.set({a: 1}, 'local') // set key-value to localStorage
Storage.set({a:1, b:2, c:3}) // set multiple key-values to the current storage
```

##### `Storage.get(key, [type])`

- `key`: Array | String. You can get single value by passing a string, and get multiple values by passing an array of keys.
- `type`: String. Will use current storage `type`. This param let you set the storage type temporarily.

```javaScript
Storage.get('a') //return 1 get single value and use the current storage
Storage.set('a', 'local') // get key-value to localStorage
Storage.set({a:1, b:2, c:3}) // set multiple key-values to the current storage
```

#### Remove/Clear

##### `Storage.remove(key, [type])`

- `key`: Array | String.
- `type`: String. Default value `session`(if you haven't change the `type`), you can set the storage type temporarily.

```javaScript
Storage.set({a: 1}) // set single key-value to current storage
Storage.set({a: 1}, 'local') // set key-value to localStorage
Storage.set({a:1, b:2, c:3}) // set multiple key-values to current storage
```

##### `Storage.clear([type])`

- `type`: String. Default value `session`(if you haven't change the `type`), you can set the storage type

```javaScript
Storage.clear() // clear all key-values in current storage
Storage.clear('local') // clear all key-values in localStorage
```

#### List/Has

##### `Storage.listKeys([type, full])`

##### `Storage.hasKey(key, [type])`

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
