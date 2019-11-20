function drawBear(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset += 100;

	//����
    var cubeGeometry = new THREE.CubeGeometry(100, 100, 200);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });//material, 16���� ��
	var body = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	body.position.set(0 + xOffset, 0 + yOffset, 0 + zOffset);
	group.add(body);

	//��1
    var cubeGeometry = new THREE.CubeGeometry(20, 20, 20);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });//material, 16���� ��
	var ear1 = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	ear1.position.set(-5 + xOffset, 35 + yOffset, 110 + zOffset);
	group.add(ear1);

    //��2
	var ear2 = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	ear2.position.set(-5 + xOffset, -35 + yOffset, 110 + zOffset);
	group.add(ear2);

	//��1
    var cubeGeometry = new THREE.CubeGeometry(5, 10, 10);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });//material, 16���� ��
	var eye1 = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	eye1.position.set(50 + xOffset, 30 + yOffset, 80 + zOffset);
	group.add(eye1);

	//��2
	var eye2 = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	eye2.position.set(50 + xOffset, -30 + yOffset, 80 + zOffset);
	group.add(eye2);

	//����
    var cubeGeometry = new THREE.CubeGeometry(40, 60, 60);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });//material, 16���� ��
	var faceNose = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	faceNose.position.set(65 + xOffset, 0 + yOffset, 30 + zOffset);
	group.add(faceNose);

	//��
    var cubeGeometry = new THREE.CubeGeometry(5, 10, 10);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });//material, 16���� ��
	var nose = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	nose.position.set(85 + xOffset, 0 + yOffset, 30 + zOffset);
	group.add(nose);

	//����
    var cubeGeometry = new THREE.CubeGeometry(30, 30, 30);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });//material, 16���� ��
	var tail = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	tail.position.set(-60 + xOffset, 0 + yOffset, -50 + zOffset);
	group.add(tail);

	//��1
    var cubeGeometry = new THREE.CubeGeometry(50, 20, 70);//geometry, ť�� ����
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });//material, 16���� ��
	var arm1 = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	arm1.position.set(0 + xOffset, -60 + yOffset, -20 + zOffset);
	group.add(arm1);

	//��2
	var arm2 = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
	arm2.position.set(0 + xOffset, 60 + yOffset, -20 + zOffset);
	group.add(arm2);

	return group;
}