var container = $('#console');
var controller = container.console({
  promptLabel: '> ',
  commandValidate:function(line){
    if (line == "") return false;
    else return true;
  },
  commandHandle:function(line){
      try {
	  var result = window.eval(line);
	  if (result == undefined)
	      return [{msg:"", className:"jquery-console-message-value"}];
	  return [{msg:""+result,
		   className:"jquery-console-message-value"
		  }];
      } catch(err) {
	  return [{msg:""+err,
		   className:"jquery-console-message-error"
		  }];
      }
  },
  autofocus:true,
  animateScroll:true,
  promptHistory:true,
  charInsertTrigger:function(keycode,line){
     // Let you type until you press a-z
     // Never allow zero.
     return true;
  }
});

// Define a print function to allow printing to terminal.
function print(text) {
    controller.report(text,"jquery-console-message-type");
}
