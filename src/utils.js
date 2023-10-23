/**
 * Holds the SelectorSets for each event type
 * @type {{}}
 */
const eventTypes = {}

/**
 * Holds Bus event stacks
 * @type {{}}
 */
const listeners = {}

/**
 * Events that don't bubble
 * @type {string[]}
 */
const nonBubblers = ['mouseenter', 'mouseleave', 'pointerenter', 'pointerleave', 'blur', 'focus']

/**
 * Make a bus stack if not already created.
 *
 * @param {string} event
 */
function makeBusStack(event) {
    if (listeners[event] === undefined) {
        listeners[event] = new Set()
    }
}

/**
 * Trigger a bus stack.
 *
 * @param {string} event
 * @param args
 */
function triggerBus(event, args) {
    if (listeners[event]) {
        listeners[event].forEach(cb => {
            cb(...args)
        })
    }
}

/**
 * Maybe run querySelectorAll if input is a string.
 *
 * @param {HTMLElement|Element|string} el
 * @returns {NodeListOf<Element>}
 */
function maybeRunQuerySelector(el) {
    return typeof el === 'string' ? document.querySelectorAll(el) : el
}

/**
 * Handle delegated events
 *
 * @param {Event} e
 */
function handleDelegation(e) {
    let matches = traverse(eventTypes[e.type], e.target)

    if (matches.length) {
        for (let i = 0; i < matches.length; i++) {
            for (let i2 = 0; i2 < matches[i].stack.length; i2++) {
                if (nonBubblers.indexOf(e.type) !== -1) {
                    addDelegateTarget(e, matches[i].delegatedTarget)
                    if (e.target === matches[i].delegatedTarget) {
                        matches[i].stack[i2].data(e)
                    }
                } else {
                    addDelegateTarget(e, matches[i].delegatedTarget)
                    matches[i].stack[i2].data(e)
                }
            }
        }
    }
}

/**
 * Find a matching selector for delegation
 *
 * @param {SelectorSet} listeners
 * @param {HTMLElement|Element|EventTarget} target
 * @returns {[]}
 */
function traverse(listeners, target) {
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
 * @param {HTMLElement|Element} delegatedTarget
 */
function addDelegateTarget(event, delegatedTarget) {
    Object.defineProperty(event, 'currentTarget', {
        configurable: true,
        enumerable: true,
		get: () => delegatedTarget
    })
}

/**
 * Creates a deep clone of an object.
 *
 * @param object
 * @returns {Object.<string, array>}
 */
function clone(object) {
    const copy = {}

    for (const key in object) {
        copy[key] = [...object[key]]
    }

	return copy
}

export {
    eventTypes,
    listeners,
    nonBubblers,
    makeBusStack,
    triggerBus,
    maybeRunQuerySelector,
    handleDelegation,
    clone
}
