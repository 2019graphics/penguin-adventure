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

var itemRandNum = 0;

var startTime1 = 0;
var startTime2 = 0

var t0 = 0;
var t1 = 0;
var pengSpeed = 20;
var bearSpeed = 2;

var lockPeng = -1;//state of moving availableS
var startPoint = -1;
var waterLoc = [];
var iceLoc = [];
var seal_direct0 = [];
var seal_direct1 = [];
var shark_direct0 = [];
var shark_direct1 = [];

var shark_theta = 0;
var seal_theta = 0;

//meshs
var icebergs, snowballs, item;
var snowCount = 50;

var collidableMeshList = []; //list of obtacles
var itemList = []; //list of items

var score = 0; //initial score
var stage = 1; //initial stage

var iceCount = 15;

scoreBoard = document.getElementById('scoreBoard'); //connect scoreboard

var Alert = new CustomAlert();//game over screen

//size
var maxX = 3000, maxY = 3000, maxZ = 3000;
var pathWidth = maxY / 100;

var timer;

init();

function stageUp(){
    stage++;
    back_bear.position.x=-100;
    superPenguinState=0;
    directItem=0;


}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //except maximun, include minimum
 }
//add score function
function addPoint() {
    score += stage * 80;
}
//update state of scoreboard
function updateScoreBoard() {
    scoreBoard.innerHTML = 'Score: ' + score + ' (Stage: ' + stage + ')';
}
//ice position random select
function randCom(total, object) {
    //select objects in total
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
    peng=penguin.clone();
    firstBB = new THREE.Box3().setFromObject(peng);

    for (index = 0; index < collidableMeshList.length; index++) {
        //make box with obtacle object
        secondBB = new THREE.Box3().setFromObject(collidableMeshList[index]);
        //check intersection between two boxes
        var coll = firstBB.isIntersectionBox(secondBB);
        if (coll) {

            return 1;

        }

    }
    return 0;
}
//create items
function itemRandom() {
    var randX = randCom(maxX / 100, 3);
    var randY = randCom(pathWidth, 3);
    var c = [-1, 1];

    for (i = 0; i < 3; i++) {
        j = Math.floor(Math.random() * 2);//0-1 
        itemX = (randX[i] + 1) * 100;
        itemY = Math.floor(randY[i] / 2) * 100 * c[j];
        item = drawItem(itemX, itemY, 0);
        item.scale.set(0.7, 0.7, 0.7);
        scene.add(item);
        itemList.push(item);
    }
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function draw_seal(seal_location, direction, i) {
    if (direction == 0) {
        var between_seal = Math.random() * 500 + 200;
        seal.push(drawSeal(i * 2000 + between_seal, -200 * seal_location, -100));
        
        seal[seal_count].rotation.z += 90 * Math.PI / 180;
        scene.add(seal[seal_count]);
        seal[seal_count].scale.set(0.5, 0.5, 0.5);
        seal_direct0.push(seal_count);
        collidableMeshList.push(seal[seal_count]);

        seal_count++;

    }

    else {
        var between_seal = Math.random() * 500 + 200;
        seal.push(drawSeal(i * 2000 + between_seal, 200 * seal_location, -100));
        
        seal[seal_count].rotation.z -= 90 * Math.PI / 180;
        scene.add(seal[seal_count]);
        seal[seal_count].scale.set(0.5, 0.5, 0.5);
        seal_direct1.push(seal_count);
        collidableMeshList.push(seal[seal_count]);

        seal_count++;

    }

}
function draw_shark(shark_location, direction, i) {
    if (direction == 0) {
        var between_shark = Math.random() * 500 + 200;
        shark.push(drawShark(i * 2000 + between_shark, -200 * shark_location, -300));
        shark[shark_count].rotation.z += 90 * Math.PI / 180;
        scene.add(shark[shark_count]);
        shark[shark_count].scale.set(0.5, 0.5, 0.5);

        shark_direct0.push(shark_count);
        collidableMeshList.push(shark[shark_count]);

        shark_count++;
    }

    else {
        var between_shark = Math.random() * 500 + 200;
        shark.push(drawShark(i * 2000 + between_shark, 200 * shark_location, -300));
        shark[shark_count].rotation.z -= 90 * Math.PI / 180;
        shark[shark_count].position.y += 5000;
        scene.add(shark[shark_count]);
        shark[shark_count].scale.set(0.5, 0.5, 0.5);

        shark_direct1.push(shark_count);
        collidableMeshList.push(shark[shark_count]);

        shark_count++;

    }
}
//move obtacles functions
function seal_move() {

    var sealy = (seal_theta * 200) % maxY + 100 + 500;
    for (var l = 0; l < seal_direct0.length; l++) {
        seal[seal_direct0[l]].position.y = sealy - 2000;
    }
    for (var l = 0; l < seal_direct1.length; l++) {
        seal[seal_direct1[l]].position.y = -sealy + 2000;
    }

}

function shark_move() {
    var sharky = (shark_theta * 200) % maxY + 1000;
    for (var l = 0; l < shark_direct0.length; l++) {

        shark[shark_direct0[l]].position.y = sharky - 3000;
    }
    for (var l = 0; l < shark_direct1.length; l++) {
        shark[shark_direct1[l]].position.y = -sharky + 3000;

    }
}


//add mesh to scene
function meshAdd() {
    /*iceberg*/
    icebergs = [];
    //store position index of icebergs
    iceLoc = randCom(pathWidth, iceCount);

    for (var i = 0; i < iceCount; i++) {
        var ice = drawIce(0, 0, 0, pathWidth);
        icebergs.push(ice);
        scene.add(icebergs[i]);
    }
    for (var i = 0; i < iceCount; i++) {
        icebergs[i].position.x = iceLoc[i] * 100;
    }

    iceLoc = iceLoc.sort(function (a, b) {

        return a - b;
    });



    /*snowball*/
    snowballs = [];
    for (var i = 0; i < snowCount; i++) {
        var snowball = drawSnowBall(Math.random() * maxX, Math.random() * maxY - 1950, (maxZ / 2) * Math.random());//range of snowballs
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
    //obtacles
    for (var j = 0; j < iceCount; j++) {
        random_direction = parseInt(Math.random() * 2);
        for (var n = 0; n < 2; n++) {
            draw_shark(waterLoc[j], random_direction, n);
        }
    }

    for (var i = 1; i < iceCount; i++) {
        random_direction = parseInt(Math.random() * 2);
        for (var n = 0; n < 2; n++) {
            draw_seal(iceLoc[i], random_direction, n);
        }

    }


    //cloud
    for (i = 0; i < 9; i++) {
        var cloud = drawCloud(500 * Math.random() * Math.pow(2, i), Math.random() * 300 * Math.pow(-1, i), Math.random() * 600);
        scene.add(cloud);
    }
    //item
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


    //background textures
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


    //background
    var skyboxGeometry = new THREE.BoxGeometry(maxX + 1, maxY + 1, maxZ);
    var skybox = new THREE.Mesh(skyboxGeometry, materialArray);

    skybox.rotation.x = 1 * Math.PI / 2;
    skybox.position.set(maxX / 2 - 50, 50, 0);
    scene.add(skybox);




    //light
    //backward
    var Light = new THREE.DirectionalLight(0xffffff, 0.8);
    //var pointLight = new THREE.PointLight(0xffffff);
    Light.position.set(-500, -250, 350);
    scene.add(Light);
    //forward
    var Light2 = new THREE.DirectionalLight(0xffffff, 0.6);
    Light2.position.set(500, 250, 350);
    scene.add(Light2);
    //left
    var Light3 = new THREE.DirectionalLight(0xffffff, 0.1);
    Light3.position.set(0, 0, maxZ);
    scene.add(Light3);

    //wave
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




    //movement
    var animate = function () {
        t1 = performance.now() / 1000;
        timer= setTimeout(requestAnimationFrame(animate), 100);
        theta += 0.01;

        
        if(stage==0)
        {
            shark_theta += stage * 0.006;
            seal_theta +=  stage * 0.004;
        }
        else if(stage!=0)
        {
            shark_theta += 0.01 +stage * 0.006;
            seal_theta +=  0.01+stage * 0.004;
        }

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



        camera.position.set(penguin.position.x - 1000, penguin.position.y - 200, 1000);
        camera.lookAt(penguin.position.x + 300, penguin.position.y, 0);


        //penguin moving
        moveForward();
        var checkx = penguin.position.x

        console.log(directItem,"-1--",startTime1,startTime2);
        checkSuper();
        console.log(directItem,"-2--",startTime1,startTime2);
        checkDirect();
        console.log(directItem,"-3--",startTime1,startTime2);


        if (startPoint_bear == -5000)//start moving
        {
            startPoint_bear = back_bear.position.x;
        }
        //position of bear
        if(back_bear.position.x-100>penguin.position.x){
            playSoundBoom();
            stage=0;
            bearSpeed=0;
        	Alert.render("Score : " + score);
        }


        var bearx = back_bear.position.x + bearSpeed;


        if (penguin.position.x == 0) {
            back_bear.position.x = -100;
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

        //check collision
        if (superPenguinState == 0) {
            if (collision() == 1 && penguin.position.x != 0) {
                playSoundBoom();
                clearTimeout(timer);
                stage=0;
                bearSpeed=0;

                Alert.render("Score : " + score);
            }
        }
        //item effect
        if (get_item() == 1) {
            var itemRandNum = getRandomInt(0, 2);
            console.log(itemRandNum);
            if (itemRandNum == 0) {
                superPenguinState = 1;
                penguin.scale.set(2.0, 2.0, 2.0);
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
                lockPeng = 1;
            }
            else if (directItem == 1) {
                lockPeng = 0;
            }

        }
    }

    function checkSuper() {
        if (superPenguinState == 1 && startTime1 == 0) {
            startTime1 = 1;
            pengSpeed = 30;
            t0 = performance.now() / 1000;
        }

        if (t1 - t0 >= 3 && startTime1 == 1) {
            t0 = 0;
            superPenguinState = 0;
            penguin.scale.set(0.7, 0.7, 0.7);
            pengSpeed = 20;
            startTime1 = 0;
        }
    }

    function checkDirect() {
        if (directItem == 1 && t0 == 0 && startTime2 == 0) {   //state of being out
            t0 = performance.now() / 1000;
            startTime2 = 1;
        }
        //collision state
        if (t1 - t0 >= 3 && startTime2 == 1) { 
            t0 = 0;
            directItem = 0;
            startTime2 = 0;
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
            return 1;//ice to ocean
        } else if (s == 0 && e == 1) {
            return 2;//ocean to ice
        } else if (s == 1 && e == 1) {
            return 3;//ice to ice
        } else if (s == 0 && e == 0) {
            return 4;//ocean to ocean
        }
    }
    function resetMap() {

        iceLoc = randCom(pathWidth, iceCount);
        for (var l = 0; l < 15; l++) {
            icebergs[l].position.x = iceLoc[l] * 100;
        }



        //item
        for(var i=0;i<itemList.length;i++)
        {
            scene.remove(itemList[i]);
        }

        itemRandom();
        
    }

    function moveForward() {
        if (lockPeng == 1 || lockPeng == 0) { //front
            if(lockPeng==0){
                penguin.rotation.z=Math.PI;
            }
            else if(lockPeng==1){
                penguin.rotation.z = 0;
            }

            if (startPoint == -1)//start moving
            {
                startPoint = penguin.position.x;//start point of penguin
            }

            var pengx = penguin.position.x + pengSpeed;
            if (pengx > maxX) {
                resetMap();
                stageUp();

                penguin.position.x %= maxX;

                startPoint = -1;
                lockPeng = -1;
                return;
            }
            if (startPoint + 100 < pengx - 5) {
                startPoint = -1;
                lockPeng = -1;
                if (collision() == 0 || superPenguinState == 1) {
                    addPoint();
                }
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
                case 1://ice to ocean
                    if (pengx == 100) {
                        penguin.position.z = -78;
                        break;
                    }
                    var pengz = -1 * Math.pow((1.3 * pengx - 50), 2) + 2500;
                    pengz /= 50;
                    penguin.position.z = pengz;
                    break;
                case 2://ocean to ice
                    if (pengx == 100) {
                        penguin.position.z = 0;
                        break;
                    }
                    var tempXOffset = 100 - (100 / 1.3);
                    var pengz = -1 * Math.pow((1.3 * (pengx - tempXOffset) - 50), 2) + 2500;

                    pengz /= 50;
                    penguin.position.z = pengz;
                    break;
                case 3://ice to ice
                    var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
                    pengz /= 50;
                    penguin.position.z = pengz;
                    break;
                case 4://ocean to ocean
                    var pengz = -78
                    penguin.position.z = pengz;
                    break;
                case 5:
                    break;
            }

        }
        else if (lockPeng == 3 || lockPeng == 2) { //left || right
            if (lockPeng == 3) {
                penguin.rotation.z = Math.PI / 2;// minus value
                if (startPoint == -1)//start moving
                {
                    startPoint = penguin.position.y;//start point of penguin
                }

                var pengy = penguin.position.y + pengSpeed;//minus value
                var maxRightY = maxY / 2;//minus value
                if (pengy >= maxRightY) {//different condition
                    return;
                }
                if (startPoint + 100 < pengy - 5) {//oppisite sign
                    startPoint = -1;
                    lockPeng = -1;
                    return;
                }
            } else if (lockPeng == 2) {
                penguin.rotation.z = -Math.PI / 2;
                if (startPoint == -1)//start moving
                {
                    startPoint = penguin.position.y;//start point of penguin
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
            }

            var state = isThere(penguin.position.x / 100);
            if (state == 1)//left on ice
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
    }
    //start rendering
    animate();

    function superPenguin(penguin) {
        penguin.scale.set(2.0, 2.0, 2.0);
    }

}