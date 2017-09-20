import nodeRenderer from '../renderers/node';
import soundManager from './sound';
import stateManager from './state';
import { matchKeys } from '../helpers/event';
/**
 * move left keycodes
 * @type {[Number,Number,Number]}
 */
const MOVE_LEFT_KEYS = [33, 37, 65];

/**
 * move right keycodes
 * @type {[Number,Number,Number]}
 */
const MOVE_RIGHT_KEYS = [34, 39, 68];

/**
 * boost keycodes
 * @type {[Number,Number,Number]}
 */
const BOOST_KEYS = [38, 87, 190];

/**
 * start keycodes
 * @type {[Number,Number]}
 */
const START_KEYS = [32];

/**
 * cancel save key codes
 * @type {[Number]}
 */
const CANCEL_SAVE_KEYS = [27];

/**
 * Controls manager
 * @singleton
 */
class ControlsManager {
    /**
     * @type {null|Game}
     * @private
     */
    _game = null;

    /**
     * @type {Boolean}
     * @private
     */
    _keydown = false;

    /**
     * @type {Boolean}
     * @private
     */
    _boostIsActive = false;

    /**
     * Load manager
     * @param {Game} game
     */
    load(game) {
        this._game = game;
        this._addEventListeners();
    }

    /**
     * @get _boostIsActive
     * @return {Boolean}
     */
    get boostIsActive() {
        return this._boostIsActive;
    }

    /**
     * @set _boostIsActive
     * @param {Boolean} isActive
     */
    set boostIsActive(isActive) {
        this._boostIsActive = isActive;
    }

    /**
     * Add event listeners
     * @private
     */
    _addEventListeners() {
        document.addEventListener('keydown', evt => this._movePlayerLeft(evt));
        document.addEventListener('keydown', evt => this._movePlayerRight(evt));
        document.addEventListener('keydown', evt => this._startBoost(evt));
        document.addEventListener('keyup', evt => this._stopBoost(evt));
        document.addEventListener('keydown', evt => this._startGame(evt));
        window.addEventListener('resize', () => this._onResize(), false);
        this._onResize();
    }

    /**
     * Move player to the left
     * @param {Number} keyCode
     * @private
     */
    _movePlayerLeft({ keyCode }) {
        if (!matchKeys(keyCode, MOVE_LEFT_KEYS)) return;
        nodeRenderer.getPlayer().moveLeft();
    }

    /**
     * Move player to the right
     * @param {Number} keyCode
     * @private
     */
    _movePlayerRight({ keyCode }) {
        if (!matchKeys(keyCode, MOVE_RIGHT_KEYS)) return;
        nodeRenderer.getPlayer().moveRight();
    }

    /**
     * Start boost speed
     * @param {Number} keyCode
     * @private
     */
    _startBoost({ keyCode }) {
        if (!matchKeys(keyCode, BOOST_KEYS)) return;
        this._keydown = true;
        this._boostIsActive = true;
        soundManager.playSound('boost');
    }

    /**
     * Stop boost speed
     * @param {Number} keyCode
     * @private
     */
    _stopBoost({ keyCode }) {
        if (!matchKeys(keyCode, BOOST_KEYS)) return;
        this._keydown = false;
        this._boostIsActive = false;
        soundManager.stopBoostSound();
    }

    /**
     * start game
     * @param {Number} keyCode
     * @private
     */
    _startGame({ keyCode }) {
        if (matchKeys(keyCode, START_KEYS) && !stateManager.playCount && stateManager.gameIsOver || matchKeys(keyCode, CANCEL_SAVE_KEYS)) {
            this._game.startGame();
        }
    }

    /**
     * on resize handler
     * @private
     */
    _onResize() {
        this._game._element.width = document.body.offsetWidth;
        this._game._element.height = document.body.offsetWidth / 2;
    }
}

/**
 * @module managers/controls
 * @singleton
 */
export default new ControlsManager();
