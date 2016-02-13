
// Basic DOM routines

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

// The parser

/*
function handleNode(node) {
    console.log(node.tagName);
    var children = childNodes(node);
    for (var i=0; i<children.length; i++) {
	handleNode(children[i]);
    }
}
*/

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

    // All the nodes that are roots.
    rootNodes = childNodes(childNodes(xmlDoc)[0])
    for (var i=0; i<rootNodes.length; i++) {
	createObjectForXmlNode(rootNodes[i]);
    }
}

function parseXmlTextArea() {

    var xmlTextArea = document.getElementById("xml");
    var xml = xmlTextArea.value;

    parseXml(xml);

}