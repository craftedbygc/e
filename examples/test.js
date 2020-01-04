import e from '../src/e'

const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')
const btn4 = document.getElementById('btn4')

const E = new e

class Foo {

    static bar = 'foobar'

    init() {
        E.bindAll(this)
        E.on('click', btn, this.eventHandler)
        E.on('click', btn2, this.offHandler)
        E.delegate('click','#btn3', this.onceHandler)
        E.delegate('click','.deep', this.delegateHandler)
        E.delegate('mouseenter', '#mouseover', (e) => console.log('delegated mouse enter'))
        E.delegate('mouseleave', '#mouseover', (e) => console.log('delegated mouse leave'))

        // Event bus example
        E.on('event.bus.event', this.listener)
        E.on('click', '#bus-test', this.triggerBus)
        E.on('click', '#bus-off', this.removeBus)
    }

    onceHandler(e) {
        console.log('delegated event target test', e)
    }

    eventHandler(e) {
        console.log('Dom event test', e)
    }

    delegateHandler(e) {
        console.log('delegated nested event target test', e)
    }

    triggerBus() {
        console.log('triggering event.bus.event event')
        E.emit('event.bus.event', 'one', 2)
    }

    removeBus() {
        E.off('event.bus.event', this.listener)
    }

    listener(arg1, arg2) {
        console.log('Triggered via the event bus!', arg1, arg2)
    }

    offHandler = () => {
        E.off('click', btn, this.onceHandler)
        E.off('click', '#btn3', this.onceHandler)
    }
}

let bar = new Foo()
bar.init()


