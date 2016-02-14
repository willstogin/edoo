
var Tank = function(xml_node,parent) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    // Attributes possibly from xml
    var id;
    var length = 3;
    var width = 2;
    var height = 1;
    var x = 0;
    var y = height/2;
    var z = 0;
    // Attributes not accessible by xml
    var angle = 0;
    var rotationQuaternion;

    if (n.hasAttribute('id')) {
	id = n.getAttribute('id');
    } else {
	id = getNewId();
    }

    if (n.hasAttribute('length'))
	length = n.getAttribute('length');
    if (n.hasAttribute('width'))
	width = n.getAttribute('width');
    if (n.hasAttribute('height'))
	height = n.getAttribute('height');
    if (n.hasAttribute('x'))
	x = n.getAttribute('x');
    if (n.hasAttribute('y'))
	y = n.getAttribute('y');
    if (n.hasAttribute('z'))
	z = n.getAttribute('z');

    var self = BABYLON.Mesh.CreateBox(id,1,scene);
    self.scaling.x = width;
    self.scaling.y = height;
    self.scaling.z = length;

    var wheels = BABYLON.Mesh.CreateBox(id+"_wheels",0,scene);
    wheels.scaling.x = 1/width;
    wheels.scaling.y = 1/height;
    wheels.scaling.z = 1/length;
    wheels.isVisible = false;

    var maxWheelRadius = 0;
    for (var i=0; i<n.children.length; i++) {
	var obj = createObjectForXmlNode(n.children[i]);
        if (obj.getType() == "turret") {
            obj.position = new BABYLON.Vector3(0, 1/2, 0);
            obj.scaling.x = 1/width;
            obj.scaling.y = 1/height;
            obj.scaling.z = 1/length;
            obj.parent = self;
        } else if (obj.getType()=="wheels") {
	    if (obj.getSide()=="left") {
		obj.position = new BABYLON.Vector3(-width/2,0,0);
	    } else {
		obj.position = new BABYLON.Vector3(width/2,0,0);
	    }
	    if (obj.getRadius() > maxWheelRadius)
		maxWheelRadius = obj.getRadius();
	    obj.parent = wheels;
	}
	// TODO other children?
    }
    wheels.parent = self;

    y = maxWheelRadius;
    self.position = new BABYLON.Vector3(x,y,z);
    var position = self.position.clone();
    rotationQuaternion = BABYLON.Quaternion.Identity();

    self.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 0});
    self.showBoundingBox = true;


    // Define references to this object.
    window[id] = self;
    if (parent != undefined) {
	parent[id] = self;
    }

///////////////////////
// Private Functions //
///////////////////////

var animationQueue = [];
var animating = false;

function enqueueAnimation(animation) {
    if (animating) {
      animationQueue.push(animation);
    } else {
      runAnimation(animation);
    }
}

function doNextAnimation() {
    if(animationQueue.length > 0) {
        var animation = animationQueue.shift();
        runAnimation(animation);
    } else {
      animating = false;
    }
}

function runAnimation(animation) {
  animating = true;
  self.animations.push(animation);
  scene.beginAnimation(self, 0, 30, false, 1, doNextAnimation);
  self.animations = [];
}

//////////////////////
// Public Functions //
//////////////////////

    self.getType = function() {
	return "tank";
    }

    self.remove = function() {
	self.dispose();
    }

    self.getId = function() {
	return id;
    }

    self.stop = function(){
      animationQueue = [];
    }

    self.move = function(dist) {
      var animation = new BABYLON.Animation("mov", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      var keys = [];
      keys.push({
        frame: 0,
        value: position.clone()
      });
      keys.push({
        frame: 30,
        value: position.add(new BABYLON.Vector3(dist*Math.sin(angle),0,dist*Math.cos(angle)))
      });

      position.addInPlace(new BABYLON.Vector3(dist*Math.sin(angle),0,dist*Math.cos(angle)));

      animation.setKeys(keys);
      enqueueAnimation(animation);
    }

    self.rotate = function(degrees) {
      var radians = degrees * Math.PI/180;
      angle += radians;
      var deltaRotationQuaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, radians);
      var end = rotationQuaternion.multiply(deltaRotationQuaternion);

      var start = rotationQuaternion;
      rotationQuaternion = end.clone();

      // Create the Animation object
      var animateEnding = new BABYLON.Animation(
          "moveY",
          "rotationQuaternion",
          30,
          BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
          BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

      // Animations keys
      var keys = [];
      keys.push({
          frame: 0,
          value: start
      },{
          frame: 30,
          value: end
      });

      // Add these keys to the animation
      animateEnding.setKeys(keys);

      // Link the animation to the mesh
      //self.animations.push(animateEnding);
      enqueueAnimation(animateEnding);
      // Run the animation !
      //var begin = scene.beginAnimation(self, 0, 30, false, 1);
      //self.animations = [];
      //self.rotate(BABYLON.Axis.Y, degrees, BABYLON.Space.LOCAL);
    }

    return self;
}
