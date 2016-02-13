var container = $('#console');
var controller = container.console({
  promptLabel: '> ',
  commandValidate:function(line){
    if (line == "") return true;
    else return true;
  },
  commandHandle:function(line){
      return [{msg:"=> [12,42]",
               className:"jquery-console-message-value"},
              {msg:":: [a]",
               className:"jquery-console-message-type"}]
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
