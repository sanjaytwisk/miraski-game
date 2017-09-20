import config from '../config/modifiers';

/**
 * get modifier values
 * @param {Object} modifiers
 * @return {Object}
 */
const getModifierValues = modifiers => {
    return Object
        .entries(modifiers)
        .reduce((val, [modifier, value]) => {
            val[modifier] = config.options[modifier][value];
            return val;
        }, {});
};

/**
 * Modifiers Manager
 * @class
 */
class ModifiersManager {
    /**
     * @type {null|Object}
     * @private
     */
    _modifiers = null;

    /**
     * load
     * @param {Object} modifiers
     */
    load(modifiers) {
        this._modifiers = getModifierValues(modifiers);
    }

    /**
     * @getter
     * @return {null|Object}
     */
    get modifiers() {
        return this._modifiers;
    }
}

/**
 * @module managers/modifiers
 * @singleton
 */
export default new ModifiersManager();
