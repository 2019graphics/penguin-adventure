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

var startPoint_bear = -5000; // initial position of bear
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
var waterLoc = [];
var iceLoc;
var seal_direct0 = [];
var seal_direct1= [];
var shark_direct0 = [];
var shark_direct1 = [];

//meshs
var icebergs, snowballs, item;
var snowCount = 50;

var collidableMeshList = []; //list of obtacles
var itemList = []; //list of items

var score = 0; //initial score
var stage = 1; //initial stage

var iceCount = 15;

scoreBoard = document.getElementById('scoreBoard'); //connect scoreboard


//size
var maxX = 3000, maxY = 3000, maxZ = 3000;
var pathWidth = maxY / 100;

init();

//add score function
function addPoint() {
    score += stage * 80;
}
//update state of scoreboard
function updateScoreBoard() {
    scoreBoard.innerHTML = 'Score: ' + score + '(Stage: ' + stage + ')';
}
//ice position random select
function randCom(total, object) {
    //total개 중에 object개 뽑기
    var lotto = new Array(object);
    lotto[0] = 0;
    var count = 1;
    var overl = true;

    while (count < object) {
        var number = 0;
        number = parseInt(Math.random() * total) + 1;
        for (var i = 1; i < count; i++) {
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
//check collision with item then return 1 when there is a collsion
function get_item() {
    //make box with penguin object
    firstBB = new THREE.Box3().setFromObject(penguin);

    for (index = 0; index < itemList.length; index++) {
        //make box with item
        secondBB = new THREE.Box3().setFromObject(itemList[index]);
        var coll = firstBB.isIntersectionBox(secondBB);
        if (coll) {
            //Deletes a colliding object from a scene
            scene.remove(itemList[index])
            //Deletes a colliding object from a list
            itemList.splice(index, 1);
            return 1;
        }

    }
    return 0;
}
//check collision with obtacles then return 1 when there is a collsion
function collision() {
    //make box with penguin object
    firstBB = new THREE.Box3().setFromObject(penguin);

    for (index = 0; index < collidableMeshList.length; index++) {
        //make box with obtacle object
        secondBB = new THREE.Box3().setFromObject(collidableMeshList[index]);
        //check intersection between two boxes
        var coll = firstBB.isIntersectionBox(secondBB);
        if (coll) {
            //Deletes a colliding object from a list
            collidableMeshList.splice(index, 1);
            return 1;

        }

    }
    return 0;
}
//create items
function itemRandom() {
    for (i = 0; i < 3; i++) {
        var randX = getRandomArbitrary(1, 28);   //시작 두번째칸부터 마지막에서 두번째칸까지: (0 ~ 2900)
        var randY = getRandomArbitrary(-14, 13);   //시작 두번째칸부터 마지막에서 두번째칸까지 (-1500 ~ 1400)

        console.log('x', randX, 'y', randY)

        item = drawItem(randX * 100, randY * 100, 0);
        scene.add(item);
        itemList.push(item);
    }

    console.log('itemList', itemList)
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function draw_seal(seal_location, direction, i) {
    if (direction == 0) {
        seal.push(drawSeal(i * 500, -200 * seal_location, 0));
        //seal.push(drawSeal(10,0 ,0));
        //seal.push(drawSeal(100 * iceLoc[seal_location] - 50, 0, 0));
        //seal.push(drawSeal(100*iceLoc[seal_location] , -i * 450,0));
        seal[seal_count].scale.set(0.5, 0.5, 0.5);
        //seal.push(drawSeal(100*iceLoc[seal_location] , -i * 450,0));
        //seal.push(drawSeal(i*450 ,100*iceLoc[seal_location],0));
        //seal.push(drawSeal(100*iceLoc[0] , -i * 450, -600));
        // var position_seal = [seal[seal_count].position.x, seal[seal_count].position.y, seal[seal_count].position.z];
        seal[seal_count].rotation.z += 90 * Math.PI / 180;
        //seal[seal_count].position.y+=-800;
        // seal[seal_count].position.z += 500;
        //seal[seal_count].position.x -= 500;
        //seal[seal_count].position.y-=random_distance*400;
        scene.add(seal[seal_count]);
        seal_direct0.push(seal_count);
        collidableMeshList.push(seal[seal_count]);
        seal_count++;

    }

    else {         //seal.push(drawSeal(0,100*iceLoc[seal_location] ,0));
        seal.push(drawSeal(i * 500, 200 * seal_location, 0));
        //seal.push(drawSeal(100*iceLoc[seal_location] , -i * 450,0));
        seal[seal_count].scale.set(0.5, 0.5, 0.5);
        //seal.push(drawSeal(100*iceLoc[seal_location] , i * 450+3000, 0));
        //seal.push(drawSeal(i*450 ,100*iceLoc[seal_location],0));
        //var position_seal = [seal[seal_count].position.x, seal[seal_count].position.y, seal[seal_count].position.z];
        seal[seal_count].rotation.z -= 90 * Math.PI / 180;
        //seal[seal_count].position.y-=-800;
        //seal[seal_count].position.z += 500;
        // seal[seal_count].position.x -= 500;
        //seal[seal_count].position.y-=random_distance*400;
        scene.add(seal[seal_count]);
        seal_direct1.push(seal_count);
        collidableMeshList.push(seal[seal_count]);
        seal_count++;

    }

}

function draw_shark(shark_location, direction, i) {
    if (direction == 0) {

        shark.push(drawShark(i * 500, -200 * shark_location, 0));
        shark[shark_count].scale.set(0.5, 0.5, 0.5);
        shark[shark_count].rotation.z += 90 * Math.PI / 180;
        scene.add(shark[shark_count]);
        shark_direct0.push(shark_count);
        collidableMeshList.push(shark[shark_count]);
        shark_count++;
    }

    else {

        shark.push(drawShark(i * 500, 200 * shark_location, 0));
        shark[shark_count].scale.set(0.5, 0.5, 0.5);
        shark[shark_count].rotation.z -= 90 * Math.PI / 180;
        scene.add(shark[shark_count]);
        shark_direct1.push(shark_count);
        collidableMeshList.push(shark[shark_count]);
        shark_count++;

    }
}

function seal_move() {
    var sealy = (theta * 200) % maxY + 100;
    for(var l=0;l<seal_direct0.length;l++){
        seal[seal_direct0[l]].position.y=sealy-2000;
    }
    for(var l=0;l<seal_direct1.length;l++){
        seal[seal_direct1[l]].position.y=-sealy + 2000;
    }

}

function shark_move() {
    var sharky = (theta * 200) % maxY + 100;
    for(var l=0;l<shark_direct0.length;l++){
        shark[shark_direct0[l]].position.y=sharky - 3000;
    }
    for(var l=0;l<shark_direct1.length;l++){
        shark[shark_direct1[l]].position.y=-sharky + 3000;
    }
}

//mesh 장면에 추가
function meshAdd() {
    /*iceberg*/
    icebergs = [];
    //store position index of icebergs
    iceLoc = randCom(pathWidth, iceCount);

    for (var i = 0; i < iceCount; i++) {
        var ice = drawIce(iceLoc[i] * 100, 0, 0, pathWidth);
        icebergs.push(ice);
        scene.add(ice);
    }

    iceLoc = iceLoc.sort(function (a, b) {

        return a - b;
    });



    /*snowball*/
    //ver 1. create a snowball

    snowballs = [];
    for (var i = 0; i < snowCount; i++) {
        var snowball = drawSnowBall(Math.random() * maxX, Math.random() * maxY - 1950, (maxZ / 2) * Math.random());//눈송이 범위
        snowballs.push(snowball);
        scene.add(snowball);
    }


    penguin = drawPeng(0, 0, -40);
    penguin.scale.set(0.7, 0.7, 0.7);
    scene.add(penguin);

    back_bear = drawBear(-300, 0, 100);
    back_bear.scale.set(2, 2, 2);
    scene.add(back_bear);


    var num = 1;
    for (var i = 1; i < iceCount; i++) {
        for (var j = num; j < 30; j++) {
            if (iceLoc[i] != j) {
                waterLoc.push(j);
            }
            else {
                j++;
                num = j;
                break;
            }
        }
    }

    for (var j = 0; j < iceCount; j++) {
        random_direction = parseInt(Math.random() * 2);
        for (var n = 0; n < 1; n++) {
            draw_shark(waterLoc[j], random_direction, n);
        }
    }

    for (var i = 1; i < iceCount; i++) {
        random_direction = parseInt(Math.random() * 2);
        for (var n = 0; n < 1; n++) {
            draw_seal(iceLoc[i], random_direction, n);
        }

    }
    //cloud
    for (i = 0; i < 9; i++) {
        var cloud = drawCloud(500 * Math.random() * Math.pow(2, i), Math.random() * 300 * Math.pow(-1, i), Math.random() * 600);
        scene.add(cloud);
    }
    //items
    itemRandom()

}


//create water function
function setWater() {
    /* Water */
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
    //describe the wave
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
    skybox.position.set(maxX / 2 - 50, 50, 0);
    scene.add(skybox);




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
    waterObj.position.set(maxX / 2 - 50, 50, -80);
    scene.add(waterObj);


    var listener = new THREE.AudioListener();
    camera.add(listener);
    var sound = new THREE.Audio(listener);
    function playSoundPenguin() {
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load("sounds/ppyong.mp3", function (buffer) {
            sound.setBuffer(buffer);
            sound.setVolume(0.5);
            sound.setLoop(false);
            sound.play();
        });
    }

    function playSoundBoom() {
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load("sounds/boom.mp3", function (buffer) {
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
        seal_move();
        shark_move();



        // camera.position.set(penguin.position.x - 1000, penguin.position.y - 200, 1000);
        // camera.lookAt(penguin.position.x + 300, penguin.position.y, 0);

        camera.position.set(penguin.position.x, penguin.position.y, 3000);
        camera.lookAt(penguin.position.x, penguin.position.y, 0);

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
        // //따라오는 곰 위치
        // if(back_bear.position.x>penguin.position.x){
        //     playSoundBoom();
        // 	alert("Catch!");
        // 	history.back();
        // }


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
                playSoundBoom();
                alert("GAME OVER! A");
                history.back();
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
            playSoundPenguin();
            if (directItem == 0) {
                lockPeng = 3;
            }
            else if (directItem == 1) {
                lockPeng = 2;
            }

        }
        else if (keyCode == 39)   //right
        {
            playSoundPenguin();
            if (directItem == 0) {
                lockPeng = 2;
            }
            else if (directItem == 1) {
                lockPeng = 3;
            }
        }

        if (keyCode == 38)   //front
        {
            playSoundPenguin();
            if (directItem == 0) {
                lockPeng = 1;//움직이는 상태로 변환
            }
            else if (directItem == 1) {
                lockPeng = 0;
            }

        }
    }

    function checkSuper() {
        if (superPenguinState == 1) {
            pengSpeed = 20;
            t0 = performance.now() / 1000;
            //console.log('t0', t0);
        }
        if (t0 - t1 >= 10) {
            superPenguinState = 0;
            penguin.scale.set(0.7, 0.7, 0.7);
            pengSpeed = 10;
        }
    }

    function checkDirect() {
        if (directItem == 1) {
            t0 = performance.now() / 1000;
        }
        if (t0 - t1 >= 10) {
            directItem = 0;
        }
    }
    function isThere(position) {
        for (var k = 0; k < iceCount; k++) {
            if (iceLoc[k] == position) {
                return 1;
            }
        }
        return 0;
    }
    function howMove(start, end) {
        var s = isThere(start);
        var e = isThere(end);

        if (s == 1 && e == 0) {
            return 1;//얼음에서 바다로
        } else if (s == 0 && e == 1) {
            return 2;//바다에서 얼음으로
        } else if (s == 1 && e == 1) {
            return 3;//얼음에서 얼음으로
        } else if (s == 0 && e == 0) {
            return 4;//바다에서 바다로
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
            if (pengx > maxX) {
                penguin.position.x %= maxX;
            }
            if (startPoint + 100 < pengx - 5) {
                startPoint = -1;
                lockPeng = -1;
                return;
            }

            var state = howMove(startPoint / 100, startPoint / 100 + 1);
            if (startPoint / 100 == maxY / 100 - 1)
                state = 5;


            penguin.position.x = pengx;
            if (pengx % 100 != 0) {
                pengx %= 100;
            } else if (pengx % 100 == 0) {
                pengx = 100;
            }

            switch (state) {
                case 1://빙하에서 바다로
                    if (pengx == 100) {
                        penguin.position.z = -78;
                        break;
                    }
                    var pengz = -1 * Math.pow((1.3 * pengx - 50), 2) + 2500;
                    pengz /= 50;
                    penguin.position.z = pengz;
                    break;
                case 2://바다에서 빙하로
                    if (pengx == 100) {
                        penguin.position.z = 0;
                        break;
                    }
                    var tempXOffset = 100 - (100 / 1.3);
                    var pengz = -1 * Math.pow((1.3 * (pengx - tempXOffset) - 50), 2) + 2500;

                    pengz /= 50;
                    penguin.position.z = pengz;
                    break;
                case 3://빙하에서 빙하로
                    var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
                    pengz /= 50;
                    penguin.position.z = pengz;
                    break;
                case 4://바다에서 바다로
                    var pengz = -78
                    penguin.position.z = pengz;
                    break;
                case 5:
                    break;
            }


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

            var state = isThere(penguin.position.x / 100);
            if (state == 1)//빙하위에서 옆으로 이동
            {
                penguin.position.y = pengy;
                if (pengy < 0)
                    pengy *= -1;
                pengy %= 100;
                var pengz = -1 * (pengy - 50) * (pengy - 50) + 2500;
                pengz /= 50;
                penguin.position.z = pengz;
            } else {
                penguin.position.y = pengy;
                var pengz = -78;
                penguin.position.z = pengz;
            }

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


            var state = isThere(penguin.position.x / 100);
            if (state == 1)//빙하위에서 옆으로 이동
            {
                penguin.position.y = pengy;
                if (pengy < 0)
                    pengy *= -1;
                pengy %= 100;
                var pengz = -1 * (pengy - 50) * (pengy - 50) + 2500;
                pengz /= 50;
                penguin.position.z = pengz;
            } else {
                penguin.position.y = pengy;
                var pengz = -78;
                penguin.position.z = pengz;
            }
        }
        else if (lockPeng == 0) {//뒤

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