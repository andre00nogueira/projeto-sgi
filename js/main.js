// Criar uma cena...
var cena =  new THREE.Scene();
cena.background = new THREE.Color( 0xFFFFFF );
// Criar uma camara
var camara =  new THREE.PerspectiveCamera(70, 600/530, 0.1, 500);


var canvas = document.getElementById('myCanvas');
// preparar um renderer WebGL com um viewport 800x600 a adicioná-lo à pagina
var renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(600, 530); // tamanho do canvas (da área preta)
renderer.shadowMap.enabled = true


camara.position.x = 0;
camara.position.y = -5;
camara.position.z = -15;



// OrbitControls.js
var controlos = new THREE.OrbitControls(camara, renderer.domElement);

camara.lookAt(0,0,90);

// GLTFLoader (BLENDER PARA THREE.JS)
var carregador = new THREE.GLTFLoader();
carregador.load(
	'blender/mochila.glb', // Nome do ficheiro .gltf
	function(gltf){		// Adicionar o ficheiro à cena a ser renderizada
		cena.add(gltf.scene);
	}
);


// Adicionar pontos de luz
var luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(5, -5, -5);
cena.add(luzPonto1);


// Adicionar pontos de luz
var luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(-5, -5, 5);
cena.add(luzPonto1);

// Adicionar pontos de luz
var luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(1, 1, 1);
cena.add(luzPonto1);

// Adicionar pontos de luz
var luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(5, 5, 5);
cena.add(luzPonto1);

// Adicionar pontos de luz
var luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(-5, -5, -5);
cena.add(luzPonto1);


function animar(){ 
	requestAnimationFrame(animar);
	renderer.render(cena, camara);
} 
animar();