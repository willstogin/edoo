
var Block = function(xml_node) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    
    // TODO insert construction code here
    console.log("creating a block!");

    console.log(n.getAttribute('color'));
    console.log(n.children);

    var size = 1;
    if (n.hasAttribute('size'))
	size = n.getAttribute('size');
    var self = BABYLON.Mesh.CreateBox("",size,scene);
    

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

