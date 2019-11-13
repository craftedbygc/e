import WeakSetPoly from './WeakSet'
import SelectorSet from 'selector-set'

export default class e {

    /**
     * Holds the SelectorSets for each event type
     * @type {{}}
     */
    #eventTypes = {}

    #listeners = {}

    /**
     * Boot it up, Baby
     */
    constructor() {
        this.#polyfill()
    }

    /**
     * Binds all provided methods to a provided context.
     *
     * @param {object} context
     * @param {array} methods Optional.
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
     * @param {String} event
     * @param {String|NodeList|HTMLElement} el
     * @param callback
     */
    on(event, el, callback) {
        if (typeof el === 'function' && callback === undefined) {
            if (this.#listeners[event] === undefined) {
                this.#listeners[event] = []
            }

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

    delegate(event, delegate, callback) {
        let map = this.#eventTypes[name]

        if (map === undefined) {
            map = new SelectorSet()
            this.#eventTypes[event] = map
            document.addEventListener(event, this.#handleDelegation)
        }

        map.add(delegate, callback)
    }

    off(event, el, callback) {
        const map = this.#eventTypes[event]

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

    emit(event, el) {
        if (el === undefined) {
            if (this.#listeners[event]) {
                for (let i = 0; i < this.#listeners[event].length; i++) {
                    this.#listeners[event][i]()
                }
            }
            return
        }

        if (el.nodeType && el.nodeType === 1) {
            this.#triggerEvent(event, el)
            return
        }
        
        el = this.#maybeRunQuerySelector(el)

        for (let i = 0; i < el.length; i++) {
            this.#triggerEvent(event, el[i])
        }
    }

    #maybeRunQuerySelector(el) {
        return typeof el === 'string' ? document.querySelectorAll(el) : el
    }

    /**
     * Handle delegated events
     *
     * @param {Event} e
     */
    #handleDelegation = e => {
        const matches = this.#eventTypes[e.type].matches(e.target)

        for (let i = 0; i < matches.length; i++) {
            matches[i].data(e)
        }
    }

    /**
     * Fires an event programmatically
     *
     * @param {String} event
     * @param {HTMLElement} el
     * @returns {boolean}
     */
    #triggerEvent(event, el) {
        return el.dispatchEvent(
            new CustomEvent(event, {
                bubbles: true,
                cancelable: true,
                detail: null
            })
        )
    }

    /**
     * Polyfill the CustomEvent constructor for IE11
     */
    #polyfill() {
        if (typeof window.CustomEvent !== "function") {
            window.CustomEvent = function (event, params) {
                params = params || {bubbles: true, cancelable: true, detail: null}
                let evt = document.createEvent('CustomEvent')
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
                return evt
            }
        }
    }
}
