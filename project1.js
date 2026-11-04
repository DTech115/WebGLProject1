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
    0.3
);

scene.add(ambientLight);

// sunlight from the sun
const sunLight = new THREE.PointLight(
    0xffffff,
    400
);

sunLight.position.set(0, 1, 0);
scene.add(sunLight);

// ship spot light from nose
const shipLight = new THREE.SpotLight(
    0xffffff,
    300
);

shipLight.position.set(0, 2.2, 0);
shipLight.angle = Math.PI / 6;
shipLight.penumbra = 1;
shipLight.distance = 20;

shipLight.target.position.set(0, 10, 0);


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

const venusMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0xff8c42,
        metalness: 0.5,
        roughness: 0.5,
        ior: 1.5,
        iridescence: 0.5
    });

const marsMaterial =
    new THREE.MeshLambertMaterial({
        color: 0xff4500,
        roughness: 0.5
    });

const jupiterMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xf4a460,
        roughness: 0.5,
        transparent: true,
        opacity: 0.8
    });

const saturnMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xf5deb3,
        roughness: 0.5
    });

const saturnRingMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xd2b48c,
        roughness: 0.5,
        side: THREE.DoubleSide
    });

const uranusMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0x00ffff,
        clearcoat: 1,
        iridescence: 0.5
    });

const neptuneMaterial =
    new THREE.MeshToonMaterial({
        color: 0x0000ff,
    });

const plutoMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xa18662,
        roughness: 0.5
    });

const asteroidMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0x888888,
        metalness: 0.5,
        roughness: 0.8,
        reflectivity: 0.5
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

// shiplight from before
ship.add(shipLight);
ship.add(shipLight.target);

scene.add(ship);

// ---------------------------------------------------
// OBJECTS
// ---------------------------------------------------

// ROCKY PLANETS

const sun =
    new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        yellowMaterial
    );

sun.castShadow = true;

sun.position.set(0, 1, -5);
scene.add(sun);


// Earth
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


// Moon

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        moonMaterial
    );

moon.castShadow = true;
moon.receiveShadow = true;
moon.position.set(8, 1, 0);
scene.add(moon);


// Mercury

const mercury =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 32, 32),
        mercuryMaterial
    );

mercury.castShadow = true;
mercury.receiveShadow = true;
mercury.position.set(0, 1, -10);
scene.add(mercury);

// Venus

const venus =
    new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        venusMaterial
    );

venus.castShadow = true;
venus.receiveShadow = true;
venus.position.set(0, 1, 10);
scene.add(venus);

// Mars

const mars =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 32, 32),
        marsMaterial
    );

mars.castShadow = true;
mars.receiveShadow = true;
mars.position.set(0, 1, 10);
scene.add(mars);

// asteroid belt
const asteroidBelt = new THREE.Group();

for (let i = 0; i < 200; i++) {
    const asteroidGeometry = new THREE.DodecahedronGeometry(0.2, 0);
    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

    // random position in a ring around the sun
    const angle = Math.random() * Math.PI * 2;
    const radius = 23 + Math.random() * 3;
    asteroid.position.set(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
    );

    asteroid.castShadow = true;
    asteroid.receiveShadow = true;

    asteroidBelt.add(asteroid);
}

asteroidBelt.position.copy(sun.position);
scene.add(asteroidBelt);

// GAS GIANTS

// jupiter
const jupiter =
    new THREE.Mesh(
        new THREE.SphereGeometry(2, 32, 32),
        jupiterMaterial
    );

jupiter.castShadow = true;
jupiter.receiveShadow = true;
jupiter.position.set(-30, 1, 0);
scene.add(jupiter);

// saturn
const saturn =
    new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 32, 32),
        saturnMaterial
    );

saturn.castShadow = true;
saturn.receiveShadow = true;
saturn.position.set(45, 1, 0);
scene.add(saturn);

// saturn ring
const saturnRingGeometry = new THREE.RingGeometry(2, 3, 32);
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRing.rotation.x = Math.PI / 2;
saturn.add(saturnRing);

// uranus
const uranus =
    new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 32, 32),
        uranusMaterial
    );

uranus.castShadow = true;
uranus.receiveShadow = true;
uranus.position.set(50, 1, 0);
scene.add(uranus);

// neptune
const neptune =
    new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 32, 32),
        neptuneMaterial
    );

neptune.castShadow = true;
neptune.receiveShadow = true;
neptune.position.set(57, 1, 0);
scene.add(neptune);

// pluto
const pluto =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        plutoMaterial
    );

pluto.castShadow = true;
pluto.receiveShadow = true;
pluto.position.set(60, 1, 0);
scene.add(pluto);


// ---------------------------------------------------
// Animation
// ---------------------------------------------------

