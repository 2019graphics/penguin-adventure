function drawIce(xOffset, yOffset, zOffset) {
    var group = new THREE.Group();
    zOffset -= 100;

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
	new THREE.Vector3(-10, 10, 0),
	new THREE.Vector3(-10, -10, 0),
	new THREE.Vector3(10, -10, 0));

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

	var RADIUS = 80
	var geometry1 = new THREE.OctahedronGeometry(RADIUS, 0);	//���ڰ� Ŀ������ �� ���׷���
	var geometry2 = new THREE.OctahedronGeometry(RADIUS, 1);	//���ڰ� Ŀ������ �� ���׷���

	const material = new THREE.MeshLambertMaterial({ color: 0xCCFFFF })
	
	// material texture
	var texture = new THREE.Texture( generateTexture() );
	texture.needsUpdate = true; // important!

	for (i=0;i<20;i++)
	{
		//iceCube
		var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);//geometry, ť�� ����
		var cubeMaterial = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });//material, 16���� ��
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