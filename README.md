# Storage
Simple **borwser storage** API wrapper. With useful tool functions.

## Install
```shell
npm i @konata9/storage.js
```

## Basic Usage
Here is the basic usage.

```javascript
import Storage from '@konata9/typecheck.js'
// or
const Storage = require('@konata9/typecheck.js')

// Storage default using sessionStorage 
// Set & Get single key-values
Storage.set('hello', 'word')
const world = Storage.get('hello')
console.log(world) // return world

// Set & Get multiple key-values
Storage.set({a:1, b:2, c:3})
const values = Storage.get(['a', 'b', 'c'])
console.log(values) // return [1, 2, 3]

// Remove single key
Storage.remove('hello')
Storage.get('hello') // return null

// Remove mutiple keys
Storage.remove(['a', 'b'])
Storage.get('a') //return null
Storage.get('b') //return null

// Clear Storage
Storage.clear() // clear all key-values in local/sessionStorage
```

## ALL API
### Constant Properties

### Type

### Functions
#### Set/Get
#### Remove/Clear
#### List/Has
#### Expire Key

## Test
You can find the test case in test folder. All the test were passed. The result is in the `test/testrunner.html` file or you can run the command `npm run test` to see the report.

*If you want to run the test yourself, you may need to build the `storage.test.js` file. But don't worry, you can run the command `npm run test-build` to build the js file easily. The only thing you need to do is refreshing the page `test/testrunner.html` in the browser*