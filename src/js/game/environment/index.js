import snowfall from './snowfall';
import config from '../config/environment';

/**
 * Environment
 * @class
 */
class Environment {

    /**
     * load environment
     * @param {BABYLON.Scene} scene
     */
    load(scene) {
        this._scene = scene;
        this._drawSky();
        this._drawFog();
        this._drawSnow();
        this._setupLights();
    }

    /**
     * Create Sky
     */
    _drawSky() {
        const skyMaterial = new BABYLON.SkyMaterial('skyMaterial', this._scene);
        const skybox = BABYLON.Mesh.CreateBox('skyBox', 1000.0, this._scene);
        Object.assign(skyMaterial, config.sky);
        skybox.material = skyMaterial;
        skybox.position.y = 500;
    }

    /**
     * Create Fog
     */
    _drawFog() {
        Object.assign(this._scene, config.fog);
    }

    /**
     * Draw snow
     */
    _drawSnow() {
        snowfall.load(this._scene);
    }

    /**
     * Create Lights
     */
    _setupLights() {
        const lightPositions =  [new BABYLON.Vector3(-40, 900, 10), new BABYLON.Vector3(40, 900, 10)];
        this._light = new BABYLON.HemisphericLight('1', new BABYLON.Vector3(0, 400, 20), this._scene);
        this._light.diffuse = new BABYLON.Color4(.88, .94, 1, .5);
        this._light.specular = new BABYLON.Color3(0, 0, 0);
        this._light.intensity = 1;

        lightPositions
            .map(position => new BABYLON.PointLight('1', position, this._scene))
            .forEach(light => {
                light.intensity = .015;
                light.diffuse = new BABYLON.Color3(1, 1, 1);
            });
    }
}

/**
 * @module environment
 * @singleton
 */
export default new Environment();
