var camera, scene, renderer;
var theta = 0;

//meshs
var icebergs, penguin, seal, bear, shark, snowballs,item;
var snowCount = 10;

var collidableMeshList = [];

//size
var maxX = 2000, maxY = 2000, maxZ = 1000;

init();

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
function collision(){
    firstBB=new THREE.Box3().setFromObject(penguin);

    for(index=0;index<collidableMeshList.length;index++){
        secondBB=new THREE.Box3().setFromObject(collidableMeshList[index]);
        var coll=firstBB.isIntersectionBox(secondBB);
        if(coll){
            collidableMeshList.splice(index,1);
            return 1;

        }

    }
    return 0;
}

//mesh remove
function remove(id) {
  scene.remove(scene.getObjectByName(id));
}

//mesh 장면에 추가
function meshAdd() {
    /*iceberg*/
    icebergs = [];
    iceLoc = randCom(20, 10);
    for (var i = 0; i < 10; i++) {
        var ice = drawIce(iceLoc[i]*100-50, 0, 0);
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

    //cloud
    var cloud1 = drawCloud(200, -1000, 390);
    scene.add(cloud1);
    var cloud2 = drawCloud(-400, 400, 400);
    scene.add(cloud2);
    var cloud3 = drawCloud(-900, 0, 410);
    scene.add(cloud3);
    var cloud4 = drawCloud(100, -700, 430);
    scene.add(cloud4);
    var cloud5 = drawCloud(50, 300, 420);
    scene.add(cloud5);

    //items
    item = drawItem(0, 0, 40);
    scene.add(item);
    collidableMeshList.push(item)

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

     //--배경
    
    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load('img/fadeaway_ft.jpg');
    var texture_bk = new THREE.TextureLoader().load('img/fadeaway_bk.jpg');
    var texture_up = new THREE.TextureLoader().load('img/fadeaway_up.jpg');
    var texture_dn = new THREE.TextureLoader().load('img/fadeaway_dn.jpg');
    var texture_rt = new THREE.TextureLoader().load('img/fadeaway_rt.jpg');
    var texture_lf = new THREE.TextureLoader().load('img/fadeaway_lf.jpg');
    
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
    skybox.position.set(1000, 50, 0);
    scene.add(skybox);



    //light
    //뒤쪽 조명
    var Light = new THREE.DirectionalLight(0xffffff,0.8);
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



    var waterObj = setWater();
    waterObj.position.set(1000, 50, -80);
    scene.add(waterObj);


    //움직임
    var animate = function () {
        setTimeout(
        requestAnimationFrame(animate),100);
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


        camera.position.set(2000, -2000, 1500);
        camera.position.y = Math.cos(theta)*2000;
        camera.position.x = Math.sin(theta)*2000;
        camera.lookAt(0, 0, 0);


        renderer.render(scene, camera);
        movePengForward();

        //충돌하면 return 1 그리고 list에서 해당 object 제외.

        if(collision()==1){
            bear.position.x=200;
        }

    }
    animate();
    function movePengForward() {
        //penguin move
        var pengx = (theta * 200) % maxX;
        penguin.position.x = pengx;
        pengx %= 100;
        var pengz = -1 * (pengx - 50) * (pengx - 50) + 2500;
        pengz /= 50;
        penguin.position.z = pengz;

        
    }

}
