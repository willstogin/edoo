
/*
// Use node.children instead.
function childNodes(node){
    var children = [];
    subNode = node.firstChild;

    while (subNode != null) {
	if (subNode.nodeType == 1)
	    children.push(subNode);
	subNode = subNode.nextSibling;
    }
    return children;
}
*/

objectsFromXml = [];

function parseXml(txt) {
    // Note: The variable txt is supposed to only have one root node. So I wrap it in zzz.
    txt = "<zzz>"+txt+"</zzz>";
    var xmlDoc;
    if (window.DOMParser) {
	var parser=new DOMParser();
	xmlDoc=parser.parseFromString(txt,"text/xml");
    } else {
	// Internet Explorer
	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async=false;
	xmlDoc.loadXML(txt);
    }

    // Remove previous objects from xml
    while (objectsFromXml.length > 0)
	objectsFromXml.pop().dispose();

    // All the nodes that are roots.
    rootNodes = xmlDoc.children[0].children;
    for (var i=0; i<rootNodes.length; i++) {
	var o = createObjectForXmlNode(rootNodes[i]);
	if (o != undefined)
	    objectsFromXml.push(o);
    }
}

function parseXmlTextArea() {
    var xml = xmlCodeMirror.getValue();
    parseXml(xml);
}