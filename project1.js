import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------------------------------------------------
// Scene
// ---------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b12);

// ---------------------------------------------------
// Camera
// ---------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 20);

// ---------------------------------------------------
// Renderer
// ---------------------------------------------------

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ---------------------------------------------------
// Controls
// ---------------------------------------------------

const controls = new OrbitControls(camera, renderer.domElement);

// Keyboard State Object
const keys = {};

// Key Down
window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

// Key Up
window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

// Movement Speed
const speed = 0.1;

// ---------------------------------------------------
// Lights
// ---------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.4
);

scene.add(ambientLight);

const pointLight = new THREE.PointLight(
    0xffffff,
    200
);

pointLight.position.set(5, 10, 5);

pointLight.castShadow = true;

scene.add(pointLight);

const helper = new THREE.PointLightHelper(
    pointLight,
    0.5
);

// // placed above the gold sphere
// const spotLight = new THREE.SpotLight(
//     0xffffff,
//     100
// );
// spotLight.castShadow = true;
// spotLight.position.set(-9, 8, -4);
// spotLight.target.position.set(-9, 2, -4);
// scene.add(spotLight);
// scene.add(spotLight.target);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(helper, spotLightHelper);

// ---------------------------------------------------
// Floor
// ---------------------------------------------------

// const floorGeometry =
//     new THREE.PlaneGeometry(40, 40);

// const floorMaterial =
//     new THREE.MeshBasicMaterial({
//         color: 0x444444
//     });

// const floor =
//     new THREE.Mesh(
//         floorGeometry,
//         floorMaterial
//     );

// floor.rotation.x = -Math.PI / 2;
// floor.receiveShadow = true;

// scene.add(floor);

// ---------------------------------------------------
// Materials
// ---------------------------------------------------

const yellowMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffd43b
    });

const greenMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x2ecc71
    });

const cyanMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00bcd4
    });

const redMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff4d4d
    });

const whiteMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xf5f5f5
    });

const orangeMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff8c42
    });

const magentaMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff4fd8
    });

const purpleMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x9b59b6
    });

const blueMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x4169e1
    });

const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffcc00,
        metalness: 0.7,
        roughness: 0.2
    });

const plasticMaterial = 
    new THREE.MeshPhongMaterial({
        color: 0x00bcd4,
        shininess: 100
    });

const cartoonMaterial =
    new THREE.MeshToonMaterial({
        color: 0xff4fd8,
        shininess: 100
    });

const treeMaterial = 
    new THREE.MeshLambertMaterial({
        color: 0x2ecc71,
    });

const knotMaterial =
    new THREE.MeshNormalMaterial({
    });

const dodecahedronMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.5,
    });

const crystalMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x99999ff,
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7
    });

const donutMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xff69b4,
        metalness: 0.1,
        roughness: 0.4
    });

const pyramidMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x4169e1,
        metalness: 0.9,
        roughness: 0.4
    });

// ---------------------------------------------------
// CONTROLLABLE SHIP 
// ---------------------------------------------------



const ship = new THREE.Group();
const bodyGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 3, 32 );
const bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xf00000 } );
const cylinder = new THREE.Mesh( bodyGeometry, bodyMaterial );

cylinder.position.y = -0.4;

ship.add( cylinder );


// Nose Cone
const coneGeometry = new THREE.ConeGeometry(0.7, 1.2, 32);
const coneMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cone = new THREE.Mesh(coneGeometry, coneMaterial );

// MOVE NOSE UP
cone.position.y = 1.5;

// ADD TO SHIP
ship.add( cone );


// Flame
const flameGeometry = new THREE.ConeGeometry(0.4, 1.7, 32);
const flameMaterial = new THREE.MeshBasicMaterial( { color: 0xFF7F00});
const FLAMESOFHADES = new THREE.Mesh(flameGeometry, flameMaterial);

FLAMESOFHADES.position.y = -2.8;
FLAMESOFHADES.rotation.z = 3.145;

ship.add(FLAMESOFHADES);

// Left Fin (Bonus)
const leftFinGeometry = new THREE.TetrahedronGeometry(0.5);
const leftFinMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const leftFin = new THREE.Mesh( leftFinGeometry, leftFinMaterial );

leftFin.position.y = -1.7;
leftFin.position.x = -0.6;
leftFin.rotation.z = 2;

ship.add( leftFin );


// Right Fin (Bonus)
const rightFinGeometry = new THREE.TetrahedronGeometry(0.5);
const rightFinMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const rightFin = new THREE.Mesh( rightFinGeometry, rightFinMaterial );

rightFin.position.y = -1.7;
rightFin.position.x = 0.6;
rightFin.rotation.z = 2.75;     //these rotations took so long to brute force-

ship.add( rightFin );

ship.position.set(0, 1, 0);
ship.rotateX(-Math.PI / 2);
scene.add(ship);

// ---------------------------------------------------
// OBJECTS
// ---------------------------------------------------

const sphere =
    new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        goldMaterial
    );

sphere.castShadow = true;

scene.add(sphere);


const cube =
    new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        plasticMaterial
    );

cube.castShadow = true;

scene.add(cube);


// ---------------------------------------------------
// Mystery Object
// Students pick the material.
// ---------------------------------------------------



const mystery =
    new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.5),
        dodecahedronMaterial
    );


mystery.castShadow = true;

scene.add(mystery);

// ---------------------------------------------------
// Animation
// ---------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01;
    cube.rotation.y += 0.01;

    mystery.rotation.y += 0.01;

    controls.update();

    // Arrow Key Controls
    if (keys["arrowup"]) {
        ship.position.z -= speed;
        // point the ship in the direction of movement slowly
        ship.rotation.z += (0 - ship.rotation.z) * 0.1; // Point forward
    }

    if (keys["arrowdown"]) {
        ship.position.z += speed;
        // point the ship in the direction of movement
        ship.rotation.z += (Math.PI - ship.rotation.x) * 0.1; // Point forward
    }

    if (keys["arrowleft"]) {
        ship.position.x -= speed;
        ship.rotation.z += (Math.PI / 2 - ship.rotation.z) * 0.1; // Point left
    }

    if (keys["arrowright"]) {
        ship.position.x += speed;
        ship.rotation.z += (-Math.PI / 2 - ship.rotation.z) * 0.1; // Point right
    }

    renderer.render(scene, camera);
}

animate();

// ---------------------------------------------------
// Resize
// ---------------------------------------------------

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});