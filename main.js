// Important "global" variables
var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);



// Main function
var createScene = function () {
    
    // Make the scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 1, 0); // Background color
    
    // Set the camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene); //Initialiaze camera at (0,5,-20)
    camera.setTarget(BABYLON.Vector3.Zero()); // point at origin
    camera.attachControl(canvas, false);
    
    // Set the light
    var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -1, 0), scene);
    light.intensity = .5;
    
    
    // Physics
    scene.enablePhysics();
    scene.setGravity(new BABYLON.Vector3(0,-10,0));
    
    // Add the ground
    var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene);
    ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.75, restitution: .95 });
    ground.isPickable = true;
    
    
    // Add the sphere
    sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 5;
    sphere.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, restitution: 1});
    sphere.isPickable = true;
    
    
    // Add all the boxes
    
    var box1 = BABYLON.Mesh.CreateBox('box1',2,scene);
    box1.position.y = 1;
    box1.position.z = 10;
    box1.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1})
    box1.setPhysicsState = true;
    
    var box2 = BABYLON.Mesh.CreateBox('box2',2,scene);
    box2.position.y = 1;
    box2.position.z = 10;
    box2.position.x = 2.1;
    box2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1})
    box2.setPhysicsState = true;
    
    var box3 = BABYLON.Mesh.CreateBox('box3',2,scene);
    box3.position.y = 1;
    box3.position.z = 10;
    box3.position.x = -2.1;
    box3.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1})
    box3.setPhysicsState = true;
    
    
    var box4 = BABYLON.Mesh.CreateBox('box4',2,scene);
    box4.position.y = 3;
    box4.position.z = 10;
    box4.position.x = -1.05;
    box4.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1})
    box4.setPhysicsState = true;
    
    var box5 = BABYLON.Mesh.CreateBox('box5',2,scene);
    box5.position.y = 3;
    box5.position.z = 10;
    box5.position.x = 1.05;
    box5.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1})
    box5.setPhysicsState = true;
    
    var box6 = BABYLON.Mesh.CreateBox('box6',2,scene);
    box6.position.y = 5;
    box6.position.z = 10;
    box6.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1})
    box6.setPhysicsState = true;
    box6.isPickable = true;
    
    
    scene.onPointerDown = function (evt, pickResult) {
        console.log(pickResult.pickedMesh);
        if (pickResult.hit){
            console.log(pickResult.pickedMesh);
        } else {
            console.error("pickResult was not hit");
        }
            
    }
    
    return scene;
}


// Create the scene
var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});


canvas.addEventListener('click', function(evt) {
    console.log("onclick");
    var pickResult = scene.pick(evt.clientX, evt.clientY);
    var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
    if (pickResult.hit) {
    console.log(pickResult.pickedMesh);
    dir.normalize();
    pickResult.pickedMesh.applyImpulse(new BABYLON.Vector3(0, 0, 1000),
    pickResult.pickedPoint);
    }
});