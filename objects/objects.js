

object_classes = {
    "block": Block
}


function createObjectForXmlNode(node) {
    var type = node.tagName;
    if (type in object_classes) {
	object_classes[type](node);
    } else {
	console.log("Could not create object of type: '"+type+"'");
    }
}