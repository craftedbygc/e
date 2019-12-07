import WeakSetPoly from './WeakSet'
import SelectorSet from 'selector-set'

export default class e {
    /**
     * Holds the SelectorSets for each event type
     * @type {{}}
     */
    #eventTypes = {}

    /**
     * Holds Bus event stacks
     * @type {{}}
     */
    #listeners = {}

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
     * @param {string|NodeList|HTMLElement} el
     * @param {*} [callback]
     */
    on(event, el, callback) {
        if (typeof el === 'function' && callback === undefined) {
            this.#makeBusStack(event)
            this.#listeners[event].push(el)
            return
        }

        if (el.nodeType && el.nodeType === 1) {
            el.addEventListener(event, callback)
            return
        }

        el = this.#maybeRunQuerySelector(el)

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
        let map = this.#eventTypes[event]

        if (map === undefined) {
            map = new SelectorSet()
            this.#eventTypes[event] = map
            document.addEventListener(event, this.#handleDelegation, true)
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
        const map = this.#eventTypes[event]

        if (el === undefined) {
            this.#listeners[event] = []
            return
        }

        if (typeof el === 'function') {
            this.#makeBusStack(event)

            for (let i = 0; i < this.#listeners[event].length; i++) {
                if (this.#listeners[event][i] === el) {
                    this.#listeners[event].splice(i, 1)
                }
            }
            return
        }

        if (map !== undefined) {
            map.remove(el, callback)

            if (map.size === 0) {
                delete this.#eventTypes[event]
                document.removeEventListener(event, this.#handleDelegation)
                return
            }
        }

        if (el.removeEventListener !== undefined) {
            el.removeEventListener(event, callback)
            return
        }

        el = this.#maybeRunQuerySelector(el)

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
        this.#triggerBus(event, args)
    }

    /**
     * Trigger a bus stack.
     *
     * @param {string} event
     */
    #triggerBus(event, args) {
        if (this.#listeners[event]) {
            for (let i = 0; i < this.#listeners[event].length; i++) {
                this.#listeners[event][i](...args)
            }
        }
    }

    /**
     * Maybe run querySelectorAll if input is a string.
     *
     * @param {HTMLElement|string} el
     * @returns {NodeListOf<Element>}
     */
    #maybeRunQuerySelector(el) {
        return typeof el === 'string' ? document.querySelectorAll(el) : el
    }

    /**
     * Make a bus stack if not already created.
     *
     * @param {string} event
     */
    #makeBusStack(event) {
        if (this.#listeners[event] === undefined) {
            this.#listeners[event] = []
        }
    }

    /**
     * Handle delegated events
     *
     * @param {Event} e
     */
    #handleDelegation = e => {
        let matches = this.#traverse(this.#eventTypes[e.type], e.target)

        if (matches.length) {
            for (let i = 0; i < matches.length; i++) {
                for (let i2 = 0; i2 < matches[i].stack.length; i2++) {
                    this.#addDelegateTarget(e, matches[i].delegatedTarget)
                    matches[i].stack[i2].data(e)
                }
            }
        }
    }

    /**
     * Find a matching selector for delegation
     *
     * @param {SelectorSet} listeners
     * @param {HTMLElement} target
     * @returns {[]}
     */
    #traverse(listeners, target) {
        const queue = []
        let node = target

        do {
            if (node.nodeType !== 1) {
                break
            }

            const matches = listeners.matches(node)

            if (matches.length) {
                queue.push({delegatedTarget: node, stack: matches})
            }
        } while ((node = node.parentElement))

        return queue
    }

    /**
     * Add delegatedTarget attribute to dispatched delegated events
     *
     * @param {Event} event
     * @param {HTMLElement} delegatedTarget
     */
    #addDelegateTarget(event, delegatedTarget) {
        Object.defineProperty(event, 'delegatedTarget', {
            configurable: true,
            enumerable: true,
            value: delegatedTarget
        });
    }
}
