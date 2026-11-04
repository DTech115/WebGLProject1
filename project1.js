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
const speed = 0.07;

// ---------------------------------------------------
// Lights
// ---------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.2
);

scene.add(ambientLight);

const sunLight = new THREE.PointLight(
    0xffffff,
    300
);

sunLight.position.set(0, 1, 0);
scene.add(sunLight);


// ---------------------------------------------------
// Materials
// ---------------------------------------------------

const yellowMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffd43b
    });

const earthMaterial =
    new THREE.MeshLambertMaterial({
        color: 0x3eb8fc
    });

const greenMaterial =
    new THREE.MeshLambertMaterial({
        color: 0x2ecc71
    });

const moonMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xdedede,
        roughness: 0.5
    });

const mercuryMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        metalness: 0.8,
        roughness: 0.7
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
const bodyMaterial = new THREE.MeshStandardMaterial( { color: 0xf00000 } );
const cylinder = new THREE.Mesh( bodyGeometry, bodyMaterial );

cylinder.position.y = -0.4;

ship.add( cylinder );


// Nose Cone
const coneGeometry = new THREE.ConeGeometry(0.7, 1.2, 32);
const coneMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
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
const leftFinMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const leftFin = new THREE.Mesh( leftFinGeometry, leftFinMaterial );

leftFin.position.y = -1.7;
leftFin.position.x = -0.6;
leftFin.rotation.z = 2;

ship.add( leftFin );


// Right Fin (Bonus)
const rightFinGeometry = new THREE.TetrahedronGeometry(0.5);
const rightFinMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const rightFin = new THREE.Mesh( rightFinGeometry, rightFinMaterial );

rightFin.position.y = -1.7;
rightFin.position.x = 0.6;
rightFin.rotation.z = 2.75;     //these rotations took so long to brute force-

ship.add( rightFin );

ship.position.set(0, 1, 0);
ship.rotateX(-Math.PI / 2);

// scale down the ship to make it smaller
ship.scale.set(0.3, 0.3, 0.3);

ship.castShadow = true;
ship.receiveShadow = true;

scene.add(ship);

// ---------------------------------------------------
// OBJECTS
// ---------------------------------------------------

const sun =
    new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        yellowMaterial
    );

sun.castShadow = true;

sun.position.set(0, 1, -5);
scene.add(sun);


// ---------------------------------------------------
// Earth
// ---------------------------------------------------
const earth = new THREE.Group();

const earthOceanGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthOceanMesh = new THREE.Mesh(earthOceanGeometry, earthMaterial);

const earthLandGeometry = new THREE.TorusKnotGeometry(0.2, 0.8);
const earthLandMesh = new THREE.Mesh(earthLandGeometry, greenMaterial);

earth.add(earthOceanMesh);
earth.add(earthLandMesh);

earth.castShadow = true;
earth.receiveShadow = true;

earth.position.set(5, 1, 0);
scene.add(earth);

// ---------------------------------------------------
// Moon
// ---------------------------------------------------

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        moonMaterial
    );

moon.castShadow = true;
moon.receiveShadow = true;
moon.position.set(8, 1, 0);
scene.add(moon);

// ---------------------------------------------------
// Mercury
// ---------------------------------------------------

const mercury =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        mercuryMaterial
    );

mercury.castShadow = true;
mercury.receiveShadow = true;
mercury.position.set(0, 1, -10);
scene.add(mercury);


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
mystery.position.set(-5, 1, 0);
scene.add(mystery);

// ---------------------------------------------------
// Animation
// ---------------------------------------------------

let orbitAngle = 0;
const earthOrbitRadius = 10;
const mercuryOrbitRadius = 4;

function animate() {

    requestAnimationFrame(animate);

    sun.rotation.y += 0.01;

    //earth orbits around the sun
    orbitAngle += 0.005;
    earth.position.x = sun.position.x + earthOrbitRadius * Math.cos(orbitAngle)
    earth.position.z = sun.position.z + earthOrbitRadius * Math.sin(orbitAngle);
    // axis rotation
    earth.rotation.y += 0.03;

    //moon orbits around the earth
    moon.position.x = earth.position.x + 3 * Math.cos(orbitAngle * 2);
    moon.position.z = earth.position.z + 3 * Math.sin(orbitAngle * 2);
    // axis rotation
    moon.rotation.y += 0.03;

    //mercury orbits around the sun
    mercury.position.x = sun.position.x + mercuryOrbitRadius * Math.cos(orbitAngle * 1.5);
    mercury.position.z = sun.position.z + mercuryOrbitRadius * Math.sin(orbitAngle * 1.5);
    // axis rotation
    mercury.rotation.y += 0.03;



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
        ship.rotation.z += (Math.PI - ship.rotation.z) * 0.1; // Point forward
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