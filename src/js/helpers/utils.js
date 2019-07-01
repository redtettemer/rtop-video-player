// useful utility functions

import loadjs from 'loadjs';

// get a random id if needed
export function generateRandomId() {
    return Math.random().toString(36).substr(2, 12);
}

// format time into seconds
export function timeFormat(s) {
    let fm = [
        Math.floor(s/60)%60,
        Math.floor(s%60)
    ];
    return fm.map((v,i) => { return ( (v < 10) ? '0' : '' ) + v; }).join(':');
}

// browser specific
export function runPrefixMethod(obj, method) {
    let pfx = ["webkit", "moz", "ms", "o", ""];
    let p = 0;
    let m;
    let t;
    while (p < pfx.length && !obj[m]) {
      	m = method;
        if (pfx[p] == "") {
            m = m.substr(0,1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = toType(obj[m]);
        if (t !== "undefined") {
        	pfx = [pfx[p]];
			return (t === "function" ? obj[m]() : obj[m]);
		}
        p++;
    }
}

export function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// load vimeo or youtube api script
export function loadScript(url) {
    return new Promise((resolve, reject) => {
        loadjs(url, {
            success: resolve,
            error: reject,
        });
    });
}