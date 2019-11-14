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
        let map = this.#eventTypes[name]

        if (map === undefined) {
            map = new SelectorSet()
            this.#eventTypes[event] = map
            document.addEventListener(event, this.#handleDelegation)
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
     * @param {string|NodeList|HTMLElement|Undefined} [el]
     */
    emit(event, el) {
        if (el === undefined) {
            this.triggerBus(event)
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

    /**
     * Trigger a bus stack.
     *
     * @param {string} event
     */
    triggerBus(event) {
        if (this.#listeners[event]) {
            for (let i = 0; i < this.#listeners[event].length; i++) {
                this.#listeners[event][i]()
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
        const matches = this.#eventTypes[e.type].matches(e.target)

        for (let i = 0; i < matches.length; i++) {
            matches[i].data(e)
        }
    }

    /**
     * Fires an event programmatically
     *
     * @param {string} event
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
