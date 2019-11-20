var camera, scene, renderer;
var theta = 0;

init();
animate();

function init() {
    //캔버스 크기
    var width = window.innerWidth;
    var height = window.innerHeight;

    //랜더러
    renderer = new THREE.WebGLRenderer({ antialias: true }); //antialias : 오브젝스 가장자리 표현 매끈하게
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //장면
    scene = new THREE.Scene;
    var penguin = drawPeng(0, 100, 100);
    scene.add(penguin);
    var seal = drawSeal(0, 100, -100);
    scene.add(seal);
    var bear = drawBear(0, -100, -100);
    scene.add(bear);
    var shark = drawShark(0, -100, 100);
    scene.add(shark);
    //장면에 메시 추가

    //카메라 생성
    //시야, 종횡비, 물체과 카메라의 최저거리, 최대 거리
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 300;
    camera.position.z = 0;
    camera.position.x = 300;
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);//장면에 카메라 추가


    //배경용 메시
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.BackSide });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    scene.add(skybox);//장면에 배경 추가


    //조명
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(300, 200, 200);

    scene.add(pointLight);


    //랜더링
    var animate = function () {
        requestAnimationFrame(animate);
        
        theta += 0.01;
        //penguin.position.x = theta * 100;
        /*var temp = (theta * 10) % 4;
        temp = -1 * (temp - 2) * (temp - 2) + 4;
        penguin.position.z = temp * 20;*/
        

        //camera.position.set(400,200,200)
        camera.position.y = Math.cos(theta)*800;
        camera.position.x = Math.sin(theta)*800;
        camera.position.z = 300;
        camera.lookAt(0, 0, 0);


        renderer.render(scene, camera);
    }
    animate();
}



