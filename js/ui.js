$(function(){
    var nodeTemplate = Handlebars.compile($('#nodeTemplate').html());
    var hazardTemplate = Handlebars.compile($('#hazardTemplate').html());
    
    $('#node').bind('click',function(){
        $('#mycanvas').unbind('click').bind('click',function(e){
            coords = relMouseCoords(this,e);
            overlay.init({
                id : 'nodeOverlay',
                content : nodeTemplate(geo.nodes)
            });
            
			// geo.nodes.E = new geo.node('E',coords);
		})
	});
	$('#hazard').bind('click',function(){
		alert('hazard');
	});
});

/*
	http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
*/
function relMouseCoords(canvas,event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = canvas;
    var height = currentElement.height

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = height - ( event.pageY - totalOffsetY );

    return {x:canvasX, y:canvasY}
}