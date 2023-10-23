import E from '../src/e'

const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')


class Foo {
	init() {
		E.bindAll(this)

		E.on('resize', window, e => console.log('window resized!'))
		E.on('click', btn, this.eventHandler, { capture: true })
		E.off('click', btn, this.eventHandler, { capture: true })
		E.on('click', btn2, this.offHandler)
		E.on('click', '#btnone', this.one, { once: true })
		E.delegate('click', '#btn3', this.onceHandler)
		E.delegate('click', '.deep', this.delegateHandler)

		E.on('mouseenter', document.querySelectorAll('.nodelist'), () => console.log('nodelist'))
		E.on('mouseenter', [...document.querySelectorAll('.nodelist')], () => console.log('nodelist array'))

		E.delegate('mouseenter', '#mouseover', this.delegatedMouseEnter)
		E.delegate('mouseleave', '#mouseover', this.delegatedMouseLeave)
		//E.off('mouseenter', '#mouseover', this.delegatedMouseEnter)
		//E.off('mouseleave', '#mouseover', this.delegatedMouseLeave)

		E.delegate('blur focus', '.delegatedblurfocus', (e) => console.log(`delegated ${e.type}`))

		E.delegate('click', 'button, h2', () => console.log('qs example'))

		// Event bus example
		E.on('event.bus.event event.bus.event2', this.listener)
		E.on('event.bus.removal', this.removalTest1)
		E.on('event.bus.removal', this.removalTest2)
		E.on('event.bus.removal', this.removalTest3)
		E.on('click', '#bus-test', this.triggerBus)
		E.on('click', '#bus-off', this.removeBus)

		console.log(E.hasBus('doesnt exist'), E.debugDelegated())
	}

	delegatedMouseEnter() {
		console.log('delegated mouse enter')
	}

	delegatedMouseLeave() {
		console.log('delegated mouse leave')
	}

	one() {
		console.log('one!')
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

	removalTest1() {
		console.log('removal test 1')
		E.off('event.bus.removal', this.removalTest1)
	}

	removalTest2() {
		console.log('removal test 2')
	}

	removalTest3() {
		console.log('removal test 3')
	}

	triggerBus() {
		console.log('triggering event.bus.event event')
		E.emit('event.bus.event', 'one', 2)
		E.emit('event.bus.event2', 'two', 2)
		E.emit('event.bus.removal')
	}

	removeBus() {
		console.log('bus off')
		E.off('event.bus.event', this.listener)
	}

	listener(arg1, arg2) {
		console.log('Triggered via the event bus!', arg1, arg2)
	}

	offHandler = () => {
		E.off('click', btn, this.onceHandler)
		E.off('click', '#btn3', this.onceHandler)
		E.off('click', '#btnone', this.one)
	}
}

let bar = new Foo()
bar.init()


