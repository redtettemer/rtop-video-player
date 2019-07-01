// pure javascript of jquery clone and extend

// make sure it exists
const getConstructor = input => (input !== null && typeof input !== 'undefined' ? input.constructor : null);

// jquery clone 
export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

// jquery extend
export function extend(target = {}, ...sources) {
    if (!sources.length) {
        return target;
    }
    
    const source = sources.shift();

    if (getConstructor(source) !== Object) {
        return target;
    }

    Object.keys(source).forEach(key => {
        if (getConstructor(source[key]) === Object) {
            if (!Object.keys(target).includes(key)) {
                Object.assign(target, { [key]: {} });
            }

            extend(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    });

    return extend(target, ...sources);
}
