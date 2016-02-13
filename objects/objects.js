

object_classes = {
    "block": Block,
    "wheels" : Wheels
}


function createObjectForXmlNode(node) {
    var type = node.tagName;
    if (type in object_classes) {
	return object_classes[type](node);
    } else {
	console.log("Could not create object of type: '"+type+"'");
    }
}
