// const jsdom = require("jsdom").JSDOM;
// const window = (new jsdom("<html></html>")).window;
const createWindow = require("../");
const win = createWindow();
const document = win.document;
const performance = require("perf_hooks").performance;
const canva = require("canvas");
let w = 1280,
  h = 720;
let mouse = [0, 0];
const map = (val, min, max, fmn, fmx) => ((val - min) / (max - min)) * (fmx - fmn);

win.resizable = true;
const gl = require('../../headless-gl')(w, h, {
  preserveDrawingBuffer: true,
  window: win.ref
});

// console.log(document);
const THREE = require("three");

const params = {
  enableWind: true,
  showBall: true,
  togglePins: togglePins
};

const DAMPING = 0.03;
const DRAG = 1 - DAMPING;
const MASS = 0.1;
const restDistance = 25;

const xSegs = 10;
const ySegs = 10;

const clothFunction = plane(restDistance * xSegs, restDistance * ySegs);

const GRAVITY = 981 * 1.4;
const gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(MASS);


const TIMESTEP = 18 / 1000;
const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

let pins = [];

const windForce = new THREE.Vector3(0, 0, 0);

const ballPosition = new THREE.Vector3(0, -45, 0);
const ballSize = 60; //40

const tmpForce = new THREE.Vector3();
const diff = new THREE.Vector3();

class Particle {

  constructor(x, y, z, mass) {

    this.position = new THREE.Vector3();
    this.previous = new THREE.Vector3();
    this.original = new THREE.Vector3();
    this.a = new THREE.Vector3(0, 0, 0); // acceleration
    this.mass = mass;
    this.invMass = 1 / mass;
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();

    // init

    clothFunction(x, y, this.position); // position
    clothFunction(x, y, this.previous); // previous
    clothFunction(x, y, this.original);

  }

  // Force -> Acceleration

  addForce(force) {

    this.a.add(
      this.tmp2.copy(force).multiplyScalar(this.invMass)
    );

  }

  // Performs Verlet integration

  integrate(timesq) {

    const newPos = this.tmp.subVectors(this.position, this.previous);
    newPos.multiplyScalar(DRAG).add(this.position);
    newPos.add(this.a.multiplyScalar(timesq));

    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;

    this.a.set(0, 0, 0);

  }

}

class Cloth {

  constructor(w = 10, h = 10) {

    this.w = w;
    this.h = h;

    const particles = [];
    const constraints = [];

    // Create particles

    for (let v = 0; v <= h; v++) {

      for (let u = 0; u <= w; u++) {

        particles.push(
          new Particle(u / w, v / h, 0, MASS)
        );

      }

    }

    // Structural

    for (let v = 0; v < h; v++) {

      for (let u = 0; u < w; u++) {

        constraints.push([
          particles[index(u, v)],
          particles[index(u, v + 1)],
          restDistance
        ]);

        constraints.push([
          particles[index(u, v)],
          particles[index(u + 1, v)],
          restDistance
        ]);

      }

    }

    for (let u = w, v = 0; v < h; v++) {

      constraints.push([
        particles[index(u, v)],
        particles[index(u, v + 1)],
        restDistance

      ]);

    }

    for (let v = h, u = 0; u < w; u++) {

      constraints.push([
        particles[index(u, v)],
        particles[index(u + 1, v)],
        restDistance
      ]);

    }


    // While many systems use shear and bend springs,
    // the relaxed constraints model seems to be just fine
    // using structural springs.
    // Shear
    // const diagonalDist = Math.sqrt(restDistance * restDistance * 2);


    // for (v=0;v<h;v++) {
    //  for (u=0;u<w;u++) {

    //    constraints.push([
    //      particles[index(u, v)],
    //      particles[index(u+1, v+1)],
    //      diagonalDist
    //    ]);

    //    constraints.push([
    //      particles[index(u+1, v)],
    //      particles[index(u, v+1)],
    //      diagonalDist
    //    ]);

    //  }
    // }


    this.particles = particles;
    this.constraints = constraints;

    function index(u, v) {

      return u + v * (w + 1);

    }

    this.index = index;

  }

}

function plane(width, height) {

  return function(u, v, target) {

    const x = (u - 0.5) * width;
    const y = (v + 0.5) * height;
    const z = 0;

    target.set(x, y, z);

  };

}

