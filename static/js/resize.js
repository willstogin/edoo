var hv = $('#handle-vertical'),
    hhl = $('#handle-horizontal-left'),
    hhr = $('#handle-horizontal-right'),
    l = $('#left'),
    r = $('#right'),
    xml = $('#xml'),
    js = $('#javascript'),
    can = $('#canvas'),
    con = $('#console'),
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
    } else if(isHorizontalLeftDragging) {
        //xml.css('height', e.pageY);
        //$('#js-container').css('top', (e.pageY - h) * -1);
        //js.css('top', e.pageY * -1);
    } else if(isHorizontalRightDragging) {
        //can.css('height', e.pageY);
        //con.css('height', h + e.pageY);
        //$('#console-container').css('top', intialY - e.pageY);
    }
});

$(document).ready(function(){
  l.css('width', w/2);
  r.css('width', w/2);
  $('.col-md-12').css('height', h/2);
});
