// Get the canvas element from our HTML below
var canvas = document.querySelector("#canvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built
var createScene = function () {
    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0, 1, 0);
    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount
    light.intensity = .5;

    // Add the physics
    scene.enablePhysics();
    scene.setGravity(new BABYLON.Vector3(0,-10,0));

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    // Move the sphere upward
    sphere.position.y = 5;
    sphere.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, restitution: 1});

    // Let's try our built-in 'ground' shape. Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: .95 });


    // The Box is initially centered at the origin
    // Parameters: id, width, scene
    var box1 = BABYLON.Mesh.CreateBox('box1',2,scene);
    box1.position.y = 1;
    var box2 = BABYLON.Mesh.CreateBox('box2',.1,scene);
    box2.position = new BABYLON.Vector3(1,1,1);
    var box3 = BABYLON.Mesh.CreateBox('box3',.1,scene);
    box3.position = new BABYLON.Vector3(-1,1,-1);


    // Leave this function
    return scene;
}; // End of createScene function
// -------------------------------------------------------------
// Now, call the createScene function that you just finished creating
var scene = createScene();


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});



canvas.addEventListener('click', function(evt) {
    var pickResult = scene.pick(evt.clientX, evt.clientY);
    var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
    dir.normalize();
    pickResult.pickedMesh.applyImpulse(dir.scale(10), pickResult.pickedPoint);
});
