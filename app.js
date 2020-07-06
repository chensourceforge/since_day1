var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 0.1, 100);
camera.position.set(0, 0, 50);
scene.add(camera);

var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load( 'phone.png' );
texture.encoding = THREE.sRGBEncoding;
var material = new THREE.MeshStandardMaterial( {
  map: texture,
} );
var cube = new THREE.Mesh(boxGeometry, material);
scene.add(cube);
cube.rotation.set(0.4, 0.2, 0);
cube.position.x = -25;

var torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
var phongMaterial = new THREE.MeshStandardMaterial({color: 0xFF9500});
var torus = new THREE.Mesh(torusGeometry, phongMaterial);
scene.add(torus);

var dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xEAEFF2});
var dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
dodecahedron.position.x = 25;
scene.add(dodecahedron);

var ambientLight = new THREE.HemisphereLight(
  0xddeeff, // sky color
  0x202020, // ground color
  5, // intensity
);
var mainLight = new THREE.DirectionalLight( 0xffffff, 1 );
mainLight.position.set( 10, 10, 100 );
scene.add( ambientLight, mainLight );

var controls = new THREE.OrbitControls( camera, document.body );

var t = 0;

function play() {

  renderer.setAnimationLoop( () => {

    t += 0.01;
    cube.rotation.y += 0.01;
    torus.scale.y = Math.abs(Math.sin(t));
    dodecahedron.position.y = -7*Math.sin(t*2);
    renderer.render(scene, camera);

  } );

}

function stop() {

  renderer.setAnimationLoop( null );

}

var isPlaying = true;

function onWindowResize() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( WIDTH, HEIGHT );

  isPlaying = !isPlaying;
  if(isPlaying) {
    play();
  }
  else {
    renderer.render(scene, camera);
    stop();
  }

}

window.addEventListener( 'resize', onWindowResize );

play();