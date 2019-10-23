import * as CANNON from 'cannon';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {CannonDebugRenderer} from 'cannon/tools/threejs/CannonDebugRenderer'

export default class Game {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.8, 0);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.iterations = 10;

        let physicsMaterial = new CANNON.Material('slipperyMat');
        let contactMat = new CANNON.ContactMaterial(
            physicsMaterial,
            physicsMaterial
        );
        this.physicsMaterial = physicsMaterial;
        this.world.addContactMaterial(contactMat);

        this.scene = new THREE.Scene();
        //this.scene.background = new THREE.Color(0x42f5c5);
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,    // near plane
            1000    // far plane
        );
        this.camera.position.z = 10;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.fixedTimeStep = 1.0 / 60.0;
        this.maxSubSteps = 3;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.debugRenderer = new CannonDebugRenderer(this.scene, this.world);
    }

    loadLevel() {
        // For now just add a ground plane
        this.groundBody = new CANNON.Body({ mass: 0, material: this.physicsMaterial});
        this.groundBody.addShape(new CANNON.Plane());
        this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
        this.world.addBody(this.groundBody);
    }

    loadCar() {
        this.car = {};

        this.car.body = new CANNON.Body({mass: 1, material: this.physicsMaterial});
        this.car.body.addShape(new CANNON.Box(
            new CANNON.Vec3(1, 0.3, 2)
        ));
        this.world.addBody(this.car.body);

        this.car.body.position.y = 5;

    }

    loop() {
        requestAnimationFrame(() => this.loop())
        this.world.step(1.0/60.0);
        this.debugRenderer.update();
        this.renderer.render(this.scene, this.camera);
    }
}

