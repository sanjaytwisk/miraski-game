import nodeRenderer from '../renderers/node';
import stateManager from '../managers/state';

/**
 * Deadly
 * @mixin
 */
const Deadly = {
    /**
     * Register an action for collision with player
     * so we can determine when the player is killed
     */
    registerActions() {
        const addTo = this._collider ? this._collider : this._mesh;
        const player = nodeRenderer.getPlayer()._mesh;
        const killAction = new BABYLON.SwitchBooleanAction({
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: player
        }, stateManager, '_gameOver');

        addTo.actionManager = new BABYLON.ActionManager(this._scene);
        addTo.actionManager.registerAction(killAction);
    }
};

/**
 * @module properties/Deadly
 */
export default Deadly;
