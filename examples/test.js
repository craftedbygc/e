import e from '../src/e'

const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')
const btn4 = document.getElementById('btn4')

const E = new e

class Foo {

    static bar = 'foobar'

    init() {
        //E.bindAll(this)

        E.on('click', btn, this.onceHandler)
        E.on('click', btn2, this.offHandler)
        E.delegate('click','#btn3', this.onceHandler)
        E.on('click', btn4, this.triggerHandler)

        E.on('click', 'div .deep', this.onceHandler)
    }

    onceHandler(e) {
        console.log('foobar', e.target)
    }

    triggerHandler(e) {
        E.emit('click', btn)
    }

    offHandler = () => {
        E.off('click', btn, this.onceHandler)
        E.off('click', '#btn3', this.onceHandler)
    }
}

let bar = new Foo()
bar.init()


