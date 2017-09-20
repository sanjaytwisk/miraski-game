/**
 * Movable
 * @mixin
 */
const Movable = {
    /**
     * @type {Number}
     * @private
     */
    _velocity: 1,
    _active: false,

    /**
     * Move
     * @param {Number} speed
     */
    move(speed) {
        this._mesh.position.z -= (speed * this._velocity);
        if (this._collider) this._collider.position.z = this._mesh.position.z;
    },

    /**
     * Set position
     * @param {Number} position
     */
    setPosition(position) {
        this._mesh.position = position;
        if (this._collider) this._collider.position = position;
    },

    /**
     * Should deactivate
     * @return {Boolean}
     */
    shouldDeactivate() {
        return this._mesh.position.z < -18;
    },

    /**
     * activate
     * @param {Number} position
     */
    activate(position) {
        this._active = true;
        if (position) this.setPosition(position);
    },

    /**
     * deactivate
     */
    deactivate() {
        this._active = false;
    },

    /**
     * is active
     * @return {Boolean}
     */
    isActive() {
        return this._active;
    }
};

/**
 * @module properties/Movable
 */
export default Movable;
