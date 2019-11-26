var camera, scene, renderer;
var mesh;
init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load('img/fadeaway_bk.jpg');
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var Light = new THREE.DirectionalLight(0xffffff, 0.8);
    //var pointLight = new THREE.PointLight(0xffffff);
    Light.position.set(-500, -250, 350);
    scene.add(Light);
}
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
