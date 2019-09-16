## Getting started


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

