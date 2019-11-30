function drawItem(xOffset, yOffset, zOffset) {
	var group = new THREE.Group();

	//box
	var itemGeometry = new THREE.CubeGeometry(90, 90, 90);//geometry
    var itemMaterial = new THREE.MeshLambertMaterial({ color: 0xFFE400 });//material, 16���� ��
    var item = new THREE.Mesh(itemGeometry, itemMaterial);//meshe
    item.position.set(200 + xOffset, 0 + yOffset, 50 + zOffset);
	group.add(item);
	
	//mark
	itemGeometry=new THREE.CubeGeometry(10,10,10);
	itemMaterial=new THREE.MeshLambertMaterial({color:0xFF0000})
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, -20 + yOffset, 57 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, -20 + yOffset, 67 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154+ xOffset, -20 + yOffset, 77 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, -10 + yOffset, 77 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 0 + yOffset, 77 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 10 + yOffset, 77 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 20 + yOffset, 77 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 20 + yOffset, 67 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 20 + yOffset, 57 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, -20 + yOffset, 47 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, -10 + yOffset, 47 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 0 + yOffset, 47 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 0 + yOffset, 37 + zOffset);
	group.add(item)
	item=new THREE.Mesh(itemGeometry,itemMaterial);
	item.position.set(154 + xOffset, 0 + yOffset, 22 + zOffset);
	group.add(item)

	return group
}