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
    var isFirstSet = true;
    
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
    lat = toRadian(lat);
    long = toRadian(long);
    
    var length = radius * 3;
    if(n.hasAttribute('length'))
        length = n.getAttribute('length');
    
    var self = BABYLON.Mesh.CreateBox(id,0,scene);
    self.isVisible = false;
      
    
    // Create the cylinder
	var barrel; //= BABYLON.Mesh.CreateCylinder("",length,radius/4, radius/4, 0, 0,scene, false, BABYLON.Mesh.DOUBLESIDE);
//        barrel.position = new BABYLON.Vector3(0, length/2, 0);
    
    setLatLong(lat, long);
      
    
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
//        if (isFirstSet ) {
//            lat = 0;
//            long = 0;
//        }
        barrel = BABYLON.Mesh.CreateCylinder("",length,radius/4, radius/4, 0, 0,scene, false, BABYLON.Mesh.DOUBLESIDE);
        barrel.position = new BABYLON.Vector3(0, length/2, 0);
        // Find difference between previous and current angles       
        la = Math.PI/2 - la; // la is now in terms of down from vertical
//        la = la - lat;
//        lo = lo - long; 
        
        
        // Rotate forward
        // Make barrel's parent be an empty pivot
//        var EmptyPivot = new BABYLON.Mesh("pivos", scene);
//        EmptyPivot.position.x = barrel.position.x - length/2 * Math.sin(lat);
//        EmptyPivot.position.y = barrel.position.y - length/2*Math.cos(lat);
//        EmptyPivot.position.z = barrel.position.z - length/2 * Math.sin(long);
//        barrel.parent = EmptyPivot;
//        EmptyPivot.rotate(BABYLON.Axis.X, la, BABYLON.Space.Local);
//        EmptyPivot.rotate.x = la;
        
        barrel.rotate(BABYLON.Axis.X, la, BABYLON.Space.Local);
        // Return to proper place
        barrel.position.z = barrel.position.z + length/2*(Math.sin(la));
        barrel.position.y = barrel.position.y - length/2*(1 - Math.cos(la));
        // Create the hemisphere
        hemisphere = BABYLON.MeshBuilder.CreateSphere('', {diameter: 2*radius, slice: .5}, scene); 
        barrel.parent = hemisphere;
        
//        var projection = length * Math.cos(la);
        hemisphere.rotate(BABYLON.Axis.Y, lo, BABYLON.Space.Local);
        barrel.parent = hemisphere;

        hemisphere.parent = self;  
        
        lat = lat + la;
        long = lo + long;
        isFirstSet = false;
    }
    
    function toRadian(a) {
        return a * Math.PI/180;
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
    
    self.setAngles = function (la, lo) {        
        hemisphere.dispose();
        barrel.dispose();
        
        setLatLong(la, lo);
    }
    
    return self;
}