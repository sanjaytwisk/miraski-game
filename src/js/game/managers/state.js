/**
 * @module State Manager
 * @singleton
 */
class StateManager {
    /**
     * @type {number}
     */
    _playCount = 0;

    /**
     * @type {number}
     */
    _clock = 0;

    /**
     * @type {boolean}
     */
    _gameOver = true;

    /**
     * reset
     */
    reset() {
        this._gameOver = false;
        this._clock = 0;
    }

    /**
     * updateClock
     */
    updateClock() {
        this._clock++;
    }

    /**
     * update playcount
     */
    updatePlaycount() {
        this._playCount++;
    }

    /**
     * @getter
     * @return {number}
     */
    get playCount() {
        return this._playCount;
    }

    /**
     * @getter
     * @return {boolean}
     */
    get gameIsOver() {
        return this._gameOver;
    }

    /**
     * @getter
     * @return {number}
     */
    get clock() {
        return this._clock;
    }

    /**
     * @setter
     * @param {boolean} isOver
     */
    set gameIsOver(isOver) {
        this._gameOver = isOver;
    }

}

/**
 * @module managers/state
 * @singleton
 */
export default new StateManager();