let earthOrbitAngle = 1;
const earthOrbitRadius = 13;
let mercuryOrbitAngle = 4;
const mercuryOrbitRadius = 5;
let venusOrbitAngle = 8;
const venusOrbitRadius = 8;
let marsOrbitAngle = 2;
const marsOrbitRadius = 18;
let jupiterOrbitAngle = 10;
const jupiterOrbitRadius = 35;
let saturnOrbitAngle = 13;
const saturnOrbitRadius = 45;
let uranusOrbitAngle = 18;
const uranusOrbitRadius = 47;
let neptuneOrbitAngle = 20;
const neptuneOrbitRadius = 49;
// pluto's orbit is a lil funky with a tilt
let plutoOrbitAngle = 25;
const plutoLong = 100;
const plutoShort = 70;
const plutoTilt = Math.PI / 8;

function animate() {

    requestAnimationFrame(animate);

    sun.rotation.y += 0.01;

    //earth orbits around the sun
    earthOrbitAngle += 0.005;
    earth.position.x = sun.position.x + earthOrbitRadius * Math.cos(earthOrbitAngle);
    earth.position.z = sun.position.z + earthOrbitRadius * Math.sin(earthOrbitAngle);
    // axis rotation
    earth.rotation.y += 0.03;

    //moon orbits around the earth
    moon.position.x = earth.position.x + 3 * Math.cos(earthOrbitAngle * 2);
    moon.position.z = earth.position.z + 3 * Math.sin(earthOrbitAngle * 2);
    // axis rotation
    moon.rotation.y += 0.03;

    //mercury orbits around the sun
    mercuryOrbitAngle += 0.008;
    mercury.position.x = sun.position.x + mercuryOrbitRadius * Math.cos(mercuryOrbitAngle * 1.5);
    mercury.position.z = sun.position.z + mercuryOrbitRadius * Math.sin(mercuryOrbitAngle * 1.5);
    // axis rotation
    mercury.rotation.y += 0.03;

    //venus orbits around the sun
    venusOrbitAngle += 0.006;
    venus.position.x = sun.position.x + venusOrbitRadius * Math.cos(venusOrbitAngle * 1.2);
    venus.position.z = sun.position.z + venusOrbitRadius * Math.sin(venusOrbitAngle * 1.2);
    // axis rotation
    venus.rotation.y += 0.03;

    //mars orbits around the sun
    marsOrbitAngle += 0.005;
    mars.position.x = sun.position.x + marsOrbitRadius * Math.cos(marsOrbitAngle * 0.8);
    mars.position.z = sun.position.z + marsOrbitRadius * Math.sin(marsOrbitAngle * 0.8);
    // axis rotation
    mars.rotation.y += 0.03;

    // asteroid belt rotates around the sun slowly
    asteroidBelt.rotation.y += 0.0007;

    // jupiter orbits on its axis
    jupiterOrbitAngle += 0.003;
    jupiter.position.x = sun.position.x + jupiterOrbitRadius * Math.cos(jupiterOrbitAngle * 0.5);
    jupiter.position.z = sun.position.z + jupiterOrbitRadius * Math.sin(jupiterOrbitAngle * 0.5);
    // axis rotation
    jupiter.rotation.y += 0.01;

    // saturn orbits around the sun
    saturnOrbitAngle += 0.003;
    saturn.position.x = sun.position.x + saturnOrbitRadius * Math.cos(saturnOrbitAngle * 0.3);
    saturn.position.z = sun.position.z + saturnOrbitRadius * Math.sin(saturnOrbitAngle * 0.3);
    // axis rotation
    saturn.rotation.y += 0.01;

    // uranus orbits around the sun
    uranusOrbitAngle += 0.003;
    uranus.position.x = sun.position.x + uranusOrbitRadius * Math.cos(uranusOrbitAngle * 0.2);
    uranus.position.z = sun.position.z + uranusOrbitRadius * Math.sin(uranusOrbitAngle * 0.2);
    // axis rotation
    uranus.rotation.y += 0.01;

    // neptune orbits around the sun
    neptuneOrbitAngle += 0.003;
    neptune.position.x = sun.position.x + neptuneOrbitRadius * Math.cos(neptuneOrbitAngle * 0.1);
    neptune.position.z = sun.position.z + neptuneOrbitRadius * Math.sin(neptuneOrbitAngle * 0.1);
    // axis rotation
    neptune.rotation.y += 0.01;

    // pluto orbits around the sun
    plutoOrbitAngle += 0.0015;
    const flatX = Math.cos(plutoOrbitAngle) * plutoLong;
    const flatZ = Math.sin(plutoOrbitAngle) * plutoShort;
    pluto.position.x = sun.position.x + flatX;
    pluto.position.y = sun.position.y + flatZ * Math.sin(plutoTilt);
    pluto.position.z = sun.position.z + flatZ * Math.cos(plutoTilt);
    // axis rotation & tilt
    pluto.rotation.z = Math.PI * 2 / 3;
    pluto.rotateY(-0.02);

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

    // third-person camera follows the ship

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