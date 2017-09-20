import soundManager from './sound';
import scoreManager from './score';
import stateManager from './state';

/**
 * Ui module
 * @singleton
 */
class Ui {

    /**
     * load module
     * @param {HTMLElement} element
     * @param {Game} game
     */
    load(element, game) {
        this._element = element;
        this._game = game;
        this._cacheSelectors();
        this._addEventListeners();
        this._initSoundToggle();
        this._updateModifiers(game._options.modifiers);
    }

    /**
     * cache selectors
     */
    _cacheSelectors() {
        this._menu = this._element.querySelector('.game__menu');
        this._scoreContainer = this._element.querySelector('.game__score-container');
        this._score = this._element.querySelector('.game__score');
        this._finalScore = this._element.querySelector('[final-score]');
        this._nameInput = this._element.querySelector('[data-name]');
        this._saveForm = this._element.querySelector('[data-save-score]');
        this._sound = this._element.querySelector('[data-sound]');
        this._boost = this._element.querySelector('[data-boost]');
        this._gameOver = this._element.querySelector('.gameover');
    }

    /**
     * add event listeners
     */
    _addEventListeners() {
        this._menu.addEventListener('click', evt => this._handleClick(evt));
        this._saveForm.addEventListener('submit', evt => this._saveGame(evt));
        this._nameInput && this._nameInput.setAttribute('required', true);
        this._sound.addEventListener('change', evt => this._toggleSound(evt.target.checked));
    }

    /**
     * click handler
     * @param {Event} evt
     * @private
     */
    _handleClick(evt) {
        const isStartButton =  typeof evt.target.dataset.start !== 'undefined';
        const isRulesButton = typeof evt.target.dataset.rules !== 'undefined';

        if (isStartButton && !stateManager.playCount) this._game.startGame();
        if (isRulesButton) this._showRules(evt);
    }

    /**
     * save game
     * @param {Event} evt
     * @private
     */
    _saveGame(evt) {
        evt.preventDefault();
        scoreManager.save(evt.target.action)
            .then(() => this._game.startGame())
            .catch(() => this._game.startGame());
    }

    /**
     * show modifiers
     * @param {object} modifiers
     */
    _updateModifiers(modifiers) {
        Object
            .entries(modifiers)
            .forEach(([name, modifier]) => {
                const element = document.querySelector(`[data-modifier-${name}]`);
                element.style.strokeDashoffset = 110 - (modifier / 6 * 110);
            });
    }

    /**
     * init sound toggle
     * @private
     */
    _initSoundToggle() {
        const mute = localStorage.getItem('sound');
        if (mute) {
            this._sound.checked = mute && mute !== 'mute';
        }
    }

    /**
     * show rules
     * @private
     */
    _showRules() {
        this._menu.classList.add('game__menu--rules');
    }

    /**
     * toggle sound
     * @param {boolean} on
     * @private
     */
    _toggleSound(on) {
        if (on) {
            soundManager.unmute();
        } else {
            soundManager.mute();
        }
    }

    /**
     * hide menu
     */
    hideMenu() {
        this._menu.classList.remove('game__menu--hidden');
    }

    /**
     * game started
     */
    onGameStart() {
        this._nameInput && this._nameInput.blur();
        this._menu.classList.add('game__menu--hidden');
        this._gameOver.classList.add('gameover--disabled');
        this._menu.classList.remove('game__menu--rules');
        this._scoreContainer.classList.add('game__score-container--visible');
        this._sound.parentNode.classList.add('game__sound--visible');
        this._boost.parentNode.parentNode.classList.add('game__boost--visible');
    }

    /**
     * game stopped
     * @param score
     */
    onGameStop(score) {
        this._nameInput && setTimeout(() => { this._nameInput.focus(); }, 250);
        this._scoreContainer.classList.remove('game__score-container--visible');
        this._gameOver.classList.remove('gameover--disabled');
        this._sound.parentNode.classList.remove('game__sound--visible');
        this._boost.parentNode.parentNode.classList.remove('game__boost--visible');
        this._finalScore.innerHTML = `${score}`;
    }

    /**
     * display score
     * @param {number} score
     */
    displayScore(score) {
        this._score.innerHTML = `${score}`;
    }

    /**
     * trigger jager score effect
     */
    jagerScore() {
        this._score.classList.add('game__score--jager');
        setTimeout(() => this._score.classList.remove('game__score--jager'), 200);
    }

    /**
     * get user's name
     * @return {string|null}
     */
    getName() {
        return this._nameInput ? this._nameInput.value : null;
    }

    /**
     * set boost value style
     * @param value
     */
    setBoostValue(value) {
        this._boost.style.width = `${value}%`;
    }
}

/**
 * @module managers/ui
 * @singleton
 */
export default new Ui();
