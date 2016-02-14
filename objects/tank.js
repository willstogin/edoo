
var Tank = function(xml_node,parent) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    // Attributes possibly from xml
    var length = 1.5;
    var width = 1;
    var height = 0.5;
    var x = 0;
    var y = height/2;
    var z = 0;
    var id = "";

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
    self.scaling.x = length;
    self.scaling.y = width;
    self.scaling.z = height;
    self.position = new BABYLON.Vector3(x,y,z);
    var material = new BABYLON.StandardMaterial("",scene);
    material.diffuseColor = BABYLON.Color3(1,0,0);
//    self.material = material;
    self.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: 1});

    // Define references to this object.
    if (id != "") {
	if (parent == undefined) {
	    window[id] = self;
	} else {
	    parent[id] = self;
	}
    }
    
///////////////////////
// Private Functions //
///////////////////////

//////////////////////
// Public Functions //
//////////////////////

    self.getType = function() {
	return "block";
    }
    
    self.remove = function() {
	self.dispose();
    }

    return self;
}
