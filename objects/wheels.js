
var Wheels = function(xml_node,parent) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    // Attributes possibly from xml
    var id;
    var radius = 1;
    var width = 1;
    var count = 1;
    var side = "left";

    if (n.hasAttribute('id')) {
	id = n.getAttribute('id');
    } else {
	id = getNewId();
    }

    if (n.hasAttribute('radius'))
	radius = n.getAttribute('radius');
    if (n.hasAttribute('width'))
	width = n.getAttribute('width');
    if (n.hasAttribute('count'))
	count = n.getAttribute('count');
    if (n.hasAttribute('side'))
	side = n.getAttribute('side');

    var self = BABYLON.Mesh.CreateBox(id,0,scene);
    self.isVisible = false;
//    var wheels = [];

    for(var i = 0; i < count; i++) {
	var wheel = BABYLON.Mesh.CreateCylinder("",width,radius*2, radius*2, 0, 0,scene, false, BABYLON.Mesh.DOUBLESIDE);
	wheel.rotation.y = Math.PI;
  	wheel.rotation.z = -Math.PI / 2;
	if (side=="left") {
	    wheel.position = new BABYLON.Vector3(-width/2,0,radius*2*i-radius*(count-1));
	} else if (side=="right") {
	    wheel.position = new BABYLON.Vector3(width/2,0,radius*2*i-radius*(count-1));
	}
	wheel.setPhysicsState({ imposter: BABYLON.PhysicsEngine.BoxImposter, mass:1, restitution: 0});
	wheel.parent = self;
//	wheels.push(wheel);
    }

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
	return "wheels";
    }

    self.remove = function() {
	self.dispose();
    }

    self.getId = function() {
	return self.parent.getId();
    }

    self.getRadius = function() {
	return radius;
    }

    self.getSide = function() {
	return side;
    }

    return self;
}