function satisfyConstraints(p1, p2, distance) {

  diff.subVectors(p2.position, p1.position);
  const currentDist = diff.length();
  if (currentDist === 0) return; // prevents division by 0
  const correction = diff.multiplyScalar(1 - distance / currentDist);
  const correctionHalf = correction.multiplyScalar(0.5);
  p1.position.add(correctionHalf);
  p2.position.sub(correctionHalf);

}

function simulate(now) {

  const windStrength = Math.cos(now / 7000) * 20 + 40;

  windForce.set(Math.sin(now / 2000), Math.cos(now / 3000), Math.sin(now / 1000));
  windForce.normalize();
  windForce.multiplyScalar(windStrength);

  // Aerodynamics forces

  const particles = cloth.particles;

  if (params.enableWind) {

    let indx;
    const normal = new THREE.Vector3();
    const indices = clothGeometry.index;
    const normals = clothGeometry.attributes.normal;

    for (let i = 0, il = indices.count; i < il; i += 3) {

      for (let j = 0; j < 3; j++) {

        indx = indices.getX(i + j);
        normal.fromBufferAttribute(normals, indx);
        tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(windForce));
        particles[indx].addForce(tmpForce);

      }

    }

  }

  for (let i = 0, il = particles.length; i < il; i++) {

    const particle = particles[i];
    particle.addForce(gravity);

    particle.integrate(TIMESTEP_SQ);

  }

  // Start Constraints

  const constraints = cloth.constraints;
  const il = constraints.length;

  for (let i = 0; i < il; i++) {

    const constraint = constraints[i];
    satisfyConstraints(constraint[0], constraint[1], constraint[2]);

  }

  // Ball Constraints

  ballPosition.z = -Math.sin(now / 600) * 90; //+ 40;
  ballPosition.x = Math.cos(now / 400) * 70;

  if (params.showBall) {

    sphere.visible = true;

    for (let i = 0, il = particles.length; i < il; i++) {

      const particle = particles[i];
      const pos = particle.position;
      diff.subVectors(pos, ballPosition);
      if (diff.length() < ballSize) {

        // collided
        diff.normalize().multiplyScalar(ballSize);
        pos.copy(ballPosition).add(diff);

      }

    }

  } else {

    sphere.visible = false;

  }


  // Floor Constraints

  for (let i = 0, il = particles.length; i < il; i++) {

    const particle = particles[i];
    const pos = particle.position;
    if (pos.y < -250) {

      pos.y = -250;

    }

  }

  // Pin Constraints

  for (let i = 0, il = pins.length; i < il; i++) {

    const xy = pins[i];
    const p = particles[xy];
    p.position.copy(p.original);
    p.previous.copy(p.original);

  }


}

/* testing cloth simulation */

const cloth = new Cloth(xSegs, ySegs);

const pinsFormation = [];
pins = [6];

pinsFormation.push(pins);

pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
pinsFormation.push(pins);

pins = [0];
pinsFormation.push(pins);

pins = []; // cut the rope ;)
pinsFormation.push(pins);

pins = [0, cloth.w]; // classic 2 pins
pinsFormation.push(pins);

pins = pinsFormation[1];

function togglePins() {

  pins = pinsFormation[~~(Math.random() * pinsFormation.length)];

}

let container, stats;
let camera, scene, renderer;

let clothGeometry;
let sphere;
let object;
let mesh;
let light;

init();
animate(0);

