var camera, scene, renderer;
var theta = 0;

//meshs
var icebergs, penguin, seal, bear, shark, snowballs;
var snowCount = 10;

//size
var maxX = 2000, maxY = 2000, maxZ = 1000;

init();

//조합
function randCom(total, object) {
    //total개 중에 object개 뽑기

    var lotto = new Array(object); // 6개의 배열이 lotto에 저장
    var count = 0; //추출한 로또번호의 갯수
    var overl = true; // 번호중복 여부 변수
 
    while (count < object) { // 로또번호 6번 얻을 때까지 반복.
        var number = 0; //랜덤번호 가져오는 변수
        number = parseInt(Math.random() * total) + 1; // 1~45사이에 랜덤번호 추출
 
        for (var i = 0; i < count; i++) { // 1부터 i까지 반복하여 중복확인
            if (lotto[i] == number) { // 중복된 번호가 아니면 넘어가기.
                overl = false;
            }
        }
 
        if (overl) { //중복 없을 시 count 1 증가
            lotto[count] = number; //추출된 번호를 배열에 넣기
            count++;
        }
 
        overl = true; //원래 true으로 돌아가기
    }
    return lotto;
}

//mesh remove
function remove(id) {
  scene.remove(scene.getObjectByName(id));
}

function meshAdd() {
    /*iceberg*/
    icebergs = [];
    iceLoc = randCom(20, 10);
    for (var i = 0; i < 10; i++) {
        var ice = drawIce(iceLoc[i]*100, 0, 0);
        icebergs.push(ice);
        scene.add(ice);
    }

    /*snowball*/
    //ver 1. create a snowball
    /*
    snowballs = [];
    for (var i = 0; i < snowCount ; i++) {
        var snowball = drawSnowBall(Math.random() * 500, Math.random() * 500, Math.random() * 500);
        snowballs.push(snowball);
        scene.add(snowball);
    }
    */
    
    penguin = drawPeng(0, 0, -40);
    penguin.scale.set(0.8, 0.8, 0.8);
    scene.add(penguin);
    seal = drawSeal(0, 0, -0);
    scene.add(seal);
    bear = drawBear(0, -200, -0);
    scene.add(bear);
    shark = drawShark(0, -200, 200);
    scene.add(shark);
}

function init() {
    //size
    var width = window.innerWidth;
    var height = window.innerHeight;

    //render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //mesh add
    scene = new THREE.Scene;
    meshAdd();

    //camera
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
	camera.position.set(-1000, -1000, 1000);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    //background
    var skyboxGeometry = new THREE.CubeGeometry(maxX, maxY, maxZ);
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.BackSide });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skybox.position.set(1000, 0, 0);
    scene.add(skybox);

    //light
    var Light = new THREE.DirectionalLight(0xffffff,0.8);
    //var pointLight = new THREE.PointLight(0xffffff);
    Light.position.set(-500, -250, 350);
    scene.add(Light);

    var Light2 = new THREE.DirectionalLight(0xffffff, 0.6);
    Light2.position.set(500, 250, 350);
    scene.add(Light2);

    var Light3 = new THREE.DirectionalLight(0xffffff, 0.1);
    Light3.position.set(0, 0, maxZ);
    scene.add(Light3);






    /* Water */
    //처음 2개까지로만 크기 조절.
    var waterGeo = new THREE.PlaneGeometry(maxX, maxY, 50, 50);
    var waterMat = new THREE.MeshPhongMaterial({
        color: 0x3366CC,
        emissive: 0x009999,
        opacity: 0.5,
        shading: THREE.FlatShading,
        shininess: 60,
        specular: 30,
        transparent: true
    });

    for (var j = 0; j < waterGeo.vertices.length; j++) {
        waterGeo.vertices[j].x = waterGeo.vertices[j].x + ((Math.random() * Math.random()) * 30);
        waterGeo.vertices[j].y = waterGeo.vertices[j].y + ((Math.random() * Math.random()) * 20);
    }

    var waterObj = new THREE.Mesh(waterGeo, waterMat);
    waterObj.position.set(1000, 0, -80);
    scene.add(waterObj);




    var animate = function () {
        requestAnimationFrame(animate);
        theta += 0.01;

        //wave
        var particle, i = 0;
        var count = theta * 2;
        for (var ix = 0; ix < 50; ix++) {
            for (var iy = 0; iy < 50; iy++) {
                waterObj.geometry.vertices[i++].z = (Math.sin((ix + count) * 2) * 3) +
                    (Math.cos((iy + count) * 1.5) * 6);
                waterObj.geometry.verticesNeedUpdate = true;
            }
        }
        
        //snowball
        /*
        for (i = 0; i < snowCount ; i++) {
            //alert(snowballs[i].position.z);
            snowballs[i].position.z -= 3;
            if (snowballs[i].position.z <= -200) {
                snowballs[i].position.z = 11000;
            }
        }
        */

        //penguin move
        var pengx = (theta * 200) % maxX;
        penguin.position.x = pengx;
        pengx %= 100;
        var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
        pengz /= 50;
        penguin.position.z = pengz;
        

        camera.position.set(2000, -2000, 1500);
        //camera.position.y = Math.cos(theta)*2000;
        //camera.position.x = Math.sin(theta)*2000;
        camera.lookAt(0, 0, 0);


        renderer.render(scene, camera);
    }
    animate();
}
