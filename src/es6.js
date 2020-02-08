import SelectorSet from 'selector-set'
import {clone, eventTypes, handleDelegation, listeners, makeBusStack, maybeRunQuerySelector, triggerBus} from './utils'

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
     * @param {string|NodeList|HTMLElement|Window|Document} el
     * @param {*} [callback]
     */
    on(event, el, callback) {
        if (typeof el === 'function' && callback === undefined) {
            makeBusStack(event)
            listeners[event].push(el)
            return
        }

        if (el.nodeType && el.nodeType === 1 || el === window || el === document) {
            el.addEventListener(event, callback)
            return
        }

        el = maybeRunQuerySelector(el)

        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener(event, callback)
        }
    }

    /**
     * Add a delegated event.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement} delegate
     * @param {*} [callback]
     */
    delegate(event, delegate, callback) {
        let map = eventTypes[event]

        if (map === undefined) {
            map = new SelectorSet()
            eventTypes[event] = map
            document.addEventListener(event, handleDelegation, true)
        }

        map.add(delegate, callback)
    }

    /**
     * Remove a callback from a DOM element, or one or all Bus events.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Undefined} [el]
     * @param {*} [callback]
     */
    off(event, el, callback) {
        const map = eventTypes[event]

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

        if (map !== undefined) {
            map.remove(el, callback)

            if (map.size === 0) {
                delete eventTypes[event]
                document.removeEventListener(event, handleDelegation)
                return
            }
        }

        if (el.removeEventListener !== undefined) {
            el.removeEventListener(event, callback)
            return
        }

        el = maybeRunQuerySelector(el)

        for (let i = 0; i < el.length; i++) {
            el[i].removeEventListener(event, callback)
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