function init() {
  // scene

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcce0ff);
  scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

  // camera

  camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
  camera.position.set(1000, 50, 1500);

  // lights

  scene.add(new THREE.AmbientLight(0x666666));

  light = new THREE.DirectionalLight(0xdfebff, 1);
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  const d = 300;

  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;

  light.shadow.camera.far = 1000;

  scene.add(light);

  // cloth material

  const loader = new THREE.TextureLoader();

  const clothMaterial = new THREE.MeshLambertMaterial({
    color: 0x2244ffff
  });

  // const can = document.createElement("canvas");
  // const ctx = can.getContext("2d");
  // let clothTexture;
  // canvas.loadImage("./circuit_pattern.png", img => {
  //   can.width = img.width;
  //   can.height = img.height;
  //   ctx.drawImage(img, 0, 0);
  //   clothTexture = loader.load(can);
  //   clothTexture.anisotropy = 16;
  //   clothGeometry.alphaMap = clothTexture;
  // });

  // cloth geometry

  clothGeometry = new THREE.ParametricBufferGeometry(clothFunction, cloth.w, cloth.h);

  // cloth mesh

  object = new THREE.Mesh(clothGeometry, clothMaterial);
  object.position.set(0, 0, 0);
  object.castShadow = true;
  scene.add(object);

  // sphere

  const ballGeo = new THREE.SphereGeometry(ballSize, 32, 16);
  const ballMaterial = new THREE.MeshLambertMaterial();

  sphere = new THREE.Mesh(ballGeo, ballMaterial);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.visible = false;
  scene.add(sphere);

  // ground

  const can = document.createElement("canvas");
  const ctx = can.getContext("2d");
  // let clothTexture;
  canva.loadImage("./circuit_pattern.png").then(img => {
    can.width = img.width;
    can.height = img.height;
    ctx.drawImage(img, 0, 0);
    //     clothTexture = loader.load(can);
    //     clothTexture.anisotropy = 16;
    //     clothGeometry.alphaMap = clothTexture;
    const groundTexture = loader.load(can.toDataURL());
    // groundTexture.image = can.toDataURL();

    groundMaterial.map = groundTexture;
  });

  // const groundTexture = loader.load(can.toDataURL());
  // groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  // groundTexture.repeat.set(25, 25);
  // groundTexture.anisotropy = 16;
  // groundTexture.encoding = THREE.sRGBEncoding;

  const groundMaterial = new THREE.MeshLambertMaterial({
    // map: ,
    color: 0x22ff44ff
  });

  mesh = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000), groundMaterial);
  mesh.position.y = -250;
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  // poles

  const poleGeo = new THREE.BoxGeometry(5, 375, 5);
  const poleMat = new THREE.MeshLambertMaterial({
    color: 0xbb2244ff
  });

  mesh = new THREE.Mesh(poleGeo, poleMat);
  mesh.position.x = -125;
  mesh.position.y = -62;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  mesh = new THREE.Mesh(poleGeo, poleMat);
  mesh.position.x = 125;
  mesh.position.y = -62;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  mesh = new THREE.Mesh(new THREE.BoxGeometry(255, 5, 5), poleMat);
  mesh.position.y = -250 + (750 / 2);
  mesh.position.x = 0;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  const gg = new THREE.BoxGeometry(10, 10, 10);
  mesh = new THREE.Mesh(gg, poleMat);
  mesh.position.y = -250;
  mesh.position.x = 125;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  mesh = new THREE.Mesh(gg, poleMat);
  mesh.position.y = -250;
  mesh.position.x = -125;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  // renderer

  const canvas = {
    set width(w) {
      gl.viewport(w, h);
    },
    get width() {
      return w;
    },
    set height(h) {
      gl.viewport(w, h);
    },
    get height() {
      return h;
    },
    style: {},
    getContext() {
      return gl;
    },
    addEventListener() {}
  };
  gl.canvas = canvas;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });

  // renderer.setPixelRatio(win.devicePixelRatio);
  // renderer.setSize(w, h);

  // container.appendChild(renderer.domElement);

  renderer.outputEncoding = THREE.sRGBEncoding;

  renderer.shadowMap.enabled = true;

  //
  camera.rotation.y += 0.5;

  win.on('resize', onwinResize);

  //
}

//

function onwinResize() {
  const size = win.size;
  w = size.w;
  h = size.h;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);

}

//
win.on("mousemove", eve => {
  mouse = [eve.clientX, eve.clientY];
});


function animate(now) {
  light.position.x = map(mouse[0], 0, w, -100, 10);
  light.position.y = map(mouse[1], 0, h, -5, -1);
  simulate(now);
  render();

  gl.swap();

  setTimeout(() => {
    animate(performance.now());
  }, 1000 / 60);
}

function render() {

  const p = cloth.particles;

  for (let i = 0, il = p.length; i < il; i++) {

    const v = p[i].position;

    clothGeometry.attributes.position.setXYZ(i, v.x, v.y, v.z);

  }

  clothGeometry.attributes.position.needsUpdate = true;

  clothGeometry.computeVertexNormals();

  sphere.position.copy(ballPosition);

  renderer.render(scene, camera);

}

animate();