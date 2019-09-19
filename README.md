## Getting started

In order to use, `e` must be instanstiated:

````js
Const E = new e()
````


## Using e

### `on`
The `on` method has the same arguments as it's jQuery counterpart:

````js
E.on('click', '.js-open', callback)

// Also accepts NodeLists
E.on('click', document.querySelectorAll('.btn'), callback)

// With a HTMLElement
E.on('click', document.getElementById('unique'), callback)
````

### `delegate`
Events bound with `delegate` are bound to the `document` instead of the element, which removes the need to rebind/remove events during page transitions, or when the DOM updates after load.

Intercepted events are dispatched to the correct handler using [Selector Set](https://github.com/josh/selector-set), which matches the event target element [incredibly efficiently](https://github.com/josh/selector-set#inspired-by-browsers).

The `delegate` method currently only accepts a selector string to match elements:
````js
E.delegate('click', '.js-open', callback)
````

### `off`




### Binding handlers to maintain scope
There are many ways to ensure that your event handlers keep the correct context when working with OO.

#### Closure method (preferred)

Probably the simplest method way to keep scope in handlers:

````js
class Foo {
    bar = (e) => {
        console.log(this)
    }
}
````

#### Using `bindAll`

`Unseen.e` has a handy `bindAll` method if you prefer to do it the old fashioned way:
````js
class Foo {
    constructor() {
        Unseen.e.bindAll(this, ['bar'])
    }

    bar() {
        console.log(this)
    }
}
````

You can also call `bindAll` without providing any methods to automatically bind all public methods to the current instance:

````js
class Foo {
    constructor() {
        // Will bind bar, but not privateBar
        Unseen.e.bindAll(this)
    }

    bar() {
        console.log(this)
    }
    
    #privateBar() {
    
    }
}
````

