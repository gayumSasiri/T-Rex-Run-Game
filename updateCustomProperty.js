export function getCustomProperty(elm, prop) {
    return parseFloat(getComputedStyle(elm).getPropertyValue(prop))  || 0;
}

export function setCustomProperty(elm, prop, value) {
    elm.style.setProperty(prop, value);
}

export function incrementCustomProperty(elm, prop, inc) {
    setCustomProperty(elm, prop, getCustomProperty(elm, prop) + inc);
}