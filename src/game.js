import * as CANNON from 'cannon';
import * as THREE from 'three';

export default class Game {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, -9.8)

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x42f5c5);
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,    // near plane
            1000    // far plane
        );
        this.camera.position.z = 10;
        //this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.fixedTimeStep = 1.0 / 60.0;
        this.maxSubSteps = 3;
    }

    loadLevel() {
        // For now just add a ground plane
        let groundBody = new CANNON.Body({ mass: 0 });
        let groundShape = new CANNON.Plane();
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);

        let light = new THREE.PointLight(0xffffff);
        light.position.set(3, 3, 3);
        this.scene.add(light);
        let lightHelper = new THREE.PointLightHelper(light);
        this.scene.add(lightHelper);
    }

    loadPlayer() {
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({color: 0xfffbbb})
        );
        this.scene.add(this.cube);
    }

    loop() {
        requestAnimationFrame(() => this.loop())
        this.renderer.render(this.scene, this.camera);
        this.cube.rotation.y += 0.01;
    }
}

/*
let lastTime;
(function sim(time){
    requestAnimationFrame(sim);
    game.renderer.render(game.scene, game.camera);
    game.cube.rotation.y += 0.01;
    if(lastTime !== undefined){
        let dt = (time - lastTime) / 1000;
        game.world.step(game.fixedTimeStep, dt, game.maxSubSteps);
    }
    lastTime = time;
})();
*/
