# definitely
Find `undefined` property bugs close to the source.

### Installation

$ npm install --save-dev definitely-loader

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
