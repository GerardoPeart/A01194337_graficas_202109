import * as THREE from "../three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";


const gui = new dat.GUI();

let renderer = null, scene = null, camera = null, orbitControls = null;
let directionalLight = null;


//las partes del brazo
let hombro=null, brazo=null,codo=null,bicep = null,muneca=null,mano=null,  hombroGroup = null,brazoGroup = null,codoGroup = null,munecaGroup = null, exretemidad = null, exretemidadGroup = null;

var options = null;

const mapUrl = null;

function main() {
  const canvas = document.getElementById("webglcanvas");

  //agregar los objetos del brazo al gui
  options = {
    "hombro X": 0,
    "hombro Z": 0,

    "codo X": 0,
    "codo Z": 0,

    "brazo Y": 0,

    "muneca X": 0,
    "muneca Z": 0,

    "mano X": 0,
    "mano Z": 0,
  };

  gui.add(options, "hombro X", -0.5, 0.5).listen();
  gui.add(options, "hombro Z", -0.5, 0.5).listen();

  gui.add(options, "codo X", -0.5, 0.5).listen();
  gui.add(options, "codo Z", -0.25, 0.75).listen();

  gui.add(options, "brazo Y", -0.5, 0.5).listen();

  gui.add(options, "muneca X", -0.25, 0.25).listen();
  gui.add(options, "muneca Z", -0.25, 0.75).listen();

  gui.add(options, "mano X", -0.25, 0.25).listen();
  gui.add(options, "mano Z", -0, 0.1).listen();

  createScene(canvas);
  update();
}


function update() {
    requestAnimationFrame(function () {
      update();
    });
  
    
    hombroGroup.rotation.x = options["hombro X"] * Math.PI;
    hombroGroup.rotation.z = options["hombro Z"] * Math.PI;

    codoGroup.rotation.x = options["codo X"] * Math.PI;
    codoGroup.rotation.z = options["codo Z"] * Math.PI;

    brazoGroup.rotation.y = options["brazo Y"] * Math.PI;

    munecaGroup.rotation.x = options["muneca X"] * Math.PI;
    munecaGroup.rotation.z = options["muneca Z"] * Math.PI;

    mano.rotation.x = options["mano X"] * Math.PI;
    mano.rotation.z = options["mano Z"] * Math.PI;
  
    //Poner la camara en la ecena
    renderer.render(scene, camera);
  
    orbitControls.update();
  }

  function createScene(canvas) {
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  
    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
  
     
    // Create a new Three.js scene
    scene = new THREE.Scene();
  
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45,canvas.width / canvas.height,1,4000);
    camera.position.set(-10, 5, 40);
    scene.add(camera);
  
    orbitControls = new OrbitControls(camera, renderer.domElement);
  
   
    exretemidad = new THREE.Object3D();
  
    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight(0xaaaaaa, 1);
  
    // Create and add all the lights
    directionalLight.position.set(1.5, 5, -3);
    directionalLight.target.position.set(0, 0, 0);
    exretemidad.add(directionalLight);
  

    // grupo para que todos las partes se junten
    exretemidadGroup = new THREE.Object3D();
    exretemidadGroup.add(exretemidad);
  
    let map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);
  
    let geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    let mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({ map: map, side: THREE.DoubleSide })
    );
  
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4.02;
    exretemidadGroup.add(mesh);
  
    scene.add(exretemidad);
  
    //colores
    const colors = [];
  
    for (let i = 0; i < 6; i++) {
      const red = Math.random();
      const green = Math.random();
      const blue = Math.random();
  
      for (let j = 0; j < 4; j++) {
        colors.push(red, green, blue);
      }
    }
    const colorsAttr = new THREE.Float32BufferAttribute(colors, 3);
    const material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
    });
  
    
    
    
     
  
    //hecer el hombro
    hombroGroup = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.setAttribute("color", colorsAttr);
    hombro = new THREE.Mesh(geometry, material);
    hombroGroup.add(hombro);
  
    //hacer el bisep
    geometry = new THREE.BoxGeometry(4, 2, 2);
    geometry.setAttribute("color", colorsAttr);
    bicep = new THREE.Mesh(geometry, material);
    bicep.position.x = -2.5;
    hombroGroup.add(bicep);
  
    //hacer el codo
    codoGroup = new THREE.Object3D(); 
    geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.setAttribute("color", colorsAttr);
    codo = new THREE.Mesh(geometry, material);
    codoGroup.add(codo);
  
    // hacer el brazo
    brazoGroup = new THREE.Object3D(); 
    geometry = new THREE.BoxGeometry(2, 4, 2);
    geometry.setAttribute("color", colorsAttr);
    brazo = new THREE.Mesh(geometry, material);
    brazo.position.y = 2.5;
    brazoGroup.add(brazo);
  
    //hacer muneca
    munecaGroup = new THREE.Object3D(); 
    geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.setAttribute("color", colorsAttr);
    muneca = new THREE.Mesh(geometry, material);
    munecaGroup.add(muneca);
  
    //hacer la mano
    geometry = new THREE.BoxGeometry(2, 1.5, 1.5);
    geometry.setAttribute("color", colorsAttr);
    mano = new THREE.Mesh(geometry, material);
    mano.position.x = 1.4;
    mano.position.y = 0.8;
    mano.rotation.z = 0.5;
    munecaGroup.add(mano);
  
    munecaGroup.position.set(0, 5, 0);
    brazoGroup.add(munecaGroup);
    codoGroup.add(brazoGroup);
  
    codoGroup.position.set(-5, 0, 0);
    hombroGroup.add(codoGroup);
    hombroGroup.position.set(-5, 2, 10);
  
   
    scene.add(hombroGroup);
  }
  window.onload = () => main();