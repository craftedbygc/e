/**
 * @module WeakSet
 */

if (typeof window.WeakSet !== 'function') {
    let counter = Date.now() % 1e9

    window.WeakSet = window.WeakSet || function (data) {
        this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__')
        data && data.forEach && data.forEach(this.add, this)
    }

    let proto = window.WeakSet.prototype

    proto['add'] = function (val) {
        let name = this.name
        if (!val[name]) Object.defineProperty(val, name, {value: true, writable: true})
        return this
    }

    proto['delete'] = function (val) {
        if (!val[this.name]) return false
        val[this.name] = undefined
        return true
    }

    proto['has'] = function (val) {
        return !!val[this.name]
    }
}

module.exports = window.WeakSet