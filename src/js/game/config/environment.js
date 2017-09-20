export default {
    fog: {
        fogMode: BABYLON.Scene.FOGMODE_LINEAR,
        fogStart: 40,
        fogEnd: 250,
        fogColor: new BABYLON.Color4(0.75, 0.9, 1, 0.2)
    },
    mountains: {
        size: 400
    },
    sky: {
        backFaceCulling: false,
        turbidity: 40,
        luminance: 1,
        azimuth: 0.25,
        useSunPosition: true,
        sunPosition: new BABYLON.Vector3(0, 100, 0),
        rayleigh: 1,
        mieDirectionalG: 1.2,
        mieCoefficient: 0.005
    },
    snow: {
        color1: new BABYLON.Color4(0.9, .9, 1.0, 1.0),
        color2: new BABYLON.Color4(0.9, 0.8, 1.0, 1.0),
        colorDead: new BABYLON.Color4(0, 0, 0.2, 0),
        minSize: 0.1,
        maxSize: 0.1,
        minLifeTime: 0.3,
        maxLifeTime: 2.5,
        blendMode: BABYLON.ParticleSystem.BLENDMODE_ONEONE,
        gravity: new BABYLON.Vector3(0, -9.81, 0),
        direction1: new BABYLON.Vector3(-7, 30, 3),
        direction2: new BABYLON.Vector3(7, 15, -3),
        minAngularSpeed: 0,
        maxAngularSpeed: Math.PI,
        minEmitPower: 1,
        maxEmitPower: 3,
        updateSpeed: 0.005
    }
};
