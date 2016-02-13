
var Wheels = function(xml_node,parent) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    var radius = 1;
    var width = 1;
    var count = 0;
    var side = "";
    var id = "";

    if (n.hasAttribute('radius'))
	radius = n.getAttribute('radius');
    if (n.hasAttribute('width'))
	width = n.getAttribute('width');
    if (n.hasAttribute('count'))
	count = n.getAttribute('count');
    if (n.hasAttribute('side'))
	side = n.getAttribute('side');
    if (n.hasAttribute('id'))
  id = n.getAttribute('id');

    var self = BABYLON.Mesh.CreateCylinder(id,width,radius*2, radius*2, 0, 0,scene, false, BABYLON.Mesh.FRONTSIDE);

    //self.position = new BABYLON.Vector3(x,y,z);
    //var material = new BABYLON.StandardMaterial("",scene);
    //material.diffuseColor = BABYLON.Color3(1,0,0);
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
	return "Wheels";
    }

    return self;
}
