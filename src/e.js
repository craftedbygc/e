import SelectorSet from 'selector-set'
import {
    clone,
    eventTypes,
    handleDelegation,
    listeners,
    makeBusStack,
    maybeRunQuerySelector,
    nonBubblers,
    triggerBus
} from './utils'

/**
 * Public API
 */
export default class E {
    /**
     * Binds all provided methods to a provided context.
     *
     * @param {object} context
     * @param {array} [methods] Optional.
     */
    bindAll(context, methods) {
        if (methods === undefined) {
            methods = Object.getOwnPropertyNames(Object.getPrototypeOf(context))
        }

        for (let i = 0; i < methods.length; i++) {
            context[methods[i]] = context[methods[i]].bind(context)
        }
    }

    /**
	 * Bind event to a string, NodeList, or element.
	 *
	 * @param {string} event
	 * @param {string|NodeList|HTMLElement|Window|Document|array} el
	 * @param {*} [callback]
	 * @param {{}} [options]
	 */
    on(event, el, callback, options = {}) {
        if (typeof el === 'function' && callback === undefined) {
            makeBusStack(event)
            listeners[event].push(el)
            return
        }

        const events =  event.split(' ')

        for (let i = 0; i < events.length; i++) {
            if (el.nodeType && el.nodeType === 1 || el === window || el === document) {
                el.addEventListener(events[i], callback, options)
                continue
            }

            el = maybeRunQuerySelector(el)

            for (let n = 0; n < el.length; n++) {
                el[n].addEventListener(events[i], callback, options)
            }
        }
    }

	/**
	 * Shorthand for setting { once: true }.
	 *
	 * @param {string} event
	 * @param {string|NodeList|HTMLElement|Window|Document|array} el
	 * @param {*} [callback]
	 * @param {{}} [options]
	 */
    one(event, el, callback, options = {}) {
    	const defaults = { once: true }
    	this.on(event, el, callback, { ...options, ...defaults })
	}

    /**
     * Add a delegated event.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement} delegate
     * @param {*} [callback]
	 * @param {{}} [options]
     */
    delegate(event, delegate, callback, options = {}) {
        const events =  event.split(' ')

        for (let i = 0; i < events.length; i++) {
            let map = eventTypes[events[i]]

            if (map === undefined) {
                map = new SelectorSet()
                eventTypes[events[i]] = map

                if (nonBubblers.indexOf(events[i]) !== -1) {
                	const nonBubblersOptions = { useCapture: true }
                    document.addEventListener(events[i], handleDelegation, { ...nonBubblersOptions, ...options })
                } else {
                    document.addEventListener(events[i], handleDelegation, options)
                }
            }

            map.add(delegate, callback)
        }
    }

    /**
     * Remove a callback from a DOM element, or one or all Bus events.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Undefined} [el]
     * @param {*} [callback]
     */
    off(event, el, callback) {
        if (el === undefined) {
            listeners[event] = []
            return
        }

        if (typeof el === 'function') {
            makeBusStack(event)

            for (let i = 0; i < listeners[event].length; i++) {
                if (listeners[event][i] === el) {
                    listeners[event].splice(i, 1)
                }
            }
            return
        }

        const events =  event.split(' ')

        for (let i = 0; i < events.length; i++) {
            const map = eventTypes[events[i]]

            if (map !== undefined) {
                map.remove(el, callback)

                if (map.size === 0) {
                    delete eventTypes[events[i]]
                    document.removeEventListener(events[i], handleDelegation)
                    continue
                }
            }

            if (el.removeEventListener !== undefined) {
                el.removeEventListener(events[i], callback)
                continue
            }

            el = maybeRunQuerySelector(el)

            for (let n = 0; n < el.length;n++) {
                el[n].removeEventListener(events[i], callback)
            }
        }
    }

    /**
     * Emit a DOM or Bus event.
     *
     * @param {string} event
     * @param {array} [args]
     */
    emit(event, ...args) {
        triggerBus(event, args)
    }

    /**
     * Return a clone of the delegated event stack for debugging.
     *
     * @returns {{}}
     */
    debugDelegated() {
        return clone(eventTypes)
    }

    /**
     * Return a clone of the bus event stack for debugging.
     *
     * @returns {array}
     */
    debugBus() {
        return clone(listeners)
    }
}
