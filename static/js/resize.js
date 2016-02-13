var h = $('#handle'),
    l = $('#left'),
    r = $('#right'),
    w = $('body').width() - 50;

var isDragging = false;

h.mousedown(function(e){
    isDragging = true;
    e.preventDefault();
});
$(document).mouseup(function(){
    isDragging = false;
}).mousemove(function(e){
    if(isDragging){
        l.css('width', e.pageX);
        r.css('width', w - e.pageX);
    }
});
