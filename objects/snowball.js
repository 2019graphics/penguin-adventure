<<<<<<< HEAD
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
	var geometry = new THREE.OctahedronGeometry(RADIUS, 4);   //Â¼Ã½Ã€ÃšÂ°Â¡ Ã„Â¿ÃÃºÂ¼Ã¶Â·Ã Â´Ãµ ÂµÂ¿Â±Ã—Â·Â¡ÃÃ¼
	const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
 
	var snowball = new THREE.Mesh(geometry, material)
	snowball.position.set(xOffset, yOffset, zOffset);
	group.add(snowball);
 
	return snowball
 }
=======
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
	var geometry = new THREE.OctahedronGeometry(RADIUS, 4);	//¼ýÀÚ°¡ Ä¿Áú¼ö·Ï ´õ µ¿±×·¡Áü
	const material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })

	var snowball = new THREE.Mesh(geometry, material)
	snowball.position.set(xOffset, yOffset, zOffset);
	group.add(snowball);

	return group
}
>>>>>>> 14607a680d083891ab9bcc9193e6263795961a83
