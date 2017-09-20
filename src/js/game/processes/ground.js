import groundRenderer from '../renderers/ground';
import scoreManager from '../managers/score';
import levelProcess from './level';

/**
 * Ground Process
 * @class
 */
class groundProcess {
    /**
     * Reset
     * @param {number} ground
     * @param {number} speed
     */
    static resetGround(ground, speed) {
        ground.position.z = groundRenderer.length - 20 - speed;
    }

    /**
     * Move
     * @param {object} ground
     * @param {number} speed
     */
    static moveGround(ground, speed) {
        ground.position.z -= speed;
    }

    /**
     * Store for the GroundMesh instances
     * @type {array}
     * @private
     */
    _grounds = [];

    /**
     * @constructor
     * @param {object} game
     * @param {object} scene
     */
    load(scene) {
        this._scene = scene;
    }

    /**
     * Update
     * @public
     * @param {number} speed
     */
    update(speed) {
        this._grounds.forEach(ground => groundProcess.moveGround(ground, speed));
        if (this.shouldChangeOrder(speed)) this._changeOrder(speed);
    }

    /**
     * Render
     * Renders two instances of GroundMesh
     */
    render() {
        this._grounds = [this._scene, this._scene].map(groundRenderer.renderGround.bind(groundRenderer));
        this.reset();
    }

    /**
     * Reset
     * Re-positions both the GroundMesh instances
     */
    reset() {
        const [first, second] = this._grounds;
        first.position.z = -10;
        second.position.z = groundRenderer.length - 20;
    }

    /**
     * Should change order
     * @param {Number} speed
     * @return {Boolean}
     */
    shouldChangeOrder(speed) {
        const [ current ] = this._grounds;
        const threshold = current.position.z;
        return threshold < -500 && threshold > -501 - speed;
    }

    /**
     * Change order
     * Switches the order of
     * the GroundMesh instances
     * @param {Number} speed
     * @private
     */
    _changeOrder(speed) {
        const [ first ] = this._grounds;
        groundProcess.resetGround(first, speed);
        this._grounds.reverse();
        levelProcess.create();
        scoreManager.updateScore('sections');
    }
}

/**
 * @module processes/ground
 * @singleton
 */
export default new groundProcess();
