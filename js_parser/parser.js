

function executeJSTextArea() {
    var js = jsCodeMirror.getValue();
    window.eval(js);
}
// Evaluate once after the page loads.
$(document).ready(executeJSTextArea);

function evaluateJSLine(line) {
    return eval(line);
}