// Important "global" variables
var canvas = document.querySelector("#canvas");
var engine = new BABYLON.Engine(canvas, true);

var OBJECTS = [];

// Main function
var createScene = function () {
    
    // Make the scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 1, 0); // Background color
    
    // The box creation
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, scene);
    skybox.isPickable = false;

    // The sky creation
    var skyMat = new BABYLON.StandardMaterial("skyMat", scene);
    skyMat.backFaceCulling = false;
    skyMat.diffuseColor = new BABYLON.Color3(0, 0, 1);
    skyMat.specularColor = new BABYLON.Color3(0, 1, 0);
    skyMat.reflectionTexture = new BABYLON.CubeTexture("assets/cubemap/cubemap", scene);
    skyMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

//    // box + sky = skybox !
    skybox.material = skyMat;
    
    // Set the camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene); //Initialiaze camera at (0,5,-20)
    camera.setTarget(BABYLON.Vector3.Zero()); // point at origin
    camera.attachControl(canvas, false);
    
    // Set the light
    var mainLight = new BABYLON.HemisphericLight("light_main", new BABYLON.Vector3(0, 1, 0), scene);
    mainLight.intensity = .75;
    mainLight.diffuse = new BABYLON.Color3(1,1,1);
    mainLight.specular = new BABYLON.Color3(1,1,1);
    mainLight.groundColor = new BABYLON.Color3(0,0,0);
    var light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(0, 1, 0), scene);
    light2.intensity = .25;
//        var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(1, 0, 0), scene);
//    light3.intensity = .25;
//        var light4 = new BABYLON.DirectionalLight("light4", new BABYLON.Vector3(0, 0, 1), scene);
//    light4.intensity = .25;
//        var light5 = new BABYLON.DirectionalLight("light5", new BABYLON.Vector3(0, 0, -1), scene);
//    light4.intensity = .25;
    
    
    // Set the shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator.getShadowMap().renderList.push();
    shadowGenerator.bias = .01;
    shadowGenerator.useVarianceShadowMap = true;
    
    // Physics
    scene.enablePhysics();
    scene.setGravity(new BABYLON.Vector3(0,-10,0));
    
    // Add the ground
    var ground = BABYLON.Mesh.CreateGround("ground1", 250, 250, 2, scene);
    ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.75, restitution: .95 });
    ground.isPickable = false;
    ground.receiveShadows = true;
// Ground texture
    var gMat = new BABYLON.StandardMaterial("gMat", scene);
    var gtexture = new BABYLON.Texture("assets/ground.jpg", scene);
    gtexture.uScale = 20;
    gtexture.vScale = 20;
    gMat.diffuseTexture = gtexture;    
    ground.material = gMat
    ground.isPickable = false;
    
    // Add all the boxes
    
    window.box1 = BABYLON.Mesh.CreateBox('box1',2,scene);
    box1.position.y = 1;
    box1.position.z = 10;
    box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2})
    box1.setPhysicsState = true;
    shadowGenerator.getShadowMap().renderList.push(box1);
//    OBJECTS.push(box1);
    
    window.box2 = BABYLON.Mesh.CreateBox('box2',2,scene);
    box2.position.y = 1;
    box2.position.z = 10;
    box2.position.x = 2.1;
    box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2})
    box2.setPhysicsState = true;
    shadowGenerator.getShadowMap().renderList.push(box2);
//    OBJECTS.push(box2);
    
    
    window.box3 = BABYLON.Mesh.CreateBox('box3',2,scene);
    box3.position.y = 1;
    box3.position.z = 10;
    box3.position.x = -2.1;
    box3.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2})
    box3.setPhysicsState = true;
    shadowGenerator.getShadowMap().renderList.push(box3);
//    OBJECTS.push(box3);
    
    
    window.box4 = BABYLON.Mesh.CreateBox('box4',2,scene);
    box4.position.y = 3;
    box4.position.z = 10;
    box4.position.x = -1.05;
    box4.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2})
    box4.setPhysicsState = true;
    shadowGenerator.getShadowMap().renderList.push(box4);
//    OBJECTS.push(box4);
    
    window.box5 = BABYLON.Mesh.CreateBox('box5',2,scene);
    box5.position.y = 3;
    box5.position.z = 10;
    box5.position.x = 1.05;
    box5.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2})
    box5.setPhysicsState = true;
    shadowGenerator.getShadowMap().renderList.push(box5);
//    OBJECTS.push(box5);
    
    window.box6 = BABYLON.Mesh.CreateBox('box6',2,scene);
    box6.position.y = 5;
    box6.position.z = 10;
    box6.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2})
    box6.setPhysicsState = true;
    shadowGenerator.getShadowMap().renderList.push(box6);
//    OBJECTS.push(box6);


    scene.onPointerPick = function (evt, pickResult) {
        // Get the picked id
        if (pickResult.hit) {
	    var name = pickResult.pickedMesh.id;
	    controller.promptText(controller.promptText()+name);
        }
        
        /*
        // Throw a ball
        var startPosn = scene.activeCamera.position;
        sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
//        console.log(sphere);
        sphere.position.y = startPosn.y ;
        sphere.position.x = startPosn.x;
        sphere.position.z = startPosn.z;
        sphere.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, restitution: 1});
//        sphere.isPickable = true;
        sphere.applyImpulse(new BABYLON.Vector3(0, 0, 100),
                            sphere.getAbsolutePosition());
        shadowGenerator.getShadowMap().renderList.push(sphere);
        
        // Add sphere to the list of objects
        OBJECTS.push(sphere);    */
    }

    
    return scene;
}


// Create the scene
var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
    
    //cleanObjects();
});

window.addEventListener("resize", function () {
    engine.resize();
});

function cleanObjects() {
    for (var n = 0; n < OBJECTS.length; n++) {
        if (OBJECTS[n].position.y < 2) {
            var obj = OBJECTS[n];
            console.log("Pre dispose");
            obj.setPhysicsState = false;
            obj.dispose();
            console.log("post dispose");
            OBJECTS.splice(n,1);
            n--;
        }
    }
}