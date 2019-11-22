function drawShark(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset += 50 / 2 + 30;

    // 몸통 
    var Geometry = new THREE.CubeGeometry(190, 100, 68);
    var Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
    var mesh = new THREE.Mesh(Geometry, Material);
    mesh.position.set(0 + xOffset, 0 + yOffset, 26 + zOffset);
	group.add(mesh);
	
	// 머리 
	Geometry = new THREE.CubeGeometry(90, 100, 68);
	Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(70 + xOffset, 0 + yOffset, 26 + zOffset);
	group.add(mesh);

    // 몸통아래 
	Geometry = new THREE.CubeGeometry(170, 101, 42);
	Material = new THREE.MeshLambertMaterial({ color: 0x708090 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(-10 + xOffset, 0 + yOffset, -30 + zOffset);
	group.add(mesh);
	
    // 위 지느러미1
	Geometry = new THREE.CubeGeometry(70, 30, 20);
	Material = new THREE.MeshLambertMaterial({ color:0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(-5 + xOffset, 0 + yOffset, 80 + zOffset);
	group.add(mesh);
		
	// 위 지느러미2
	Geometry = new THREE.CubeGeometry(100, 30, 50);
	Material = new THREE.MeshLambertMaterial({ color:0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(10 + xOffset, 0 + yOffset, 50 + zOffset);
	group.add(mesh);

	// 눈
	Geometry = new THREE.CubeGeometry(10, 8, 14);
	Material = new THREE.MeshLambertMaterial({ color:0x000000 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(115 + xOffset, 27 + yOffset, 20 + zOffset);
	group.add(mesh);

	// 눈
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(115 + xOffset, -27 + yOffset, 20 + zOffset);
	group.add(mesh);

	// 입
	Geometry = new THREE.CubeGeometry(59, 80, 30);
	Material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(55 + xOffset, 0 + yOffset, -20 + zOffset);
	group.add(mesh);

	// 이빨
	Geometry = new THREE.CubeGeometry(60, 90, 8);
	Material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(84 + xOffset, 0 + yOffset, -12 + zOffset);
	group.add(mesh);

	// 이빨
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(84 + xOffset, 0 + yOffset, -28 + zOffset);
	group.add(mesh);

	// 턱 
	Geometry = new THREE.CubeGeometry(201, 101, 20);
	Material = new THREE.MeshLambertMaterial({ color: 0x708090 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(15 + xOffset, 0 + yOffset, -40 + zOffset);
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


	// 꼬리1
	Geometry = new THREE.CubeGeometry(30, 30, 30);
	Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(-110 + xOffset, 0 + yOffset, -10 + zOffset);
	group.add(mesh);

		
	// 꼬리2
	Geometry = new THREE.CubeGeometry(30, 100, 30);
	Material = new THREE.MeshLambertMaterial({ color: 0x003399 });
	mesh = new THREE.Mesh(Geometry, Material);
	mesh.position.set(-140 + xOffset, 0 + yOffset, -10 + zOffset);
	group.add(mesh);

	return group;
}