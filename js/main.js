// Criar uma cena...
var cena =  new THREE.Scene();


cena.background = new THREE.Color(0xFFFFFF); // Alterar o fundo da cena para BRANCO

// Criar uma camara
var camara =  new THREE.PerspectiveCamera(70, 530/530, 0.1, 500);


var canvas = document.getElementById('myCanvas'); // Canvas adicionado no HTML

// preparar um renderer WebGL e adicioná-lo à pagina
var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(530, 530); // tamanho do canvas
renderer.shadowMap.enabled = true;
renderer.gammaOutput= true; // Clarear o objecto
renderer.setPixelRatio(window.devicePixelRatio); // Previnir o canvas ofuscado nas máquinas com High Pixel Density


// Posição inicial da camera (vista frontal)
camara.position.x = 0;
camara.position.y = -5;
camara.position.z = -10;


/* Declarar objetos do HTML */

var btnAbrir = document.getElementById('btnAbrir');
var btnFechar = document.getElementById('btnFechar');





var visualizar = document.getElementById('posicoes');

visualizar.addEventListener('change', function() {
	var valor = visualizar.options[visualizar.selectedIndex].value; // Obter o valor/indice (value) selecionado...

	// Mudar a posição da camara consoante a escolha
	switch(valor){
		case '1': // Vista frontal
			camara.position.x = 0;
			camara.position.y = -5;
			camara.position.z = -10;
			break;

		case '2': // Vista traseira
			camara.position.x = 0;
			camara.position.y = -5;
			camara.position.z = 10;
			break;

		case '3': // Vista de cima
			camara.position.x = 0;
			camara.position.y = 5;
			camara.position.z = 0;
			break;

		case '4': // Vista de baixo
			camara.position.x = 0;
			camara.position.y = -15;
			camara.position.z = 0;
			break;

		case '5': // Vista lado esquerdo
			camara.position.x = 15;
			camara.position.y = 0;
			camara.position.z = 0;
			break;

		case '6': // Vista lado direito
			camara.position.x = -15;
			camara.position.y = 0;
			camara.position.z = 0;
			break;
	}
});


var relogio = new THREE.Clock();
var misturador = new THREE.AnimationMixer(cena);


// OrbitControls.js
var controlos = new THREE.OrbitControls(camara, renderer.domElement);


// GLTFLoader (BLENDER PARA THREE.JS)
var carregador = new THREE.GLTFLoader();
carregador.load(
	'blender/mochila.gltf', // Nome do ficheiro .gltf
	function(gltf){		// Adicionar o ficheiro à cena a ser renderizada
		cena.add(gltf.scene);

		btnAbrir.addEventListener('click', function () {
			clipe = THREE.AnimationClip.findByName( gltf.animations, 'KeyAction' );
			acao = misturador.clipAction( clipe );
			acao.play();
			alert('Mochila Aberta');
		});


		btnFechar.addEventListener('click', function () {
			clipe = THREE.AnimationClip.findByName( gltf.animations, 'KeyAction' );
			acao = misturador.clipAction( clipe );
			acao.play();
			alert('Mochila Fechada');
		});

	}
);


// Adicionar pontos de luz
var luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(5, -5, -5);
cena.add(luzPonto1);


// Adicionar pontos de luz
luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(-5, -5, 5);
cena.add(luzPonto1);

// Adicionar pontos de luz
luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(1, 1, 1);
cena.add(luzPonto1);

// Adicionar pontos de luz
luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(5, 5, 5);
cena.add(luzPonto1);

// Adicionar pontos de luz
luzPonto1 = new THREE.PointLight("white");
luzPonto1.position.set(-5, -5, -5);
cena.add(luzPonto1);


function animar(){ 
    camara.lookAt(0, -4, 1);
	requestAnimationFrame(animar);
	renderer.render(cena, camara);
	misturador.update(relogio.getDelta())
} 
animar();
