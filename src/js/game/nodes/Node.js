import helper from '../helpers/mesh';

/**
 * Node
 * @class
 * @abstract
 */
class Node {
    /**
     * @type {Boolean|BABYLON.Mesh}
     * @private
     */
    _collider = false;

    /**
     * @type {null|String}
     */
    type = null;

    /**
     * @constructor
     * @param {BABYLON.Mesh} mesh
     * @param {BABYLON.Vector3} position
     * @param {BABYLON.Scene} scene
     */
    constructor(mesh, position, scene) {
        this._scene = scene;
        this._mesh = helper.cloneMesh(mesh, position);
        this._name = mesh.name;
        this._position = position;
    }

    /**
     * Reset position
     */
    resetPosition() {
        this._mesh.position = new BABYLON.Vector3(-100, -100, -100);
        if (this._collider) this._collider.position = this._mesh.position;
    }

    /**
     * Get mesh
     * @return {BABYLON.Mesh}
     */
    getMesh() {
        return this._mesh;
    }
}

/**
 * @module nodes/Node
 */
export default Node;
