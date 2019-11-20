var camera, scene, renderer;
var theta = 0;

init();
animate();

function init() {
    //ĵ���� ũ��
    var width = window.innerWidth;
    var height = window.innerHeight;

    //������
    renderer = new THREE.WebGLRenderer({ antialias: true }); //antialias : �������� �����ڸ� ǥ�� �Ų��ϰ�
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //���
    scene = new THREE.Scene;
    var penguin = drawPeng(0, 100, 100);
    scene.add(penguin);
    var seal = drawSeal(0, 100, -100);
    scene.add(seal);
    var bear = drawBear(0, -100, -100);
    scene.add(bear);
    var shark = drawShark(0, -100, 100);
    scene.add(shark);
    //��鿡 �޽� �߰�

    //ī�޶� ����
    //�þ�, ��Ⱦ��, ��ü�� ī�޶��� �����Ÿ�, �ִ� �Ÿ�
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 300;
    camera.position.z = 0;
    camera.position.x = 300;
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);//��鿡 ī�޶� �߰�


    //���� �޽�
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.BackSide });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    scene.add(skybox);//��鿡 ��� �߰�


    //����
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(300, 200, 200);

    scene.add(pointLight);


    //������
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



