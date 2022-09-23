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
class E {
    /**
     * Binds all provided methods to a provided context.
     *
     * @param {object} context
     * @param {string[]} [methods] Optional.
     */
    bindAll(context, methods) {
        if (!methods) {
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
     * @param {string|NodeList|HTMLElement|HTMLElement[]|Window|Document|function} el
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */
    on(event, el, callback, options) {
        const events = event.split(' ')

        for (let i = 0; i < events.length; i++) {
            if (typeof el === 'function' && callback === undefined) {
                makeBusStack(events[i])
                listeners[events[i]].push(el)
                continue
            }

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
     * Add a delegated event.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element} delegate
     * @param {*} [callback]
     */
    delegate(event, delegate, callback) {
        const events = event.split(' ')

        for (let i = 0; i < events.length; i++) {
            let map = eventTypes[events[i]]

            if (map === undefined) {
                map = new SelectorSet()
                eventTypes[events[i]] = map

                if (nonBubblers.indexOf(events[i]) !== -1) {
                    document.addEventListener(events[i], handleDelegation, true)
                } else {
                    document.addEventListener(events[i], handleDelegation)
                }
            }

            map.add(delegate, callback)
        }
    }

    /**
     * Remove a callback from a DOM element, or one or all Bus events.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element|Window|undefined} [el]
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */
    off(event, el, callback, options) {
        const events = event.split(' ')

        for (let i = 0; i < events.length; i++) {
            if (el === undefined) {
                listeners[events[i]] = []
                continue
            }

            if (typeof el === 'function') {
                makeBusStack(events[i])

                for (let n = 0; n < listeners[events[i]].length; n++) {
                    if (listeners[events[i]][n] === el) {
                        listeners[events[i]].splice(n, 1)
                    }
                }
                continue
            }

            const map = eventTypes[events[i]]

            if (map !== undefined) {
                map.remove(el, callback)

                if (map.size === 0) {
                    delete eventTypes[events[i]]

                    if (nonBubblers.indexOf(events[i]) !== -1) {
                        document.removeEventListener(events[i], handleDelegation, true)
                    } else {
                        document.removeEventListener(events[i], handleDelegation)
                    }
                    continue
                }
            }

            if (el.removeEventListener !== undefined) {
                el.removeEventListener(events[i], callback, options)
                continue
            }

            el = maybeRunQuerySelector(el)

            for (let n = 0; n < el.length; n++) {
                el[n].removeEventListener(events[i], callback, options)
            }
        }
    }

    /**
     * Emit a Bus event.
     *
     * @param {string} event
     * @param {...*} args
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

const instance = new E()
export default instance
