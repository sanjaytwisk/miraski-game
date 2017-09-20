import environment from './environment';
import nodeRenderer from './renderers/node';

/**
 * Config
 */
import modelConfig from './config/models';
import sceneConfig from './config/scene';
import gameConfig from './config/game';

/**
 * Processes
 */
import groundProcess from './processes/ground';
import levelProcess from './processes/level';

/**
 * Manager
 */
import modelManager from './managers/model';
import uiManager from './managers/ui';
import soundManager from './managers/sound';
import modifierManager from './managers/modifiers';
import scoreManager from './managers/score';
import stateManager from './managers/state';
import controlsManager from './managers/controls';
import physicsManager from './managers/physics';
import cameraManager from './managers/camera';

/**
 * Game
 * @class
 */
class Game {

    /**
     * @constructor
     * @param {HTMLElement} element
     * @param {Object} options
     */
    constructor(element, options) {
        this._element = element;
        this._canvas = this._element.querySelector('canvas');
        this._options = Object.assign({}, gameConfig.modifiers, options);
        this._startEngine();
        this._createScene();
        this._load();
    }

    /**
     * Start the game
     */
    startGame() {
        if (!stateManager.gameIsOver) return;
        if (stateManager.playCount) this._reset();

        stateManager.gameIsOver = false;
        uiManager.onGameStart();
        nodeRenderer.getPlayer().showIntroAnimation();
        soundManager.stopBackgroundSound();
        soundManager.playSound('background');
        this._render();
    }

    /**
     * Stop the game
     */
    stopGame() {
        this._engine.stopRenderLoop();
        stateManager.updatePlaycount();
        stateManager.gameIsOver = true;
        soundManager.playSound('scream');
        if (stateManager.playCount) uiManager.onGameStop(scoreManager.getTotal());
    }

    /**
     * Start the game Engine
     */
    _startEngine() {
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._engine.enableOfflineSupport = false;
        this._engine.setHardwareScalingLevel(1);
    }

    /**
     * Create the scene instance
     * @private
     */
    _createScene() {
        this._scene = new BABYLON.Scene(this._engine);
        Object.assign(this._scene, sceneConfig.options);
    }

    /**
     * lLoad game
     */
    _load() {
        modifierManager.load(this._options.modifiers);
        uiManager.load(this._element, this);
        scoreManager.reset();
        controlsManager.load(this);

        modelManager.load(this._scene, modelConfig)
            .then(models => {
                nodeRenderer.load(this._scene, models);
                environment.load(this._scene);
                levelProcess.load();
                groundProcess.load(this._scene);
                soundManager.load(this._scene);
                physicsManager.load();
                cameraManager.load(this._scene);
                uiManager.hideMenu();

                groundProcess.render();
                this._setupBeforeRender();
            }).catch(console.log);
    }

    /**
     * Setup before render loop
     * @private
     */
    _setupBeforeRender() {
        this._scene.render();
        this._scene.registerBeforeRender(() => {
            this._update();
        });
    }

    /**
     * Reset
     * @private
     */
    _reset() {
        scoreManager.reset();
        levelProcess.reset();
        physicsManager.reset();
        stateManager.reset();
        nodeRenderer.getPlayer().reset();
        groundProcess.reset();
    }

    /**
     * Render the game
     */
    _render() {
        this._engine.runRenderLoop(() => {
            this._scene.render();
            scoreManager.updateScore('points');
            uiManager.displayScore(scoreManager.getTotal());
            stateManager.updateClock();
        });
    }

    /**
     * Update
     * @private
     */
    _update() {
        groundProcess.update(physicsManager.speed);
        levelProcess.update(physicsManager.speed);
        physicsManager.update();

        if (stateManager.gameIsOver) {
            this.stopGame();
        } else {
            cameraManager.update();
        }
    }
}

/**
 * @module Game
 */
export default Game;
