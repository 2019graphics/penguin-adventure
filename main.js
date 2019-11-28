var camera, scene, renderer, container, scoreBoard;
var theta = 0;
var random_v = [];
var seal = [];
var bear = [];
var shark = [];
var seal_count = 0;
var bear_count = 0;
var shark_count = 0;
var penguin = [];

var startPoint_bear = -5000;
var random_distance = 0;
var back_bear;

var superPenguinState = 0;
var directItem = 0;
var currentSuperPenguinTime;

var t0 = 0;
var t1 = 0;
var pengSpeed = 10;
var bearSpeed = 2;

var lockPeng = -1;//움직여도 되는 상태
var startPoint = -1;

//meshs
var icebergs, snowballs, item;
var snowCount = 50;

var collidableMeshList = [];
var itemList = [];

var score = 0;
var stage = 1;

scoreBoard = document.getElementById('scoreBoard');


//size
var maxX = 4000, maxY = 4000, maxZ = 4000;

init();

function addPoint() {
    score += stage * 80;
}
function updateScoreBoard() {
    scoreBoard.innerHTML = 'Score: ' + score + '(Stage: ' + stage + ')';
    console.log(score);
}


//조합
function randCom(total, object) {
    //total개 중에 object개 뽑기

    var lotto = new Array(object);
    var count = 0;
    var overl = true;

    while (count < object) {
        var number = 0;
        number = parseInt(Math.random() * total) + 1;
        for (var i = 0; i < count; i++) {
            if (lotto[i] == number) {
                overl = false;
            }
        }
        if (overl) {
            lotto[count] = number;
            count++;
        }
        overl = true;
    }
    return lotto;
}

function get_item() {

    firstBB = new THREE.Box3().setFromObject(penguin);

    for (index = 0; index < itemList.length; index++) {
        secondBB = new THREE.Box3().setFromObject(itemList[index]);
        var coll = firstBB.isIntersectionBox(secondBB);
        if (coll) {
            scene.remove(itemList[index])
            itemList.splice(index, 1);
            return 1;

        }

    }
    return 0;
}
function collision() {
    firstBB = new THREE.Box3().setFromObject(penguin);

    for (index = 0; index < collidableMeshList.length; index++) {
        secondBB = new THREE.Box3().setFromObject(collidableMeshList[index]);
        var coll = firstBB.isIntersectionBox(secondBB);
        if (coll) {
            collidableMeshList.splice(index, 1);
            return 1;

        }

    }
    return 0;
}

