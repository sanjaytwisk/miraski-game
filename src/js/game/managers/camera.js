import nodeRenderer from '../renderers/node';

/**
 * CameraManager
 * @class
 */
class CameraManager {
    /**
     * @type {BABYLON.FreeCamera|null}
     * @private
     */
    _camera = null;

    /**
     * load manager
     * @param {BABYLON.Scene} scene
     */
    load(scene) {
        this._camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 7, -20), scene);
        scene.activeCamera = this._camera;
        scene.activeCamera.rotation.x = Math.PI / 25;
    }

    /**
     * update camera
     */
    update() {
        this._camera.position.x = 0.65 * nodeRenderer.getPlayer().position.x;
    }
}

/**
 * @module managers/camera
 * @singleton
 */
export default new CameraManager();
