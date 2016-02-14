
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
    
    var turret = BABYLON.Mesh.CreateBox(id+"_turret",0, scene);
    turret.scaling.x = 1/width;
    turret.scaling.y = 1/height;
    turret.scaling.z = 1/length;
    turret.isVisible = false;
    
    for (var i=0; i<n.children.length; i++) {
	   var obj = createObjectForXmlNode(n.children[i]);
      
        if (obj.getType() == "turret") {
            obj.position = new BABYLON.Vector3(0, height, 0);
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

    return self;
}