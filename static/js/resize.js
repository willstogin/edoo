var hv = $('#handle-vertical'),
    hhl = $('#handle-horizontal-left'),
    hhr = $('#handle-horizontal-right'),
    l = $('#left'),
    r = $('#right'),
    xml = $('#xml-container'),
    js = $('#js-container'),
    can = $('#canvas-container'),
    con = $('#console-container'),
    w = $('body').width() - $('#handle-vertical').width(),
    h = $('body').height() - $('#handle-horizontal-left').height();

var isVerticalDragging = false;
var isHorizontalLeftDragging = false;
var isHorizontalRightDragging = false;

hv.mousedown(function(e){
    isVerticalDragging = true;
    e.preventDefault();
});

hhl.mousedown(function(e){
    isHorizontalLeftDragging = true;
    initialY = e.pageY;
    e.preventDefault();
});

hhr.mousedown(function(e){
    isHorizontalRightDragging = true;
    initialY = e.pageY;
    e.preventDefault();
});

$(document).mouseup(function(){
    isVerticalDragging = false;
    isHorizontalLeftDragging = false;
    isHorizontalRightDragging = false;
}).mousemove(function(e){
    if(isVerticalDragging){
        l.css('width', e.pageX);
        r.css('width', w - e.pageX);
        engine.resize();
    } else if(isHorizontalLeftDragging) {
        xml.css('height', e.pageY);
        js.css('height', e.pageY + h);
    } else if(isHorizontalRightDragging) {
      can.css('height', e.pageY);
      con.css('height', h - e.pageY);
      engine.resize();
    }
});

$(document).ready(function(){
  l.css('width', w/4);
  r.css('width', w*(3/4));
  $('.col-md-12').css('height', h/2);
  can.css('height', h*(5/6));
  con.css('height', h*(1/6));
  engine.resize();
});
