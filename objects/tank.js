
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
    var lastZPosition = 0, lastXPosition = 0;
    var lastRotation = 0;
    var zPositionAnimation = new BABYLON.Animation("tankzPositionAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var xPositionAnimation = new BABYLON.Animation("tankxPositionAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var zRotationAnimation = new BABYLON.Animation("tankzRotationAnimation", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);


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
            obj.position = new BABYLON.Vector3(0, height/4, 0);
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
    self.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1});

    // Define references to this object.
    window[id] = self;
    if (parent != undefined) {
	parent[id] = self;
    }

///////////////////////
// Private Functions //
///////////////////////

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

    self.moveZ = function(distance) {
      var keys = [];
      keys.push({
        frame: 0,
        value: lastZPosition
      });
      keys.push({
        frame: 30,
        value: lastZPosition + distance
      });
      lastZPosition = lastZPosition + distance;
      zPositionAnimation.setKeys(keys);
      self.animations.push(zPositionAnimation);
      scene.beginAnimation(self, 0, 30, true);
      self.animations = [];
    }

    self.moveX = function(distance) {
      var keys = [];
      keys.push({
        frame: 0,
        value: lastXPosition
      });
      keys.push({
        frame: 30,
        value: lastXPosition + distance
      });
      lastXPosition = lastXPosition + distance;
      xPositionAnimation.setKeys(keys);
      self.animations.push(xPositionAnimation);
      scene.beginAnimation(self, 0, 30, true);
      self.animations = [];
    }

    self.rotateZ = function(degrees) {
      self.rotate(BABYLON.Axis.Y, degrees, BABYLON.Space.LOCAL);
      //self.rotation.y += degrees;
      /*
      var keys = [];
      keys.push({
        frame: 0,
        value: lastRotation
      });
      keys.push({
        frame: 30,
        value: lastRotation + degrees
      });
      lastRotation = lastRotation + degrees;
      zRotationAnimation.setKeys(keys);
      self.animations.push(zRotationAnimation);
      scene.beginAnimation(self, 0, 30, true);
      */
    }

    return self;
}
