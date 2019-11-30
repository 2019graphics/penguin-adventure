function drawWalrus(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset += 75 / 2 + 35;

    var headGeometry = new THREE.CubeGeometry(100, 100, 100);//geometry, ť�� ����
    var headMaterial = new THREE.MeshLambertMaterial({ color: 0x505050 });//material, 16���� ��
    var head = new THREE.Mesh(headGeometry, headMaterial);//meshe
    head.position.set(10 + xOffset, 0 + yOffset, 50 + zOffset);
    group.add(head);

    var eyeGeometry = new THREE.CubeGeometry(10, 20, 5);
    var eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(56 + xOffset, -25 + yOffset, 60 + zOffset);
    eye2.position.set(56 + xOffset, 25 + yOffset, 60 + zOffset);
    group.add(eye1);
    group.add(eye2);

    var noseGeometry = new THREE.CubeGeometry(5, 10, 10);//geometry, ť�� ����
    var noseMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });//material, 16���� ��
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

    var bodyGeometry = new THREE.CubeGeometry(140, 100, 75);//geometry, ť�� ����
    var bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x505050 });//material, 16���� ��
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);//meshe
    body.position.set(-40 + xOffset, 0 + yOffset, -35 + zOffset);
    group.add(body);

    var tailGeometry = new THREE.CubeGeometry(50, 80, 30);//geometry, ť�� ����
    var tailMaterial = new THREE.MeshLambertMaterial({ color: 0x505050 });//material, 16���� ��
    var tail = new THREE.Mesh(tailGeometry, tailMaterial);//meshe
    tail.position.set(-130 + xOffset, 0 + yOffset, -57 + zOffset);
    group.add(tail);

    var handGeometry = new THREE.CubeGeometry(60, 150, 25);//geometry, ť�� ����
    var handMaterial = new THREE.MeshLambertMaterial({ color: 0x505050 });//material, 16���� ��
    var hand = new THREE.Mesh(handGeometry, handMaterial);//meshe
    hand.position.set(-30 + xOffset, 0 + yOffset, -60 + zOffset);
    group.add(hand);

    var teethGeometry = new THREE.CubeGeometry(5, 5, 25);//geometry, ť�� ����
    var teethMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });//material, 16���� ��
    var teeth1 = new THREE.Mesh(teethGeometry, teethMaterial);//meshe
    teeth1.position.set(75 + xOffset, -15 + yOffset, 0 + zOffset);
    group.add(teeth1);
    var teeth2 = new THREE.Mesh(teethGeometry, teethMaterial);//meshe
    teeth2.position.set(75 + xOffset, 15 + yOffset, 0 + zOffset);
    group.add(teeth2);

    return group;
}