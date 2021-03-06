function drawSnowBall(xOffset, yOffset, zOffset) {
	var group = new THREE.Group();
 
	 var geometry = new THREE.Geometry();
	geometry.vertices.push(
	new THREE.Vector3( -10,  10, 0 ),
	new THREE.Vector3( -10, -10, 0 ),
	new THREE.Vector3(  10, -10, 0 ),
 );
 
	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
 
	var RADIUS = 10
 
	//snowball
	var geometry = new THREE.OctahedronGeometry(RADIUS, 4);
	const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
 
	var snowball = new THREE.Mesh(geometry, material)
	snowball.position.set(xOffset, yOffset, zOffset);
	group.add(snowball);
 
	return snowball
 }