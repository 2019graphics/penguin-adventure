function drawIce(xOffset, yOffset, zOffset) {
	var group = new THREE.Group();

    var geometry = new THREE.Geometry();
	geometry.vertices.push(
	new THREE.Vector3( -10,  10, 0 ),
	new THREE.Vector3( -10, -10, 0 ),
	new THREE.Vector3(  10, -10, 0 ),
);

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

	var RADIUS = 80
	var geometry1 = new THREE.OctahedronGeometry(RADIUS, 0);	//숫자가 커질수록 더 동그래짐
	var geometry2 = new THREE.OctahedronGeometry(RADIUS, 1);	//숫자가 커질수록 더 동그래짐

	const material = new THREE.MeshLambertMaterial({ color: 0xCCFFFF })
	/*
	//glacier
	var mesh0  = new THREE.Mesh(geometry1, material)
	mesh0.position.set(0 + xOffset, 0 + yOffset, 0 + zOffset);
	mesh0.rotation.set(0, 10, 0);
	group.add(mesh0);


	var mesh1  = new THREE.Mesh(geometry1, material)
	mesh1.position.set(0 + xOffset, 100 + yOffset, 0 + zOffset);
	mesh1.rotation.set(0, 10, 0);
	group.add(mesh1);

	var mesh2 = new THREE.Mesh(geometry1, material)
	mesh2.position.set(0 + xOffset, 200 + yOffset, 0 + zOffset);
	mesh2.rotation.set(30, 20, 40);
	group.add(mesh2);

	var mesh3 = new THREE.Mesh(geometry1, material)
	mesh3.position.set(0 + xOffset, -100 + yOffset, 0 + zOffset);
	mesh3.rotation.set(0, 0, 0);
	group.add(mesh3);

	var mesh4 = new THREE.Mesh(geometry1, material)
	mesh4.position.set(0 + xOffset, -200 + yOffset, 0 + zOffset);
	mesh4.rotation.set(0, 0, 0);
	group.add(mesh4);

	for (i=1;i<10;i++)
	{
		var mesh4 = new THREE.Mesh(geometry1, material)
		mesh4.position.set(0 + xOffset, -200 + yOffset+i*90, 0 + zOffset);
		mesh4.rotation.set(Math.random()*100, 0, 0);
		group.add(mesh4);
	}
*/

	
	// material texture
	var texture = new THREE.Texture( generateTexture() );
	texture.needsUpdate = true; // important!

	for (i=0;i<14;i++)
	{
		//iceCube
		var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);//geometry, 큐브 생성
		var cubeMaterial = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });//material, 16진수 색
		var body = new THREE.Mesh(cubeGeometry, cubeMaterial);//meshe
		body.position.set(0 + xOffset, 50*i*Math.pow(-1, i) + yOffset, 0 + zOffset);
		group.add(body);
	}

	return group
}

function generateTexture() {

	var size = 512;

	// create canvas
	canvas = document.createElement( 'canvas' );
	canvas.width = size;
	canvas.height = size;

	// get context
	var context = canvas.getContext( '2d' );

	// draw gradient
	context.rect( 0, 0, size, size );
	var gradient = context.createLinearGradient( 0, 0, size, size );
	gradient.addColorStop(0, '#99ddff'); // light blue 
	gradient.addColorStop(1, '#FFFFFF'); // white 
	gradient.addColorStop(1, '#CCFFFF'); // dark blue
	gradient.addColorStop(1, '#00FFFF');
	context.fillStyle = gradient;
	context.fill();

	return canvas;

}