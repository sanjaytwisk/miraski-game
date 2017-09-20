import baseUrl from '../helpers/baseUrl';
import config from '../config/environment';
import physicsManager from '../managers/physics';

/**
 * Snowfall
 * @class
 */
class Snowfall {

    /**
     * Load the obstacle instance
     * @param {BABYLON.Scene} scene
     */
    load(scene) {
        this._emitRate = 500;
        this._scene = scene;
        this.createMesh();
        this.createParticleSystem();
        this.position();
        this.rotation();
    }

    /**
     * Create the obstacle mesh
     */
    createMesh() {
        this._mesh = BABYLON.Mesh.CreateBox('foutain', .1, this._scene);
    }

    /**
     * Create the particle system
     */
    createParticleSystem() {
        this._particleSystem = new BABYLON.ParticleSystem('particle', 3500, this._scene);
        this._particleSystem.particleTexture = new BABYLON.Texture(`${baseUrl}/images/driehoek.svg`, this._scene);

        // add particle system onto the mesh
        this._particleSystem.emitter = this._mesh;
        this._particleSystem.minEmitBox = new BABYLON.Vector3(-30, 0, 0);
        this._particleSystem.maxEmitBox = new BABYLON.Vector3(30, 0, 0);

        Object.assign(this._particleSystem, config.snow);

        // set emission rate
        this._particleSystem.emitRate = this._emitRate * physicsManager.speed;

        // init particle system
        this._particleSystem.start();
    }

    /**
     * Set position of Mesh
     */
    position() {
        this._mesh.position.y = 20;
        this._mesh.position.z = 15;
    }

    /**
     * Set rotation of Mesh
     */
    rotation() {
        this._mesh.rotation.x = Math.PI / 3;
        this._mesh.rotation.z = Math.PI;
    }

    /**
     * set update speed
     * @param {Number} speed
     */
    setUpdateSpeed(speed) {
        const updatedSpeed = config.snow.updateSpeed * speed;
        if (this._particleSystem.updateSpeed !== updatedSpeed) {
            this._particleSystem.updateSpeed = updatedSpeed;
        }
    }

    /**
     * Get the mesh Object
     * @return {BABYLON.Mesh}
     */
    getMesh() {
        return this._mesh;
    }
}

/**
 * @module environment/snowfall
 * @singleton
 */
export default new Snowfall();
