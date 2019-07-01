// trigger a custom event to listen to 

import controls from '../player/controls';

// trigger custom events
export function trigger(element, type, info) {
    element.dispatchEvent(new CustomEvent(type, {
        bubbles: true,
        info: Object.assign({}, info, { VideoPlayer: this, type })
    }));
}

// add the listeners for each video event
export function listener(element, event, callback, bool) {
    event.split(' ').forEach(type => {
        if (this._eventListeners && bool) {
            this._eventListeners.push({ element, type, callback });
        }
        element[bool ? 'addEventListener' : 'removeEventListener'](type, () => {callback(controls.getData.call(this, type))}, { bubbles: true });
    });
}

// jquery on
export function on(element, events, callback) {
    listener.call(this, element, events, callback, true);
}

// jquery off
export function off(element, events, callback) {
    listener.call(this, element, events, callback, false);
}

// unbind everythind on destroy
export function unbindAll() {
    if (this._eventListeners) {
        this._eventListeners.forEach(item => {
            const { element, type, callback, options } = item;
            element.removeEventListener(type, callback, options);
        });
        this._eventListeners = [];
    }
}