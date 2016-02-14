
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

    if (n.hasAttribute('id')) {
	id = n.getAttribute('id');
    } else {
	id = getNewId();
    }

    if (n.hasAttribute('length'))
	size = n.getAttribute('length');
    if (n.hasAttribute('width'))
	size = n.getAttribute('width');
    if (n.hasAttribute('height'))
	size = n.getAttribute('height');
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
    wheels.isVisible = false;
    var maxWheelRadius = 0;
    for (var i=0; i<n.children.length; i++) {
	var obj = createObjectForXmlNode(n.children[i]);
	if (obj.getType()=="wheels") {
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
//    self.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 0});

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

    return self;
}
