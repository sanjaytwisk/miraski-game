import baseUrl from '../helpers/baseUrl';

/**
 * store models
 * @param {Object} models
 * @param {String} name
 * @param {Array} loadedMeshes
 * @return {Object}
 */
const storeModels = (models, { name, loadedMeshes }) => {
    models[name] = loadedMeshes;
    return models;
};

/**
 * Model Manager
 * @class
 */
class ModelManager {

    /**
     * load
     * @param {BABYLON.Scene} scene
     * @param {Array} models
     * @return {Promise<Array>}
     */
    load(scene, models) {
        this._loader = new BABYLON.AssetsManager(scene);
        this._loader.useDefaultLoadingScreen = false;
        this._addModels(models);
        return this._loadModels();
    }

    /**
     * load models
     * @return {Promise<Array>}
     * @private
     */
    _loadModels() {
        return new Promise((resolve, reject) => {
            this._loader.onFinish = loadedModels => {
                const modelList = loadedModels.reduce(storeModels, {});
                setTimeout(() => resolve(modelList), 1000);
            };
            this._loader.onError = error => reject(error);
            this._loader.load();
        });
    }

    /**
     * add models to loader
     * @param {Array} models
     * @private
     */
    _addModels(models) {
        models.forEach(model => {
            this._loader.addMeshTask(model.name, '', `${baseUrl}/models/${model.folder}/`, model.filename);
        });
    }
}

/**
 * @module managers/model
 * @singleton
 */
export default new ModelManager();
