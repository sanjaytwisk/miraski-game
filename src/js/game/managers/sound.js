import sounds from '../config/sound';
import nodeRenderer from '../renderers/node';

/**
 * Sound Manager
 * @class
 */

class SoundManager {

    /**
     * Load module
     * @param {Object} scene
     */
    load(scene) {
        this._scene = scene;
        this._mute = localStorage.getItem('sound');
        this.sounds = sounds.map(this._loadSound.bind(this));
        if (this._mute && this._mute === 'mute') this.mute();
    }

    /**
     * Plat sound
     * @param {String} soundName
     */
    playSound(soundName) {
        const sound = this.sounds.find(({ name }) => name === soundName);
        if (sound) sound.play();
    }

    /**
     * Stop background sound
     */
    stopBackgroundSound() {
        this.sounds.find(({ name }) => name === 'background').stop();
    }

    /**
     * Stop boost sound
     */
    stopBoostSound() {
        this.sounds.find(sound => sound.name === 'boost').stop();
    }

    /**
     * Mute sound
     */
    mute() {
        this.sounds.forEach(sound => sound.setVolume(0));
        localStorage.setItem('sound', 'mute');
    }

    /**
     * Un-mute sound
     */
    unmute() {
        this.sounds.forEach(sound => {
            const original = sounds.find(originalSound => originalSound.name === sound.name);
            if (original) sound.setVolume(original.settings.volume);
        });
        localStorage.setItem('sound', 'unmute');
    }

    /**
     * Load sound
     * @param {Object} sound
     * @return {Object}
     * @private
     */
    _loadSound(sound) {
        let loadedSound = new BABYLON.Sound(sound.name, sound.file, this._scene, null, sound.settings);
        if (sound.follow) loadedSound.attachToMesh(nodeRenderer.getPlayer().getMesh());
        return loadedSound;
    }
}

/**
 * @module managers/sound
 * @singleton
 */
export default new SoundManager();
