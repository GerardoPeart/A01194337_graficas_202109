import * as THREE from '../three.module.js'
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {PointLight} from "../three.js-master/src/lights/PointLight.js"
import {addMouseHandler} from "./sceneHandlers.js"

let renderer = null, scene = null, camera = null, orbitControls = null, Sun = null, earth = null, moon = null, earthGroup = null, SunGroup = null,mercuryTranslation,asteroidgroup = null, SunGroup1=null,solar = null,mercury = null, venus = null,mars =null,neptune=null,saturn=null,uranus=null,jupiter=null,pluto = null;

const duration = 5000; // ms
let currentTime = Date.now();


function main() 
{
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    update();
}

/**
 * Updates the rotation of the objects in the scene
 */
function animate() 
{
    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;
    const fract = deltat / duration;
    const angle = Math.PI * 2 * fract;

    // Rotate the Sun about its Y axis
    //Sun.rotation.y += angle;
    SunGroup.rotation.y -= angle /2;
    SunGroup1.rotation.y -=angle / 3;
    Sun.rotation.y += angle*2;
    mercuryTranslation.rotation.y += angle /2;

    // Rotate the earth group about its Y axis
    earthGroup.rotation.y -= angle / 2;
    earth.rotation.y += angle * 2;
    mercury.rotation.y += angle * 2;
    venus.rotation.y += angle * 2;
    mars.rotation.y += angle * 2;
    jupiter.rotation.y += angle * 2;
    saturn.rotation.y += angle * 2;
    neptune.rotation.y += angle * 2;
    uranus.rotation.x += angle * 2;
    pluto.rotation.y += angle * 2;

    
   
}

/**
 * Runs the update loop: updates the objects in the scene
 */
function update()
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render( scene, camera );

    // Spin the Sun for next frame
    animate();

    orbitControls.update();
}

/**
 * Creates a basic scene with lights, a camera, and 3 objects
 * @param {canvas} canvas The canvas element to render on
 */
