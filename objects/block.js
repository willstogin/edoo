
var Block = function(xml_node) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    var length = 1;
    var width = 1;
    var height = 1;

    if (n.hasAttribute('length'))
	size = n.getAttribute('length');
    if (n.hasAttribute('width'))
	size = n.getAttribute('width');
    if (n.hasAttribute('height'))
	size = n.getAttribute('height');
    
    var self = BABYLON.Mesh.CreateBox("",1,scene);
    self.scaling.x = length;
    self.scaling.y = width;
    self.scaling.z = height;
    

///////////////////////
// Private Functions //
///////////////////////

//////////////////////
// Public Functions //
//////////////////////

    function getType() {
	return "block";
    }

    return {
	getType: getType
    }
}

