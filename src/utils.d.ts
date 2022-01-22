/**
 * Holds the SelectorSets for each event type
 * @type {{}}
 */
export const eventTypes: {};
/**
 * Holds Bus event stacks
 * @type {{}}
 */
export const listeners: {};
/**
 * Events that don't bubble
 * @type {string[]}
 */
export const nonBubblers: string[];
/**
 * Make a bus stack if not already created.
 *
 * @param {string} event
 */
export function makeBusStack(event: string): void;
/**
 * Trigger a bus stack.
 *
 * @param {string} event
 * @param args
 */
export function triggerBus(event: string, args: any): void;
/**
 * Maybe run querySelectorAll if input is a string.
 *
 * @param {HTMLElement|Element|string} el
 * @returns {NodeListOf<Element>}
 */
export function maybeRunQuerySelector(el: HTMLElement | Element | string): NodeListOf<Element>;
/**
 * Handle delegated events
 *
 * @param {Event} e
 */
export function handleDelegation(e: Event): void;
/**
 * Creates a deep clone of an object.
 *
 * @param object
 * @returns {object|array}
 */
export function clone(object: any): object | any[];
