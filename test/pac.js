const performance = require("perf_hooks").performance;
let w = 1280,
  h = 720;

const gl = require('../../headless-gl')(w, h, {
  preserveDrawingBuffer: true
});


const THREE = require('three');

const canvas = {
  getContext() {
    return gl;
  },
  addEventListener() {}
};

let camera, scene, renderer;
let mesh;
const AMOUNT = 6;

init();
animate();

function init() {

  const ASPECT_RATIO = w / h;

  const WIDTH = (w / AMOUNT) * 1;
  const HEIGHT = (h / AMOUNT) * 1;

  const cameras = [];

  for (let y = 0; y < AMOUNT; y++) {

    for (let x = 0; x < AMOUNT; x++) {

      const subcamera = new THREE.PerspectiveCamera(40, ASPECT_RATIO, 0.1, 10);
      subcamera.viewport = new THREE.Vector4(Math.floor(x * WIDTH), Math.floor(y * HEIGHT), Math.ceil(WIDTH), Math.ceil(HEIGHT));
      subcamera.position.x = (x / AMOUNT) - 0.5;
      subcamera.position.y = 0.5 - (y / AMOUNT);
      subcamera.position.z = 1.5;
      subcamera.position.multiplyScalar(2);
      subcamera.lookAt(0, 0, 0);
      subcamera.updateMatrixWorld();
      cameras.push(subcamera);

    }

  }

  camera = new THREE.ArrayCamera(cameras);
  camera.position.z = 3;

  scene = new THREE.Scene();

  scene.add(new THREE.AmbientLight(0x222244));

  const light = new THREE.DirectionalLight();
  light.position.set(0.5, 0.5, 1);
  light.castShadow = true;
  light.shadow.camera.zoom = 4; // tighter shadow map
  scene.add(light);

  const geometryBackground = new THREE.PlaneGeometry(100, 100);
  const materialBackground = new THREE.MeshPhongMaterial({
    color: 0x000066
  });

  const background = new THREE.Mesh(geometryBackground, materialBackground);
  background.receiveShadow = true;
  background.position.set(0, 0, -1);
  scene.add(background);

  const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  const materialCylinder = new THREE.MeshPhongMaterial({
    color: 0xff0000
  });

  mesh = new THREE.Mesh(geometryCylinder, materialCylinder);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    canvas
  });
  renderer.setPixelRatio(1);
  // renderer.setSize(w, h);
  renderer.shadowMap.enabled = true;
  // document.body.appendChild(renderer.domElement);

  //

  // window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  const ASPECT_RATIO = w / h;
  const WIDTH = (w / AMOUNT) * 1;
  const HEIGHT = (h / AMOUNT) * 1;

  camera.aspect = ASPECT_RATIO;
  camera.updateProjectionMatrix();

  for (let y = 0; y < AMOUNT; y++) {

    for (let x = 0; x < AMOUNT; x++) {

      const subcamera = camera.cameras[AMOUNT * y + x];

      subcamera.viewport.set(
        Math.floor(x * WIDTH),
        Math.floor(y * HEIGHT),
        Math.ceil(WIDTH),
        Math.ceil(HEIGHT));

      subcamera.aspect = ASPECT_RATIO;
      subcamera.updateProjectionMatrix();

    }

  }

  // renderer.setSize(w, h);

}

function animate() {

  mesh.rotation.x += 0.005;
  mesh.rotation.z += 0.01;

  renderer.render(scene, camera);


}


var pixels = new Uint8Array(w * h * 4);
(function loop() {
  // if (val < 0 || val > 1) dv *= -1;

  animate(performance.now());

  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  parentPort.postMessage(pixels);

  setTimeout(loop, 100);
})();