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




var cor  = document.getElementById('cor');

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


cor.addEventListener('change', function() {
	var valor = cor.options[cor.selectedIndex].value; // Obter o valor/indice (value) selecionado...

	// Mudar a posição da camara consoante a escolha
	switch(valor){
		case '1': // Original
			color = new THREE.Color(0x302f2f);
			cena.getObjectByName('presilha').material.color.set(color);
			cena.getObjectByName('argola').material.color.set(color);
			break;

		case '2': // Branco
			color = new THREE.Color(0xebebeb);
			cena.getObjectByName('presilha').material.color.set(color);
			cena.getObjectByName('argola').material.color.set(color);
			break;

		case '3': // Azul
			color = new THREE.Color(0x277a91);
			cena.getObjectByName('presilha').material.color.set(color);
			cena.getObjectByName('argola').material.color.set(color);
			break;

		case '4': // Vermelho
			color = new THREE.Color(0xa8323e);
			cena.getObjectByName('presilha').material.color.set(color);
			cena.getObjectByName('argola').material.color.set(color);
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
	'blender/mochila_t.gltf', // Nome do ficheiro .gltf
	function(gltf){		// Adicionar o ficheiro à cena a ser renderizada
		cena.add(gltf.scene);

		// Animação
		// Encontra a animação pelo nome 'mochilaAction'
		clipe = THREE.AnimationClip.findByName(gltf.animations, 'KeyAction.001');

		// Adiciona a animação ao mixer
		acao = misturador.clipAction(clipe);

		// Para na última frame, não para na primeira
		acao.clampWhenFinished = true;

		// Repete apenas uma vez
		acao.setLoop(THREE.LoopOnce);

		var color = new THREE.Color(0x302f2f);
		cena.getObjectByName('presilha').material.color.set(color);
		cena.getObjectByName('argola').material.color.set(color);
	}
);

btnAbrir.addEventListener('click', function () {

	// Tempo positivo == Ação normal
	acao.timeScale = 1;
	// Começa animação e dá reset
	acao.play().reset();
});


btnFechar.addEventListener('click', function () {
	// Mantém a animação pausada
	acao.paused = false;
	// Tempo negativo == Ação Inversa
	acao.timeScale = -1;
	// Começa animação e dá reset
	acao.play().reset;
});



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
