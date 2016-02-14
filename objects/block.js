
var Block = function(xml_node,parent) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    var length = 1;
    var width = 1;
    var height = 1;
    var x = 0;
    var y = height/2;
    var z = 0;
    var id = "";

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
    if (n.hasAttribute('id'))
	id = n.getAttribute('id');

    var self = BABYLON.Mesh.CreateBox(id,1,scene);
    self.scaling.x = width;
    self.scaling.y = height;
    self.scaling.z = length;
    self.position = new BABYLON.Vector3(x,y,z);
/*
    var material = new BABYLON.StandardMaterial("",scene);
    material.diffuseColor = BABYLON.Color3(1,0,0);
    self.material = material;
*/
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
