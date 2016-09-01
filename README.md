# definitely [![Build Status](https://travis-ci.org/pelotom/definitely.svg?branch=master)](https://travis-ci.org/pelotom/definitely)
Find `undefined` property bugs close to the source.

### Installation
```
$ npm install --save-dev definitely
```

### Usage and rationale
JavaScript allows you to access nonexistent properties on an object and simply evaluates the expression to `undefined`. Usually when this happens it's a bug, but since no error is thrown such bugs can be a difficult to debug as the problem tends to rear its ugly head far from whence it came. For example,

```javascript
const obj = {
  foo: 'bar'
}

someFunction(obj.bar)
```

`obj` has no property `bar`, so we're passing `undefined` to `someFunction`, which may pass it to another function, put it onto a queue, etc. It could be much later and in a completely different area of the code when someone tries to do something they shouldn't with that `undefined` value, at which point we'll begin the laborious process of trying to figure out where things went awry.

That's where `definitely` comes in:

```javascript
import definitely from 'definitely'

const definiteObj = definitely({
  foo: 'bar'
})

someFunction(definiteObj.bar) // throws "Error: attempted to access nonexistent property `bar`"
```

Now you've caught the bug right at the source!

### Note

The magic that enables this library is an ES2015 feature called [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), which allows intercepting arbitrary property access attempts and deciding what to do with them (in our case we throw an exception if the underlying object is missing the requisite property). `Proxy` is not yet supported in all browsers (e.g. IE and Safari) and in Node prior to version 6 requires a special flag (`--harmony-proxies`) and [shim](https://www.npmjs.com/package/harmony-proxy). If `Proxy` is not found in the global scope, this library becomes a no-op.

### See also

[`definitely-loader`](https://github.com/pelotom/definitely-loader), a Webpack loader which verifies that imported names exist within the target module.
