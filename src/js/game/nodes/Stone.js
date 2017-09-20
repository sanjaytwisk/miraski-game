import Node from './Node';
import Movable from '../properties/Movable';
import Deadly from '../properties/Deadly';

/**
 * Stone
 * @class
 * @augments Node
 */
class Stone extends Node {
    /**
     * @constructor
     * @param {BABYLON.Mesh} mesh
     * @param {BABYLON.Vector3} position
     * @param {BABYLON.Scene} scene
     */
    constructor(mesh, position, scene) {
        super(mesh, position, scene);
        this.registerActions();
        this.type = 'stone';
    }
}

/**
 * @mixes Movable
 * @mixes Deadly
 */
Object.assign(Stone.prototype, Movable, Deadly);

/**
 * @module nodes/Stone
 */
export default Stone;
