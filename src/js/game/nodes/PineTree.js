import Node from './Node';
import Movable from '../properties/Movable';
import Deadly from '../properties/Deadly';

/**
 * Pine Tree
 * @class
 * @augments Node
 */
class PineTree extends Node {

    /**
     * @type {BABYLON.Mesh}
     * @private
     */
    _collider;

    /**
     * @constructor
     * @param {BABYLON.Mesh} mesh
     * @param {BABYLON.Vector3} position
     * @param {BABYLON.Scene} scene
     */
    constructor(mesh, position, scene) {
        super(mesh, position, scene);
        this.addCollider();
        this.registerActions();
        this.type = 'tree';
    }

    /**
     * Add collider mesh
     */
    addCollider() {
        this._collider = BABYLON.Mesh.CreateBox('collider', 2, this._scene);
        this._collider.position = this._position;
        this._collider.scaling.y = 4;
        this._collider.visibility = 0;
    }

    /**
     * Scale the obstacle mesh
     */
    scale() {
        this._mesh.scaling.x = 1.1;
        this._mesh.scaling.z = 1.1;
        this._mesh.scaling.y = 5.5;
    }
}

/**
 * @mixes Movable
 * @mixes Deadly
 */
Object.assign(PineTree.prototype, Movable, Deadly);

/**
 * @module nodes/PineTree
 */
export default PineTree;
