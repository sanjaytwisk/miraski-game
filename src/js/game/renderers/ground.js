/**
 * Ground Renderer
 * @class
 */
class GroundRenderer {

    /**
     * @type {Number}
     * @private
     */
    _length = 500;

    /**
     * @type {Number}
     * @private
     */
    _width = 200;

    /**
     * @type {Number}
     * @private
     */
    _stepSize = 10;

    /**
     * @type {Number}
     * @private
     */
    _fieldSize = 10;

    /**
     * Create a new ribbon mesh
     * @param {BABYLON.Scene} scene
     * @private
     */
    renderGround(scene) {
        const mesh = new BABYLON.Mesh.CreateRibbon('ground', this._getPaths(), false, false, null, scene);
        mesh.convertToFlatShadedMesh();
        return mesh;
    }

    /**
     * @returns {Number}
     */
    get length() {
        return this._length;
    }

    /**
     * Get paths for ribbon
     * @returns {Array} paths
     */
    _getPaths() {
        // Create 10 paths
        let paths = [];
        for (let path = -this._width; path <= this._width; path += this._stepSize) {
            paths.push(this._createPath(path));
        }

        return paths;
    };

    /**
     * Create the points for each path
     * @param {Number} path - x position of the point
     * @param {Number} vector - z position of the point
     * @param {Array} points - array to store the points
     */
    _createPoints(path, vector, points) {
        let coordinates = {
            x: path,
            y: Math.random() + 0.5,
            z: vector
        };
        if (path < -this._fieldSize || path > this._fieldSize) {
            let amplify = path < 0 ? path * -1 : path;
            amplify *= amplify * 0.001;
            const variation = vector === 0 || vector === 500 ? 4 : coordinates.y * 4;
            coordinates.y = amplify + variation;
        } else {
            coordinates.y = vector === 0 || vector === 500 ? 0 : coordinates.y;
        }
        points.push(new BABYLON.Vector3(coordinates.x, coordinates.y, coordinates.z));
    };

    /**
     * Create path for ribbon paths array
     * @param {Number} path - index of the path
     * @returns {Array} points - array of paths for the ribbon
     */
    _createPath(path) {
        let points = [];
        // Create 500 points per path
        for (let vector = 0; vector <= this._length; vector += 10) {
            this._createPoints(path, vector, points);
        }

        return points;
    };
}

/**
 * @module renderers/ground
 * @singleton
 */
export default new GroundRenderer();
