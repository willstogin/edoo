var container = $('#console');
var controller = container.console({
  promptLabel: '> ',
  commandValidate:function(line){
    if (line == "") return false;
    else return true;
  },
  commandHandle:function(line){
      result = eval(line);
      if (result == undefined)
	  return [{msg:"", className:"jquery-console-message-value"}];
      return [{msg:""+result,
	       className:"jquery-console-message-value"
	      }];
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