function random(random_v, i, j) {
    if (random_v == 0) {
        seal.push(drawSeal(400 * j + 50, -600 - i * 450, -600));
        var position_seal = [seal[seal_count].position.x, seal[seal_count].position.y, seal[seal_count].position.z];

        seal[seal_count].rotation.z += 90 * Math.PI / 180;
        //seal[seal_count].position.y+=-800;
        seal[seal_count].position.z += 500;
        seal[seal_count].position.x -= 500;
        //seal[seal_count].position.y-=random_distance*400;
        scene.add(seal[seal_count]);
        collidableMeshList.push(seal[seal_count]);
        seal_count++;


    }

    else if (random_v == 1) {
        bear.push(drawBear(400 * j + 50, -600 - i * 450, -600));
        bear[bear_count].rotation.z += 90 * Math.PI / 180;
        bear[bear_count].position.z += 500;
        bear[bear_count].position.x -= 500;
        //bear[bear_count].position.y-=random_distance*400;
        scene.add(bear[bear_count]);
        collidableMeshList.push(bear[bear_count]);
        bear_count++;


    }
    else if (random_v == 2) {
        shark.push(drawShark(400 * j + 50, -600 - i * 450, -600));
        shark[shark_count].rotation.z += 90 * Math.PI / 180;
        shark[shark_count].position.z += 500;
        shark[shark_count].position.x -= 500;


        //shark[shark_count].position.y+=600+i*450;

        scene.add(shark[shark_count]);
        collidableMeshList.push(shark[shark_count]);
        shark_count++;


    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!! function randommove 부분
function randommove(randomObject) {

    if (randomObject == 0) {
        var sealy = (theta * 200) % maxY + 100;
        for (var l = 0; l < seal_count; l++) {

            var speed;
            var line = seal[l].position.y;
            /*
            if(line>maxY)
            {seal[l].position.y%=maxY;
    
            }
            if(line < 200) speed = 3;
            else if(line >=200 && line <600) speed = 5;
            else if(line >=600 && line <1500) speed = 2;
    
            else speed = 7;
    */
            seal[l].position.y = sealy - 2000;
        }

    }

    else if (randomObject == 1) {

        var beary = (theta * 200) % maxY + 100;
        for (var l = 0; l < bear_count; l++) {
            bear[l].position.y = beary - 2100;
            var speed;
            var line = bear[l].position.x;
            if (line < 200) speed = 3;
            else if (line >= 200 && line < 600) speed = 5;
            else speed = 7;

        }

    }

    else if (randomObject == 2) {

        var sharky = (theta * 200) % maxY + 100;
        for (var l = 0; l < shark_count; l++) {
            shark[l].position.y = sharky - 3000
            var speed;
            var line = shark[l].position.x;
            if (line < 200) speed = 3;
            else if (line >= 200 && line < 600) speed = 5;
            else speed = 7;


        }
    }
}


//mesh 장면에 추가
function meshAdd() {
    /*iceberg*/
    icebergs = [];
    iceLoc = randCom(40, 30);
    for (var i = 0; i < 20; i++) {
        var ice = drawIce(iceLoc[i] * 100, 0, 0);
        icebergs.push(ice);
        scene.add(ice);
    }

    /*snowball*/
    //ver 1. create a snowball

    snowballs = [];
    for (var i = 0; i < snowCount; i++) {
        var snowball = drawSnowBall(Math.random() * maxX, Math.random() * maxY - 1950, (maxZ / 2) * Math.random());//눈송이 범위
        snowballs.push(snowball);
        scene.add(snowball);
    }


    penguin = drawPeng(0, 0, -40);
    penguin.scale.set(0.8, 0.8, 0.8);
    scene.add(penguin);

    back_bear = drawBear(-300, 0, 100);
    back_bear.scale.set(2, 2, 2);
    scene.add(back_bear);



    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    random_distance = Math.random() * 500 + 300;
    for (var a = 0; a < 5; a++) {
        for (var i = 0; i < 5; i++) {
            random_v.push(parseInt(Math.random() * 3));
            random(random_v[i + a * 5], i, a);

        }

        random_distance = Math.random() * 500 + 300;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 188~202 번까지

    //cloud
    for (i = 0; i < 10; i++) {
        var cloud = drawCloud(500 * Math.random() * Math.pow(2, i), Math.random() * 300 * Math.pow(-1, i), Math.random() * 600);
        scene.add(cloud);
    }


    //items
    item = drawItem(0, 0, 40);
    scene.add(item);
    itemList.push(item)

}

//water 생성
function setWater() {
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
    return waterObj;
}



function init() {
    //size
    var width = 600;
    var height = 600;

    //render
    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x9999BB, 1);
    container.appendChild(renderer.domElement);



    //mesh add
    scene = new THREE.Scene;
    meshAdd();

    //camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(-1000, -1000, 1000);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);


    //--배경
    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load('img/yonder_ft.jpg');
    var texture_bk = new THREE.TextureLoader().load('img/yonder_bk.jpg');
    var texture_up = new THREE.TextureLoader().load('img/yonder_up.jpg');
    var texture_dn = new THREE.TextureLoader().load('img/yonder_dn.jpg');
    var texture_rt = new THREE.TextureLoader().load('img/yonder_rt.jpg');
    var texture_lf = new THREE.TextureLoader().load('img/yonder_lf.jpg');


    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf, side: THREE.BackSide }));
    //여기까지----

    //background
    var skyboxGeometry = new THREE.BoxGeometry(maxX + 1, maxY + 1, maxZ);
    var skybox = new THREE.Mesh(skyboxGeometry, materialArray);

    skybox.rotation.x = 1 * Math.PI / 2;
    skybox.position.set(maxX / 2, 50, 0);




    //light
    //뒤쪽 조명
    var Light = new THREE.DirectionalLight(0xffffff, 0.8);
    //var pointLight = new THREE.PointLight(0xffffff);
    Light.position.set(-500, -250, 350);
    scene.add(Light);
    //앞쪽조명
    var Light2 = new THREE.DirectionalLight(0xffffff, 0.6);
    Light2.position.set(500, 250, 350);
    scene.add(Light2);
    //위쪽 조명
    var Light3 = new THREE.DirectionalLight(0xffffff, 0.1);
    Light3.position.set(0, 0, maxZ);
    scene.add(Light3);

    //파도
    var waterObj = setWater();
    waterObj.position.set(maxX / 2, 50, -80);



    var listener = new THREE.AudioListener();
    camera.add(listener);
    var sound = new THREE.Audio(listener);
    function playSound() {
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load("sounds/ppyong.org", function (buffer) {
            sound.setBuffer(buffer);
            sound.setVolume(0.5);
            sound.setLoop(false);
            sound.play();
        });
    }




    //움직임
    var animate = function () {
        setTimeout(requestAnimationFrame(animate), 100);
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

        for (i = 0; i < snowCount; i++) {
            snowballs[i].position.z -= 3;
            if (snowballs[i].position.z <= -100) {
                snowballs[i].position.z = maxZ / 2 - 500;
            }
        }


        //장애물 움직이기
        for (var i = 0; i < 26; i++) {
            randommove(random_v[i]);
        }

        camera.position.set(penguin.position.x - 1000, penguin.position.y - 200, 1000);
        //camera.position.y = Math.cos(theta)*2000;
        //camera.position.x = Math.sin(theta)*2000;
        camera.lookAt(penguin.position.x + 300, penguin.position.y, 0);

        //따라오는 곰 위치
        if(back_bear.position.x-100>penguin.position.x){
            alert("Catch!");
        }
        //펭귄 움직이기
        moveForward();
        if (penguin.position.x >= maxX) {
            stage++;
        }
        checkSuper();
        checkDirect();

        if (startPoint_bear == -5000)//이동 시작
        {
            startPoint_bear = back_bear.position.x; //펭귄 이동이 시작한 곳
        }
        /*
                var pengx = penguin.position.x + pengSpeed;
                if (pengx >= maxX) {
                    penguin.position.x %= maxX;
                }
                if (startPoint + 100 < pengx-5) {
                    startPoint = -1;
                    lockPeng = -1;
                    return;
                }
        
                penguin.position.x = pengx;
                pengx %= 100;
                var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
                pengz /= 50;
                penguin.position.z = pengz;
        
                */

        var bearx = back_bear.position.x + bearSpeed;


        if (penguin.position.x == 0) {
            //back_bear.position.x %= maxX;

            back_bear.position.x %= maxX;
            back_bear.position.x = 0;

            //var bearx = (theta * 200) % maxX;
            //back_bear.position.x = bearx;
        }

        else {
            back_bear.position.x = bearx;

            bearx %= 100;
            var bearz = -1 * (bearx - 50) * (bearx - 50);
            bearz /= 50;
            back_bear.position.z = bearz;

        }

        updateScoreBoard();

        renderer.render(scene, camera);

        //충돌하면 return 1 그리고 list에서 해당 object 제외.


        if (superPenguinState == 0) {
            if (collision() == 1) {
                alert("GAME OVER!");
            }
        }
        //item effect
        if (get_item() == 1) {

            //var itemRandNum = Math.floor(Math.random()*10);
            var itemRandNum = 1;
            if (itemRandNum == 0) {
                superPenguinState = 1;
                superPenguin(penguin);
            }
            else if (itemRandNum == 1) {
                directItem = 1;
                
            }
        }


    }

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 37)   //left
        {
            playSound();
            if (directItem == 0) {
                lockPeng = 3;
            }
            else if (directItem == 1) {
                lockPeng = 2;
            }

        }
        else if (keyCode == 39)   //right
        {
            playSound();
            if (directItem == 0) {
                lockPeng = 2;
            }
            else if (directItem == 1) {
                lockPeng = 3;
            }
        }

        if (keyCode == 38)   //front
        {
            playSound();
            if(directItem==0){
                lockPeng = 1;//움직이는 상태로 변환
            }
            else if(directItem==1){
                lockPeng=0;
            }
        
            addPoint();
        }
    }

    function checkSuper() {
        if (superPenguinState == 1) {
            pengSpeed = 20;
            t0 = performance.now() / 1000;
            console.log('t0', t0);
        }
        if (t0 - t1 >= 10) {
            superPenguinState = 0;
            penguin.scale.set(0.8, 0.8, 0.8);
            pengSpeed = 10;
        }
    }

    function checkDirect() {
        if (directItem == 1) {
            t0 = performance.now() /1000;
        }
        if (t0 - t1 >= 10) {
            directItem = 0;
        }
    }

    function moveForward() {
        if (lockPeng == 1) {//움직이는 상태 = 키보드 입력 받으면 안됨 = 움직이는 동작 수행

            penguin.rotation.z = 0;
            if (startPoint == -1)//이동 시작
            {
                startPoint = penguin.position.x;//펭귄 이동이 시작한 곳
            }

            var pengx = penguin.position.x + pengSpeed;
            if (pengx >= maxX) {
                penguin.position.x %= maxX;
            }
            if (startPoint + 100 < pengx - 5) {
                startPoint = -1;
                lockPeng = -1;
                return;
            }

            penguin.position.x = pengx;
            pengx %= 100;
            var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
            pengz /= 50;
            penguin.position.z = pengz;
        }
        else if (lockPeng == 3) { //왼쪽
            penguin.rotation.z = Math.PI / 2;
            if (startPoint == -1)//이동 시작
            {
                startPoint = penguin.position.y;//펭귄 이동이 시작한 곳
            }

            var pengy = penguin.position.y + pengSpeed;
            var maxRightY = maxY / 2;
            if (pengy >= maxRightY) {
                return;
            }
            if (startPoint + 100 < pengy - 5) {
                startPoint = -1;
                lockPeng = -1;
                return;
            }

            penguin.position.y = pengy;
            if (pengy < 0)
                pengy *= -1;
            pengy %= 100;
            var pengz = -1 * (pengy - 50) * (pengy - 50) + 2500;
            pengz /= 50;
            penguin.position.z = pengz;
        }
        else if (lockPeng == 2) { //오른쪽
            penguin.rotation.z = - Math.PI / 2;
            if (startPoint == -1)//이동 시작
            {
                startPoint = penguin.position.y;//펭귄 이동이 시작한 곳
            }

            var pengy = penguin.position.y - pengSpeed;
            var maxRightY = (maxY / 2) * -1;

            if (pengy < maxRightY + 100) {
                return;
            }

            if (startPoint - 100 > pengy + 5) {
                startPoint = -1;
                lockPeng = -1;
                return;
            }

            penguin.position.y = pengy;
            if (pengy < 0)
                pengy *= -1;
            pengy %= 100;
            var pengz = -1 * (pengy - 50) * (pengy - 50) + 2500;
            pengz /= 50;
            penguin.position.z = pengz;
        }
        else if(lockPeng==0){

            penguin.rotation.z = Math.PI;
            if (startPoint == -1)//이동 시작
            {
                startPoint = penguin.position.x;//펭귄 이동이 시작한 곳
            }

            var pengx = penguin.position.x + pengSpeed;
            if (pengx >= maxX) {
                penguin.position.x %= maxX;
            }
            if (startPoint + 100 < pengx - 5) {
                startPoint = -1;
                lockPeng = -1;
                return;
            }

            penguin.position.x = pengx;
            pengx %= 100;
            var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
            pengz /= 50;
            penguin.position.z = pengz;

        }
    }


    //랜더링 시작
    animate();

    function superPenguin(penguin) {
        penguin.scale.set(2.0, 2.0, 2.0);
    }

}