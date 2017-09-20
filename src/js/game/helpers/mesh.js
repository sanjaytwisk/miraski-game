export default {
    /**
     * Create the containing mesh for the player
     * and bind the loaded model meshes to it
     * @param {BABYLON.Scene} scene
     * @param {Array} model
     * @param {Object} options
     * @returns {BABYLON.Mesh}
     */
    createMesh(scene, model, options) {
        let mesh = BABYLON.Mesh.CreateBox(options.name, options.size, scene);
        mesh.visibility = 0;
        mesh.position = new BABYLON.Vector3(0, -500, -500);
        model.forEach(subMesh => subMesh.parent = mesh);
        mesh.scaling = new BABYLON.Vector3(options.scale, options.scale, options.scale);

        return mesh;
    },
    
    /**
     * Clone a given mesh and set its position
     * @param {BABYLON.Mesh} mesh
     * @param {BABYLON.Vector3} position
     * @returns {BABYLON.Mesh}
     */
    cloneMesh(mesh, position) {
        const clone = mesh.clone();
        clone.position = position;
        return clone;
    }
}
