function drawSeal(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset += 75 / 2 + 35;

    var headGeometry = new THREE.CubeGeometry(100, 100, 100);//geometry, 큐브 생성
    var headMaterial = new THREE.MeshLambertMaterial({ color: 0xD0CECE });//material, 16진수 색
    var head = new THREE.Mesh(headGeometry, headMaterial);//meshe
    head.position.set(10 + xOffset, 0 + yOffset, 50 + zOffset);
    group.add(head);

    var eyeGeometry = new THREE.CubeGeometry(10, 8, 15);
    var eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(56 + xOffset, -25 + yOffset, 60 + zOffset);
    eye2.position.set(56 + xOffset, 25 + yOffset, 60 + zOffset);
    group.add(eye1);
    group.add(eye2);

    var noseGeometry = new THREE.CubeGeometry(5, 10, 10);//geometry, 큐브 생성
    var noseMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });//material, 16진수 색
    var nose = new THREE.Mesh(noseGeometry, noseMaterial);//meshe
    nose.position.set(78 + xOffset, 0 + yOffset, 36 + zOffset);
    group.add(nose);

    var mouseGeometry = new THREE.CubeGeometry(40, 40, 40);
    var mouseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(60 + xOffset, 0 + yOffset, 20 + zOffset);
    group.add(mouse);

    var lineGeometry = new THREE.CubeGeometry(40, 1, 38);
    var lineMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(60 + xOffset, 0 + yOffset, 20 + zOffset);
    group.add(line);

    var bodyGeometry = new THREE.CubeGeometry(140, 100, 75);//geometry, 큐브 생성
    var bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xD0CECE });//material, 16진수 색
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);//meshe
    body.position.set(-40 + xOffset, 0 + yOffset, -35 + zOffset);
    group.add(body);

    var tailGeometry = new THREE.CubeGeometry(50, 80, 30);//geometry, 큐브 생성
    var tailMaterial = new THREE.MeshLambertMaterial({ color: 0xD0CECE });//material, 16진수 색
    var tail = new THREE.Mesh(tailGeometry, tailMaterial);//meshe
    tail.position.set(-130 + xOffset, 0 + yOffset, -57 + zOffset);
    group.add(tail);

    var handGeometry = new THREE.CubeGeometry(60, 180, 25);//geometry, 큐브 생성
    var handMaterial = new THREE.MeshLambertMaterial({ color: 0xD0CECE });//material, 16진수 색
    var hand = new THREE.Mesh(handGeometry, handMaterial);//meshe
    hand.position.set(-30 + xOffset, 0 + yOffset, -60 + zOffset);
    group.add(hand);

    return group;
}