var Turret = function(xml_node, parent) {
    var n = xml_node;
    
/////////////////
// Constructor //
/////////////////
    
    
    // From xml
    var id;
    var radius = 1;
    
    if (n.hasAttribute('id')) {
        id = n.getAttribute('id');
    } else {
        id = getNewId
    }
    
    if (n.hasAttribute('radius'))
        radius = n.getAttribute('radius');
    
    var self = BABYLON.Mesh.CreateBox(id,0,scene);
    self.isVisible = false;
    
    // Create the hemisphere
     var hemisphere = BABYLON.MeshBuilder.CreateSphere('hemisphere', {diameter: 2*radius, slice: .5}, scene);   
    
    // Attach to parent
    hemisphere.parent = self;
    
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
    
    return self;
}