function createScene(canvas)
{   
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color 
    scene.background = new THREE.Color( 0, 0, 0 );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);

    orbitControls = new OrbitControls(camera, renderer.domElement);

    // Create a group to hold all the objects
    SunGroup = new THREE.Object3D;
    SunGroup1 = new THREE.Object3D;
    mercuryTranslation = new THREE.Object3D;
    
    // Add a directional light to show off the objects
    const light = new THREE.PointLight( 0xffffff, .7, 100 );
    light.position.set( 0, 0, 0 );
    scene.add( light );

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    let light2 = new THREE.AmbientLight(0xffffff,.5);//Ambient light
    scene.add(light2);

    let textureUrl = "./assets/sun.jpg";
    let texture = new THREE.TextureLoader().load(textureUrl);
    let material = new THREE.MeshPhongMaterial({ map: texture });

    const SolarGroup = new THREE.Object3D;
    let geometry = new THREE.SphereGeometry(.5, 20, 20);
    solar = new THREE.Mesh(geometry, material);
    SolarGroup.add(solar);
    SolarGroup.position.set(0,0,0);


    // Create the Sun geometry
     geometry = new THREE.SphereGeometry(2.5, 20, 20);

    // And put the geometry and material together into a mesh
    Sun = new THREE.Mesh(geometry, material);
    SolarGroup.add(SunGroup);
    SolarGroup.add(SunGroup1);
    SolarGroup.add(mercuryTranslation);
    // Tilt the mesh toward the viewer
    Sun.rotation.x = Math.PI / 5;
    Sun.rotation.y = Math.PI / 5;

    // Add the Sun mesh to our group
    SunGroup.add( Sun );

    SunGroup.position.set(0, 0, 0);

    // Create a group for the earth
    earthGroup = new THREE.Object3D;
    SunGroup1.add(earthGroup);
    
    textureUrl ='./assets/earth.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    // Move the earth group up and back from the Sun
    earthGroup.position.set(-8, 0, -.5);

    // Create the earth geometry
    geometry = new THREE.SphereGeometry(.5, 20, 20);
    
    // And put the geometry and material together into a mesh
    earth = new THREE.Mesh(geometry, material);

    // Add the earth mesh to our group
    earthGroup.add( earth );

    // Create the moon geometry
    geometry = new THREE.SphereGeometry(.2,10,10);
    textureUrl ='./assets/moon.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });
    // And put the geometry and material together into a mesh
    moon = new THREE.Mesh(geometry, material);

    // Move the moon up and out from the earth
    moon.position.set(1, 0, -.555);
    
        
    // Add the moon mesh to our group
    earthGroup.add( moon );

    geometry = new THREE.SphereGeometry(.2,20,20);

    textureUrl ='./assets/mercury.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    mercury = new THREE.Mesh(geometry, material);

    mercury.position.set(3,0,-.555);
    mercuryTranslation.add(mercury);

    geometry = new THREE.SphereGeometry(.4,20,20);

    textureUrl ='./assets/venus.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    venus = new THREE.Mesh(geometry, material);

    venus.position.set(6,0,-.555);
    SunGroup.add(venus);

    geometry = new THREE.SphereGeometry(.8,20,20);


    textureUrl ='./assets/mars.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    mars = new THREE.Mesh(geometry, material);

    mars.position.set(12,0,-.555);
    SunGroup.add(mars);

    geometry = new THREE.SphereGeometry(2,20,20);

    textureUrl ='./assets/jupiter.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    jupiter = new THREE.Mesh(geometry, material);

    jupiter.position.set(-15,0,5);
    SunGroup1.add(jupiter);


    geometry = new THREE.SphereGeometry(1.5,20,20);

    textureUrl ='./assets/saturn.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    saturn = new THREE.Mesh(geometry, material);

    saturn.position.set(18.5,0,5);
    SunGroup1.add(saturn);

    geometry = new THREE.SphereGeometry(.5,20,20);

    textureUrl ='./assets/neptune.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    neptune = new THREE.Mesh(geometry, material);

    neptune.position.set(21.709,0,5);
    SunGroup.add(neptune);

    geometry = new THREE.SphereGeometry(.5,20,20);

    textureUrl ='./assets/uranus.jpg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    uranus = new THREE.Mesh(geometry, material);

    uranus.position.set(-24,0,5);
    SunGroup1.add(uranus);

    geometry = new THREE.SphereGeometry(.01,20,20);

    textureUrl ='./assets/pluto.jpeg'
    texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshPhongMaterial({ map: texture });

    pluto = new THREE.Mesh(geometry, material);

    pluto.position.set(26,0,5);
    SunGroup.add(pluto);

    
    // Now add the group to our scene
    scene.add( SolarGroup );

    for(let j=3;j<=24;j++) {
        if (j==3||j==4||j==6||j==8||j==12||j==16||j==19||j==22||j==24){
            let radius = 1 * j;
            let points=[];
            
            for (let i = 0; i <= 2 * Math.PI; i += Math.PI / 180) {
                points.push(new THREE.Vector3(radius * Math.cos(i), 0, radius * Math.sin(i), 0))
            }
            let lineGeometry2 = new THREE.BufferGeometry().setFromPoints( points );
            let material2 = new THREE.LineBasicMaterial({color: 0xffffff})
            let cycleMesh = new THREE.Line(lineGeometry2, material2);
            cycleMesh.position.set(0, 0, 0);
            scene.add(cycleMesh);
        }
        }

    // add mouse handling so we can rotate the scene
    addMouseHandler(canvas, SolarGroup);

    // This code gets the world position of the moon.
    const earthWorldPosition = new THREE.Vector3();
    const moonWorldPosition = new THREE.Vector3();

    SolarGroup.updateMatrixWorld();
    SunGroup.updateMatrixWorld();
    earthGroup.updateMatrixWorld();
    earth.updateMatrixWorld();
    moon.updateMatrixWorld();

    console.log("earth position:", earth.position);
    earth.getWorldPosition(earthWorldPosition)
    earth.getWorldPosition(moonWorldPosition);
    console.log("earth world position", earthWorldPosition);
}

main();
