function drawShark(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset += 50 / 2 + 30;

    // 몸통 
    var Geometry = new THREE.CubeGeometry(200, 100, 100);
    var Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
    var mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(0 + xOffset, 0 + yOffset, 10 + zOffset);
    group.add(mesh);

    // 몸통아래 
	Geometry = new THREE.CubeGeometry(201, 101, 50);
	Material = new THREE.MeshLambertMaterial({ color: 0x708090 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(0 + xOffset, 0 + yOffset, -30 + zOffset);
	group.add(mesh);
	
    // 위 지느러미
	Geometry = new THREE.CubeGeometry(100, 30, 100);
	Material = new THREE.MeshLambertMaterial({ color:0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(10 + xOffset, 0 + yOffset, 50 + zOffset);
	group.add(mesh);

	// 눈
	Geometry = new THREE.CubeGeometry(14, 14, 14);
	Material = new THREE.MeshLambertMaterial({ color:0x000000 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(100 + xOffset, 27 + yOffset, 20 + zOffset);
	group.add(mesh);

	// 눈
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(100 + xOffset, -27 + yOffset, 20 + zOffset);
	group.add(mesh);

	// 입
	Geometry = new THREE.CubeGeometry(59, 64, 30);
	Material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(83 + xOffset, 0 + yOffset, -30 + zOffset);
	group.add(mesh);

	// 이빨
	Geometry = new THREE.CubeGeometry(60, 65, 8);
	Material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(84 + xOffset, 0 + yOffset, -17 + zOffset);
	group.add(mesh);

	// 이빨
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(84 + xOffset, 0 + yOffset, -42 + zOffset);
	group.add(mesh);
   
    //오른쪽 지느러미 
	Geometry = new THREE.CubeGeometry(45, 45, 30);
	Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(15 + xOffset, 60 + yOffset, 0 + zOffset);
	group.add(mesh);

	 //왼쪽 지느러미 
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(15 + xOffset, -60 + yOffset, 0 + zOffset);
	group.add(mesh);


	// 꼬리
	Geometry = new THREE.CubeGeometry(30, 30, 30);
	Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(-120 + xOffset, 0 + yOffset, -10 + zOffset);
	group.add(mesh);

	return group;
}