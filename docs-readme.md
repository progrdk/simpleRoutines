**Code naming conventions.**  
Class/object property, prefixed with "\_\_" (double underscore), is a _public_ property that is _guaranteed_ to have _both_ a getter and a setter methods with _the same clear_ names without any prefixes or postfixes.  
E.g.,

```javascript
...

constructor() {
  this.__counter = 0;
}

get counter() {return __counter};
set counter(v) {
  typeof v === "number"
  ? this.__counter = v
  : throw new SyntaxError("Counter property can be set to a number only.")}

...
```
