function drawPeng(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset += 100;

    var Geometry = new THREE.CubeGeometry(100, 100, 180);//geometry, 큐브 생성
    var Material = new THREE.MeshLambertMaterial({ color: 0x102854 });//material, 16진수 색
    var mesh = new THREE.Mesh(Geometry, Material);//meshe
    mesh.position.set(0 + xOffset, 0 + yOffset, 10 + zOffset);
    group.add(mesh);

    //얼굴
    Geometry = new THREE.CubeGeometry(80, 80, 80);
    Material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(11 + xOffset, 0 + yOffset, 50 + zOffset);
    group.add(mesh);

    //발
    Geometry = new THREE.CubeGeometry(50, 30, 20);
    Material = new THREE.MeshLambertMaterial({ color: 0xffe966 });
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(0 + xOffset, 25 + yOffset, -90 + zOffset);
    group.add(mesh);
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(0 + xOffset, -25 + yOffset, -90 + zOffset);
    group.add(mesh);

    //입
    Geometry = new THREE.CubeGeometry(20, 40, 20);
    Material = new THREE.MeshLambertMaterial({ color: 0xffe966 });
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(50 + xOffset, 0 + yOffset, 40 + zOffset);
    group.add(mesh);

    //입 라인
    Geometry = new THREE.CubeGeometry(10, 40, 1);
    Material = new THREE.MeshLambertMaterial({ color: 0x000000 });
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(55 + xOffset, 0 + yOffset, 39 + zOffset);
    group.add(mesh);

    //눈
    Geometry = new THREE.CubeGeometry(10, 10, 10);
    Material = new THREE.MeshLambertMaterial({ color: 0x000000 });
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(47 + xOffset, 15 + yOffset, 60 + zOffset);
    group.add(mesh);
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(47 + xOffset, -15 + yOffset, 60 + zOffset);
    group.add(mesh);

    //날개
    Geometry = new THREE.CubeGeometry(40, 40, 40);
    Material = new THREE.MeshLambertMaterial({ color: 0x003060 });
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(0 + xOffset, 40 + yOffset, 0 + zOffset);
    group.add(mesh);
    mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(0 + xOffset, -40 + yOffset, 0 + zOffset);
    group.add(mesh);
    
    return group;
}