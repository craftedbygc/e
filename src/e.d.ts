export default instance;
declare const instance: E;
/**
 * Public API
 */
declare class E {
    /**
     * Binds all provided methods to a provided context.
     *
     * @param {object} context
     * @param {string[]} [methods] Optional.
     */
    bindAll(context: object, methods?: string[]): void;
    /**
     * Bind event to a string, NodeList, or element.
     *
     * @param {string} event
     * @param {string|NodeList|NodeListOf<Element>|HTMLElement|HTMLElement[]|Window|Document|function} el
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */
    on(event: string, el: string | NodeList | NodeListOf<Element> | HTMLElement | HTMLElement[] | Window | Document | Function, callback?: any, options?: {} | boolean): void;
    /**
     * Add a delegated event.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element} delegate
     * @param {*} [callback]
     */
    delegate(event: string, delegate: string | NodeList | HTMLElement | Element, callback?: any): void;
    /**
     * Remove a callback from a DOM element, or one or all Bus events.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element|Window|undefined} [el]
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */
    off(event: string, el?: string | NodeList | HTMLElement | Element | Window | undefined, callback?: any, options?: {} | boolean): void;
    /**
     * Emit a Bus event.
     *
     * @param {string} event
     * @param {...*} args
     */
    emit(event: string, ...args: any[]): void;
    /**
     * Return a clone of the delegated event stack for debugging.
     *
     * @returns {Object.<string, array>}
     */
    debugDelegated(): {
        [x: string]: any[];
    };
    /**
     * Return a clone of the bus event stack for debugging.
     *
     * @returns {Object.<string, array>}
     */
    debugBus(): {
        [x: string]: any[];
    };
    /**
     * Checks if a given bus event has listeners.
     *
     * @param {string} event
     * @returns {boolean}
     */
    hasBus(event: string): boolean;
}
