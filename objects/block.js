
var Block = function(xml_node) {

/////////////////
// Constructor //
/////////////////

    // TODO insert construction code here
    console.log("creating a block!");

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

