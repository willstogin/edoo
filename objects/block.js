
var Block = function(xml_node) {
    var n = xml_node;

/////////////////
// Constructor //
/////////////////

    
    // TODO insert construction code here
    console.log("creating a block!");

    console.log(n.getAttribute('color'));
    console.log(n.children);

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

