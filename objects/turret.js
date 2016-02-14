var Turret = function(xml_node, parent) {
    var n = xml_node;
    
/////////////////
// Constructor //
/////////////////
    
    
    // From xml
    var id;
    var radius = 1;
    var angle = 45;
    
    if (n.hasAttribute('id')) {
        id = n.getAttribute('id');
    } else {
        id = getNewId
    }
    
    if (n.hasAttribute('radius'))
        radius = n.getAttribute('radius');
    if (n.hasAttribute('angle')) 
        angle = n.getAttribute('angle');
    // Set angle to radians
    angle = angle * Math.PI/180;
    
    var length = radius * 3;
    if(n.hasAttribute('length'))
        length = n.getAttribute('length');
    
    var self = BABYLON.Mesh.CreateBox(id,0,scene);
    self.isVisible = false;
    
    // Create the hemisphere
     var hemisphere = BABYLON.MeshBuilder.CreateSphere('', {diameter: 2*radius, slice: .5}, scene);   
    
    // Create the cylinder
	var barrel = BABYLON.Mesh.CreateCylinder("",length,radius/4, radius/4, 0, 0,scene, false, BABYLON.Mesh.DOUBLESIDE);
    barrel.position = new BABYLON.Vector3(0, length/2, 0);
    // Rotate forward
    barrel.rotate(BABYLON.Axis.X, angle, BABYLON.Space.Local);
    // Return to proper place
    barrel.position.z = barrel.position.z + length/2*(Math.sin(angle));
    barrel.position.y = barrel.position.y - length/2*(1 - Math.cos(angle));
    
    // Attach to parent
    hemisphere.parent = self;
    barrel.parent = self;
    
    // Add physics
    hemisphere.setPhysicsState({ imposter: BABYLON.PhysicsEngine.BoxImposter, mass:1, restitution: 0});
    
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
        return "turret";
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
    
    self.getLength = function() {
        return length;
    }
    
    self.getAngle = function() {
        return 180/Math.PI * angle;
    }
    return self;
}