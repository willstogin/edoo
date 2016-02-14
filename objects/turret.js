var Turret = function(xml_node, parent) {
    var n = xml_node;
    
/////////////////
// Constructor //
/////////////////
    
    
    // From xml
    var id;
    var radius = 1;
    var lat = 45;
    var long = 0;
    
    if (n.hasAttribute('id')) {
        id = n.getAttribute('id');
    } else {
        id = getNewId
    }
    
    if (n.hasAttribute('radius'))
        radius = n.getAttribute('radius');
    if (n.hasAttribute('lat')) 
        lat = n.getAttribute('lat');
    if (n.hasAttribute('long'))
        long = n.getAttribute('long');
    // Set angles to radians
    lat = lat * Math.PI/180;
    long = long *Math.PI/180;
    
    var length = radius * 3;
    if(n.hasAttribute('length'))
        length = n.getAttribute('length');
    
    var self = BABYLON.Mesh.CreateBox(id,0,scene);
    self.isVisible = false;
    
    // Create the hemisphere
     var hemisphere = BABYLON.MeshBuilder.CreateSphere('', {diameter: 2*radius, slice: .5}, scene);   
    
    // Create the cylinder
	var barrel;
    setLatLong(lat, long);
    
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
    function setLatLong(la, lo) { // Assume latitude is in radians (up from x-y plane), assume longitude in radians (counterclockwise from positive z)
        // point barrel straight up
        barrel = BABYLON.Mesh.CreateCylinder("",length,radius/4, radius/4, 0, 0,scene, false, BABYLON.Mesh.DOUBLESIDE);//BABYLON.Mesh.CreateBox("barrelBox", 5, scene); //BABYLON.Mesh.CreateCylinder("",length,radius/4, radius/4, 0, 0,scene, false, BABYLON.Mesh.DOUBLESIDE);
        barrel.position = new BABYLON.Vector3(0, length/2, 0);
        la = Math.PI/2 - la; // la is now in terms of down from vertical
        
        // Rotate forward
        barrel.rotate(BABYLON.Axis.X, la, BABYLON.Space.Local);
        // Return to proper place
        barrel.position.z = barrel.position.z + length/2*(Math.sin(la));
        barrel.position.y = barrel.position.y - length/2*(1 - Math.cos(la));
        
        var projection = length * Math.cos(lat);
        hemisphere.rotate(BABYLON.Axis.Y, lo, BABYLON.Space.Local);
        barrel.parent = hemisphere;
    }

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