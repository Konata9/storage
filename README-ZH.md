# Storage
[English](./README.md) | 中文文档

浏览器 **Storage** 的简单封装，包含了一些常用方法。

## 安装

```shell
npm i @konata9/storage.js
```

## 基本使用

API 在用法上接近 local/sessionStorage，上有很方便。
```javascript
import Storage from "@konata9/typecheck.js";
// or
const Storage = require("@konata9/typecheck.js");

// 默认使用 sessionStorage
// 设置和获取单个 key-value
Storage.set({ hello: "world" });
const world = Storage.get("hello");
console.log(world); // return world

// 设置和获取多个 key-values
Storage.set({ a: 1, b: 2, c: 3 });
const values = Storage.get(["a", "b", "c"]);
console.log(values); // return [1, 2, 3]

// 移除一个 key
Storage.remove("hello");
Storage.get("hello"); // return null

// 移除多个 key
Storage.remove(["a", "b"]);
Storage.get("a"); //return null
Storage.get("b"); //return null

// 清空 storage
Storage.clear(); // 清空所有 key-values
```

## ALL API

### 属性

#### Type

`type` 属性用来确定当前使用哪个 Storage。**默认**使用 `sessionStorage`。

##### `Storage.getType()`

返回当前 storage 的 type。有 `session` 和 `local` 两种。默认为 `session`。

```javascript
Storage.getType(); // return 'session' or 'local'
```

##### `Storage.setType(type)`

可以用来设置 Storage 的 `type`，只接受 `session` 和 `local` 两个字符串。可以使用这个方法改变当前 Storage 的 `type`。

_注意：使用这个方法设置完之后，之后 Storage 使用的 `type` 都会使用设置的值_

```javascript
Storage.setType("local"); // change localStorage
Storage.getType(); // return 'local'
```

_尽管我们可以直接用过 `Storage.type='local/session'` 来改变 `type`，但是这样做不利于维护。通过 `setType` 方法修改会校验参数保证使用正确的 Storage_

### Methods

#### Set/Get

##### `Storage.set(insertItem, [type])`

- `insertItem`: Object. 可以传入一个对象，可以有多个 key-value
- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage.

  _这个方法会使用 `JSON.stringify()` 来保存数据_

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

返回数组或者值。_如果获取的是一个过期的值，那么会返回 null，并且会删除该值对应的 key-value_

- `key`: Array | String. 传入的如果是 key 的数组，则返回是值的数组；如果是单个 key，则返回对应的值。
- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage.

  _你不需要使用 `JSON.parse()` 来转化数据_

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

- `key`: Array | String. 传入的如果是 key 的数组，则删除对应的值；如果是单个 key，则删除对应的值。
- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage.

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

- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage.

```javascript
// clear all key-values in current storage
Storage.clear();

// clear all key-values in localStorage
Storage.clear("local");
```

#### List/Has

##### `Storage.listKeys([type, full])`

返回对应值的数组，顺序和传入的 `key` 相同。

- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage.
- `full`: Boolean. 默认为 `false` 即不会包含 `过期key`。如果为 `true`，会返回所有的 key，包含 `过期key`。

  _**`过期key`** 形式为 `--key--`, 包含一个过期时间_

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

返回 `Boolean`（`true` or `false`).

- `key`: String. 检查 key 是否在 storage 中存在。
- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage.

```javascript
// check the key from current storage
Storage.hasKey("a"); // return true
Storage.hasKey("e"); // return false if the key didn't exist

// check the from localStorage
Storage.hasKey("a", "local"); // return true
Storage.hasKey("e", "local"); // return false if the key didn't exist
```

#### Expire Key

无论是 `localStorage` 还是 `sessionStorage` 中，key 并没有储存时间。但实际工作中可能会有类似的需求需要为某个 key 设定一个过期时间。因此我们可以使用下面的方法进行设置，当获取的 key 过期时，在下次获取时会删除 key 和其对应的 value.

##### `Storage.setExpireKey(insertItem, [options])`

设置 key 包含过期时间，基本用法与 `set` 方法相同。会创建一个 `--key--` 来记录过期的时间。在下次使用 `get` 方法获取时，如果已经过期，则会返回 `null` 并移除 `key` 和 `过期key`。

- `insertItem`: Object. 可以传入一个对象，可以有多个 key-value
- `options`: Object.
  - `options.type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage。
  - `options.expires`: Number. 默认值为一天。这个值可以设置 `key` 的保存时间（秒）。

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

返回 `Boolean`（`true` or `false`).

- `key`: String. 检查 key 是否已经过期。
- `type`: String. 默认使用当前 Sotrage 的 `type`，可以通过这个参数临时修改 storage。

```javascript
// check the key from current storage
Storage.checkExpired("a"); // return true if the key is expired
Storage.checkExpired("e"); // return false if the key is not expired

// check the from localStorage
Storage.checkExpired("a", "local"); // return true if the key is expired
Storage.checkExpired("e", "local"); // return false if the key is not expired
```

#### Expire Seconds

Storage 提供几种时间来帮助设置。时间都是 Number 类型。

- `Storage.ONE_MINUTE` equals _1000 \* 60_ seconds
- `Storage.ONE_HOUR` equals _1000 \* 60 \* 60_ seconds
- `Storage.ONE_DAY` equals _1000 \* 60 \* 60 \* 24_ seconds
- `Storage.ONE_MONTH` equals _1000 \* 60 \* 60 \* 24 \* 30_ seconds

你可以设置任何你想要的时间。

```javascript
let fiveMinutes = 5 * Storage.ONE_MINUTE;
let oneWeek = 7 * Storage.ONE_DAY;
```

## Test

测试用例在 test 文件夹下。所有的测试均已通过。结果可以在 `test/testrunner.html` 中查看到，你可以使用 `npm run test` 命令进行查看。

_如果你想要进行测试用例的修改，你可能需要再对 `storage.test.js` 进行编译。你可以使用 `npm run test-build` 进行测试文件的编译，然后在 `test/testrunner.html` 文件中进行查看。
