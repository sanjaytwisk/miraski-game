import nodeRenderer from '../renderers/node';
import config from '../config/game';
import levelConfig from '../config/level';
import levels from '../levels';
import scoreManager from '../managers/score';

/**
 * Level Process
 * @class
 */
class LevelProcess {
    /**
     * Parse pattern
     * @param {string} pattern
     * @return {array}
     */
    static parsePattern (pattern) {
        const rows = pattern.split(/\n/);
        return rows
            .reverse()
            .reduce(LevelProcess.parseRow, []);
    };

    /**
     * Parse row
     * @param {array} render
     * @param {string} row
     * @param {number} rowIndex
     * @return {array}
     */
    static parseRow(render, row, rowIndex) {
        const z = rowIndex * 25 + 500;
        row.split('|')
            .map(obj => obj.replace(/^\s+|\s+$/g, ''))
            .forEach((obj, objIndex) => {
                if(obj.length && obj !== '-') {
                    render.push({
                        type: levelConfig.map[obj].mesh,
                        position: new BABYLON.Vector3(config.lanes[objIndex], 2, z)
                    });
                }
            });

        return render;
    };

    /**
     * load
     * @param {object} scene
     * @param {object} models
     * @param {object} game
     */
    load() {
        this._index = 0;
        this._nodes = nodeRenderer.getMovables();
    }

    /**
     * create level
     */
    create() {
        this._setMode();
        this._setDifficulty(this._mode);
        this._setIndex();
        this._createPattern(LevelProcess.parsePattern(this._activePattern[this._index]));
    }

    /**
     * update nodes
     * @param {number} speed
     */
    update(speed) {
        this._getActiveNodes().forEach(mesh => {
            mesh.move(speed);
            if (mesh.shouldDeactivate()) {
                mesh.deactivate();
                mesh.resetPosition();
                scoreManager.updateScore('obstacles');
            }
        });
    }

    /**
     * reset nodes
     */
    reset() {
        this._index = 0;
        this._getActiveNodes().forEach(mesh => {
            mesh.deactivate();
            mesh.resetPosition();
        });
        this._setMode();
        this._setDifficulty(this._mode);
    }

    /**
     * get active nodes
     * @private
     * @returns {array}
     */
    _getActiveNodes() {
        return this._nodes.filter(mesh => mesh.isActive());
    }

    /**
     * set mode
     * @param {object} game
     * @private
     */
    _setMode() {
        const score = scoreManager.getTotal();
        this._mode = levelConfig.modes.find(({ value }) => score >= value).mode;
    }

    /**
     * set difficulty
     * @param {string} mode
     * @private
     */
    _setDifficulty(mode) {
        this._activePattern = levels[mode];
    }

    /**
     * set index for level selection
     * @private
     */
    _setIndex() {
        const available = this._activePattern.map((pattern, index) => index !== this._index ? index : false);
        const indexes = available.filter(index => index !== false);
        const random = Math.floor(Math.random() * (indexes.length));
        this._index = indexes[random];
    }

    /**
     * create pattern
     * @param {array} objects
     * @private
     */
    _createPattern(objects) {
        objects.forEach(({ position, type }) => {
            const meshToActivate = this._nodes.find(mesh => mesh.type === type && !mesh.isActive());
            meshToActivate.activate(position);
        });
    }
}

/**
 * @module processes/level
 * @singleton
 */
export default new LevelProcess();
