// all our jquery functions in pure javascript

// wrap
export function wrap(elements, wrapper) {
    const targets = elements.length ? elements : [elements];

    Array.from(targets)
        .reverse()
        .forEach((element, index) => {
            const child = index > 0 ? wrapper.cloneNode(true) : wrapper;
            const parent = element.parentNode;
            const sibling = element.nextSibling;
            child.appendChild(element);
            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        });
}

// create new element (divs, spans, etc)
export function createElement(type, attr, text) {
    const element = document.createElement(type);

    setAttributes(element, attr);

    if (text && text !== '') {
        element.innerText = text;
    }

    return element;
}

// add attrs to div
export function setAttributes(element, attr) {
    if (!attr || Object.keys(attr).length === 0) {
        return;
    }
    Object.entries(attr).forEach(([key, value]) => element.setAttribute(key, value));
}

// add element after
export function after(element, target) {
    target.parentNode.insertBefore(element, target.nextSibling);
}

// append element
export function append(type, parent, attr, text) {
    parent.appendChild(createElement(type, attr, text));
}

// prepend element
export function prepend(parent, element) {
    parent.insertBefore(element, parent.children[0]);   
}

// remove element
export function remove(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

// add class
export function addClass(element, className) {
    element.classList.add(className);
    return element.classList.contains(className);
}

// remove class
export function removeClass(element, className) {
    element.classList.remove(className);
    return element.classList.contains(className);
}

// if element has class
export function hasClass(element, className) {
    return element.classList.contains(className);
}

// add html
export function html(element, html) {
    element.innerHTML = html
}

// replace element
export function replaceElement(newChild, oldChild) {
    oldChild.parentNode.replaceChild(newChild, oldChild);
    return newChild;
}