import * as THREE from 'three';
import { SceneController } from './App/SceneController.js';
import { Scene } from './App/Scene.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class App
{
	constructor()
	{
		this.threeScene = new THREE.Scene();
		this.threeRenderer = new THREE.WebGLRenderer({ antialias: true });

		this.init()
	}

	init()
	{
		this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector('.container').appendChild(this.threeRenderer.domElement);


		////// SCENE 1 ////////
		const scene1 = new Scene(this.threeScene, this.threeRenderer);
		scene1.setSeasonImage('spring', 'sun', './img/ete_jour.jpg');
		scene1.setSeasonImage('spring', 'sunset', './img/ete_coucher_soleil.jpg');
		scene1.setSeasonImage('spring', 'night', './img/ete_nuit2.jpg');

		scene1.setSeasonImage('summer', 'sun', './img/ete_jour.jpg');
		scene1.setSeasonImage('summer', 'sunset', './img/ete_coucher_soleil.jpg');
		scene1.setSeasonImage('summer', 'night', './img/ete_nuit2.jpg');

		scene1.setSeasonImage('autumn', 'sun', './img/automne.jpg');
		scene1.setSeasonImage('autumn', 'sunset', './img/automne_coucher_soleil.jpg');
		scene1.setSeasonImage('autumn', 'night', './img/ete_nuit2.jpg');

		scene1.setSeasonImage('winter','sun', './img/hiver_jour.jpg');
		scene1.setSeasonImage('winter', 'sunset','./img/hiver_coucher_soleil.jpg');
		scene1.setSeasonImage('winter','night', './img/ete_nuit2.jpg');
		scene1.setCameraFov(100);
		scene1.sceneName = 'scene1';


	fetch(`https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.6&current=is_day,rain,weather_code,cloud_cover&hourly=rain,weather_code,is_day,sunshine_duration&daily=sunrise,sunset&forecast_days=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data);    

        // FUNCTION TO KNOW IF IT'S RAINY OR SUNNY
        function isRainy (data) {
            let rain;
            if (data["current"]["rain"] > 0) {
                rain = true;
            } else {
                rain = false;
            }
            return rain;
        }

		if (isRainy(data)) {
			scene1.enableRain(true);
		}
	})
		
		

		
		// AUDIO
		const sound1 = new THREE.PositionalAudio( scene1.audioListener );
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( './audio_expo/SCENE-001.mp3', function( buffer ) {
			sound1.setBuffer( buffer );
			sound1.setRefDistance( 20 );
		});

		const sphere = new THREE.SphereGeometry( 20, 32, 16 );
		const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
		const mesh1 = new THREE.Mesh( sphere, material );
		mesh1.position.set( -2, 0, -5);
		scene1.sceneGroup.add( mesh1 );
		mesh1.add( sound1 );

		document.addEventListener('threetouch', function() {
			sound1.play();
		});


		// LE BUSTE DE FEMME
		const loaderMere = new THREE.TextureLoader();
		const materialMere = new THREE.MeshLambertMaterial({
			map: loaderMere.load('./img/buste_mere.png'),
			transparent: true, 
		});
		const geometryMere = new THREE.PlaneGeometry(1, 1);
		const mere = new THREE.Mesh(geometryMere, materialMere);
		mere.position.set( -2, 0, -5);
		mere.scale.set( 3, 3, 3);
		scene1.sceneGroup.add(mere);


		////// SCENE 2 ////////
		const scene2 = new Scene(this.threeScene, this.threeRenderer);
		scene2.setSeasonImage('spring', 'sun', './img/market.jpg');
		scene2.setSeasonImage('spring', 'sunset', './img/market.jpg');
		scene2.setSeasonImage('spring', 'night', './img/market.jpg');

		scene2.setSeasonImage('summer', 'sun', './img/market.jpg');
		scene2.setSeasonImage('summer', 'sunset', './img/market.jpg');
		scene2.setSeasonImage('summer', 'night', './img/market.jpg');

		scene2.setSeasonImage('autumn', 'sun', './img/market.jpg');
		scene2.setSeasonImage('autumn', 'sunset', './img/market.jpg');
		scene2.setSeasonImage('autumn', 'night', './img/market.jpg');

		scene2.setSeasonImage('winter','sun', './img/market.jpg');
		scene2.setSeasonImage('winter', 'sunset','./img/market.jpg');
		scene2.setSeasonImage('winter','night', './img/market.jpg');

		scene2.sceneName = 'scene2';

		// SOUND SCENE 2
		const sound2 = new THREE.PositionalAudio( scene2.audioListener );
		const audioLoader2 = new THREE.AudioLoader();
		audioLoader.load( './audio_expo/SCENE-002.mp3', function( buffer ) {
			sound2.setBuffer( buffer );
			sound2.setRefDistance( 20 );
		});
		const sphere2 = new THREE.SphereGeometry( 20, 32, 16 );
		const material2 = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
		const mesh2 = new THREE.Mesh( sphere2, material2 );
		mesh2.position.set( 1, 0, -10);
		scene2.sceneGroup.add( mesh2 );
		mesh2.add( sound2 );

		document.addEventListener('scene2', function() {
			sound2.play();
		});

		// DIEU ENVOLE
		const loaderDieuEnvole = new THREE.TextureLoader();
		const materialDieuEnvole = new THREE.MeshLambertMaterial({
			map: loaderDieuEnvole.load('./img/dieu_envole.png'),
			transparent: true, 
		});
		const geometryDieuEnvole = new THREE.PlaneGeometry(5, 5);
		const dieuEnvole = new THREE.Mesh(geometryDieuEnvole, materialDieuEnvole);
		dieuEnvole.position.set( 0.5, 0, -10 );
		dieuEnvole.scale.set( 1.1, 1.1, 1.1);
		scene2.sceneGroup.add(dieuEnvole);

		// LA PETITE CHATELAINE
		const loaderChatelaine = new THREE.TextureLoader();
		const materialChatelaine = new THREE.MeshLambertMaterial({
			map: loaderChatelaine.load('./img/petite_chatelaine2.png'),
			transparent: true, 
		});
		const geometryChatelaine = new THREE.PlaneGeometry(1, 1);
		const chatelaine = new THREE.Mesh(geometryChatelaine, materialChatelaine);
		chatelaine.scale.set( 10, 10, 10);
		chatelaine.position.set( 25, 0, 0);
		chatelaine.rotation.set(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-90),
			THREE.MathUtils.degToRad(0)
		);
		scene2.sceneGroup.add(chatelaine);
		scene1.registerNextScene(scene2);
		

		////// SCENE 3 ////////
		const scene3 = new Scene(this.threeScene, this.threeRenderer);
		scene3.setSeasonImage('spring', 'sun', './img/studio2.jpg');
		scene3.setSeasonImage('spring', 'sunset', './img/studio2.jpg');
		scene3.setSeasonImage('spring', 'night', './img/studio2.jpg');

		scene3.setSeasonImage('summer', 'sun', './img/studio2.jpg');
		scene3.setSeasonImage('summer', 'sunset', './img/studio2.jpg');
		scene3.setSeasonImage('summer', 'night', './img/studio2.jpg');

		scene3.setSeasonImage('autumn', 'sun', './img/studio2.jpg');
		scene3.setSeasonImage('autumn', 'sunset', './img/studio2.jpg');
		scene3.setSeasonImage('autumn', 'night', './img/studio2.jpg');

		scene3.setSeasonImage('winter','sun', './img/studio2.jpg');
		scene3.setSeasonImage('winter', 'sunset','./img/studio2.jpg');
		scene3.setSeasonImage('winter','night', './img/studio2.jpg');
		
		scene3.sceneName = 'scene3';

		// SOUND SCENE 3
		const sound3 = new THREE.PositionalAudio( scene3.audioListener );
		const audioLoader3 = new THREE.AudioLoader();
		audioLoader3.load( './audio_expo/SCENE-003.mp3', function( buffer ) {
			sound3.setBuffer( buffer );
			sound3.setRefDistance( 20 );
		});
		const sphere3 = new THREE.SphereGeometry( 20, 32, 16 );
		const material3 = new THREE.MeshPhongMaterial( { color: 0xff2200, transparent: true, opacity: 0 } );
		const mesh3 = new THREE.Mesh( sphere3, material3 );
		mesh3.position.set( -15, -15, -10);
		scene3.sceneGroup.add( mesh3 );
		mesh3.add( sound3 );

		document.addEventListener('scene3', function() {
			sound3.play();
		});

		// GROUPE CADRE GAUCHE ET SCULPTURE RODIN
		const cadreRodin = new THREE.Group();

		// CHARGEMENT DU CADRE A GAUCHE
		const loaderCadreGauche = new GLTFLoader();
		loaderCadreGauche.load('./img/cadre.gltf', function (gltf) {
			const textureLoader = new THREE.TextureLoader();
			textureLoader.load('./img/or.jpg', function(texture) { 
				const content = gltf.scene;

				content.traverse( function ( child ) {
					if ( child.isMesh ) {
						if (!child.material.map){
						child.material.map = texture;
						child.material.map.needsUpdate = true;
						}
					}
				
				})
				
				// POSITION DU CADRE A GAUCHE
				content.position.set( -12, 3, -15 );
				content.scale.set( 4, 4, 4 );
				content.rotation.set(
					THREE.MathUtils.degToRad(-90),
					THREE.MathUtils.degToRad(-90),
					THREE.MathUtils.degToRad(180)
				);
				cadreRodin.add(content)
			})
		})

		// FEMME ACCROUPIE RODIN
		const loaderRodin = new THREE.TextureLoader();
		const materialRodin = new THREE.MeshLambertMaterial({
			map: loaderRodin.load('./img/femme_accroupie_rodin.png'),
			transparent: true, 
		});
		const geometryRodin = new THREE.PlaneGeometry(5, 5);
		const femmeAccroupieRodin = new THREE.Mesh(geometryRodin, materialRodin);
		femmeAccroupieRodin.position.set( -4, 1.8, -5 );
		femmeAccroupieRodin.scale.set( 0.26, 0.26, 0.26);
		cadreRodin.add(femmeAccroupieRodin);
		scene3.sceneGroup.add(cadreRodin);


		// GROUPE CADRE DROITE ET SCULPTURE CAMILLE
		const cadreCamille = new THREE.Group();

		// CHARGEMENT DU CADRE A DROITE
		const loaderCadreDroite = new GLTFLoader();
		loaderCadreDroite.load('./img/cadre.gltf', function (gltf) {
			const textureLoader = new THREE.TextureLoader();
			textureLoader.load('./img/or.jpg', function(texture) { 
				const content = gltf.scene;

				content.traverse( function ( child ) {
					if ( child.isMesh ) {
						if (!child.material.map){
						child.material.map = texture;
						child.material.map.needsUpdate = true;
						}
					}
				
				})

				// POSITION DU CADRE A DROITE
				content.position.set( 0, 3, -15 );
				content.scale.set( 4, 4, 4 );
				content.rotation.set(
					THREE.MathUtils.degToRad(-95),
					THREE.MathUtils.degToRad(-90),
					THREE.MathUtils.degToRad(180)
				);

				cadreCamille.add(content);
			})
		})

		// FEMME ACCROUPIE CAMILLE
		const loaderCamille = new THREE.TextureLoader();
		const materialCamille = new THREE.MeshLambertMaterial({
			map: loaderCamille.load('./img/femme_accroupie_camille.png'),
			transparent: true, 
		});
		const geometryCamille = new THREE.PlaneGeometry(5, 5);
		const femmeAccroupieCamille = new THREE.Mesh(geometryCamille, materialCamille);
		femmeAccroupieCamille.position.set( 0, 1.7, -5 );
		femmeAccroupieCamille.scale.set( 0.26, 0.26, 0.26);
		cadreCamille.add(femmeAccroupieCamille);
		scene3.sceneGroup.add(cadreCamille);

		// CHARGEMENT DE L'AGE MUR
		const loader = new STLLoader();
		loader.load( './img/age-mur.stl', function ( geometry ) {

			const material = new THREE.MeshPhongMaterial( { color: 0x33302A, specular: 0x494949, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );

			mesh.position.set( -15, -15, -10 );
			// mesh.position.set( -70, -50, -10 );
			mesh.rotation.set(
				THREE.MathUtils.degToRad(-90),
				THREE.MathUtils.degToRad(0),
				THREE.MathUtils.degToRad(180)
			);
			mesh.scale.set( 0.15, 0.15, 0.15 );
			// mesh.castShadow = true;
			// mesh.receiveShadow = true;

			scene3.sceneGroup.add( mesh );
		} );

		//// LUMIERES
		// LUMIERE DU SOLEIL 1
		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 7); // Couleur, Intensité
		directionalLight1.position.set(5, 1, 0); // Direction de la lumière
		scene3.sceneGroup.add(directionalLight1);

		// LUMIERE DU SOLEIL 2
		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2); // Couleur, Intensité
		directionalLight1.position.set(5, 1, 3); // Direction de la lumière
		scene3.sceneGroup.add(directionalLight2);
		scene2.registerNextScene(scene3);

		////// SCENE 4 ////////
		const scene4 = new Scene(this.threeScene, this.threeRenderer);
		scene4.setSeasonImage('spring', 'sun', './img/abandon_hall.jpg');
		scene4.setSeasonImage('spring', 'sunset', './img/abandon_hall.jpg');
		scene4.setSeasonImage('spring', 'night', './img/abandon_hall.jpg');

		scene4.setSeasonImage('summer', 'sun', './img/abandon_hall.jpg');
		scene4.setSeasonImage('summer', 'sunset', './img/abandon_hall.jpg');
		scene4.setSeasonImage('summer', 'night', './img/abandon_hall.jpg');

		scene4.setSeasonImage('autumn', 'sun', './img/abandon_hall.jpg');
		scene4.setSeasonImage('autumn', 'sunset', './img/abandon_hall.jpg');
		scene4.setSeasonImage('autumn', 'night', './img/abandon_hall.jpg');

		scene4.setSeasonImage('winter','sun', './img/abandon_hall.jpg');
		scene4.setSeasonImage('winter', 'sunset','./img/abandon_hall.jpg');
		scene4.setSeasonImage('winter','night', './img/abandon_hall.jpg');

		scene4.sceneName = 'scene4';

		// SOUND SCENE 4
		const sound4 = new THREE.PositionalAudio( scene1.audioListener );
		const audioLoader4 = new THREE.AudioLoader();
		audioLoader4.load( './audio_expo/SCENE-004.mp3', function( buffer ) {
			sound4.setBuffer( buffer );
			sound4.setRefDistance( 20 );
		});
		const sphere4 = new THREE.SphereGeometry( 20, 32, 16 );
		const material4 = new THREE.MeshPhongMaterial( { color: 0xff2200, transparent: true, opacity: 0 } );
		const mesh4 = new THREE.Mesh( sphere4, material4 );
		mesh4.position.set( -45, -10, -40);
		scene4.sceneGroup.add( mesh4 );
		mesh4.add( sound4 );
	
		document.addEventListener('scene4', function() {
			sound4.play();
		});

		// CHARGEMENT DE LA VALSE
		const loaderValse = new GLTFLoader();
		loaderValse.load('./img/valse/scene.gltf', function (gltf) {
			const content = gltf.scene;
			
			content.position.set( -45, -10, -40 );
			content.scale.set( 0.08, 0.08, 0.08 );
			content.rotation.set(
				THREE.MathUtils.degToRad(0),
				THREE.MathUtils.degToRad(45),
				THREE.MathUtils.degToRad(0)
			);

			scene4.sceneGroup.add(content)
		})

		// TETE ECLATEE
		const loaderTete = new THREE.TextureLoader();
		const materialTete = new THREE.MeshLambertMaterial({
			map: loaderTete.load('./img/tete_cassee.png'),
			transparent: true, 
		});
		const geometryTete = new THREE.PlaneGeometry(1, 1);
		const tete = new THREE.Mesh(geometryTete, materialTete);
		tete.position.set(4, -2, 0.5);
		tete.scale.set( 1, 1, 1);
		tete.rotation.set(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-90),
			THREE.MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(tete);

		// TETE ECLATEE 2
		const loaderTete2 = new THREE.TextureLoader();
		const materialTete2 = new THREE.MeshLambertMaterial({
			map: loaderTete2.load('./img/tete_cassee2.png'),
			transparent: true, 
		});
		const geometryTete2 = new THREE.PlaneGeometry(1, 1);
		const tete2 = new THREE.Mesh(geometryTete2, materialTete2);
		tete2.position.set(2, -2, 4);
		tete2.scale.set( 1, 1, 1);
		tete2.rotation.set(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-90),
			THREE.MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(tete2);

		// CORPS ECLATE  1
		const loaderBrise1 = new THREE.TextureLoader();
		const materialBrsie1 = new THREE.MeshLambertMaterial({
			map: loaderBrise1.load('./img/bout_brise.png'),
			transparent: true, 
		});
		const geometryBrise1 = new THREE.PlaneGeometry(1, 1);
		const brise1 = new THREE.Mesh(geometryBrise1, materialBrsie1);
		brise1.position.set(3, -1.5, 4);
		brise1.scale.set( 2.5, 2.5, 2.5);
		brise1.rotation.set(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-90),
			THREE.MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(brise1);

		// BOUT ECLATE  2
		const loaderBrise2 = new THREE.TextureLoader();
		const materialBrsie2 = new THREE.MeshLambertMaterial({
			map: loaderBrise2.load('./img/bout_brise2.png'),
			transparent: true, 
		});
		const geometryBrise2 = new THREE.PlaneGeometry(1, 1);
		const brise2 = new THREE.Mesh(geometryBrise2, materialBrsie2);
		brise2.position.set(6, -1.5, 2);
		brise2.scale.set( 0.5, 0.5, 0.5);
		brise2.rotation.set(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-90),
			THREE.MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(brise2);

		scene3.registerNextScene(scene4);

		// AXE D'AIDE
		// const axesHelper = new THREE.AxesHelper( 5 );
		// scene4.sceneGroup.add( axesHelper );
		// const size = 100;
		// const divisions = 20;
		// const gridHelper = new THREE.GridHelper( size, divisions );
		// gridHelper.position.set( 0, -5, 0 );
		// scene4.sceneGroup.add( gridHelper );

		const sceneController = new SceneController(this.threeScene);
		sceneController.play(scene1);

		// // GERER LE STEP SOUND
		// let currentSound = sound1;
		// let currentSceneIndex = 1;

		// function switchScene(sceneIndex) {
		// 	if (currentSound) {
		// 		currentSound.stop();
		// 	}
		// 	switch (sceneIndex) {
		// 		case 2:
		// 			currentSound = sound2;
		// 			break;
		// 		case 3:
		// 			currentSound = sound3;
		// 			break;
		// 		case 4:
		// 			currentSound = sound4;
		// 			break;
		// 		default:
		// 			currentSound = null;
		// 			break;
		// 	}

		// 	if (currentSound) {
		// 		currentSound.play();
		// 	}
		// }



		document.querySelector('button.next').addEventListener('click', () => {
			sceneController.playNext();
			// currentSceneIndex++;
    		// switchScene(currentSceneIndex);
		});

	}
			

}

const app = new App();