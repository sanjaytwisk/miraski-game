/**
 * match a key code against a list of keys
 * @param {Number} keyCode
 * @param {Array} keys
 * @return {Boolean}
 */
export const matchKeys = (keyCode, keys) => {
    return keys.find(code => code === keyCode);
};
