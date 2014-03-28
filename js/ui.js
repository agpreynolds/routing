var startNode, endNode;
$(function(){
    var nodeTemplate = Handlebars.compile($('#nodeTemplate').html());
    var hazardTemplate = Handlebars.compile($('#hazardTemplate').html());
    
    $('#node').bind('click',function(){
        $('#mycanvas').unbind('click').bind('click',function(e){
            var coords = relMouseCoords(this,e);
            
            overlay.init({
                id : 'nodeOverlay',
                content : nodeTemplate(geo.nodes),
                callback : function(container) {
                    $('select').select2();
                    $('form[name="node"]').bind('submit',function(e){
                        e.preventDefault();
                        var id = $(this.elements.id).val();
                        if (id && !geo.nodes[id]) {
                            geo.nodes[id] = new geo.node(id,coords);
                            
                            //Set the start node if not already
                            if (!startNode) {
                                startNode = id;
                            }
                            //Otherwise this must be the endnode
                            //Will be overwritten each time
                            else {
                                endNode = id;
                            }

                            var nodes = $(this.elements["nodes[]"]).val();
                            $(nodes).each(function(){
                                geo.arcs.push( new geo.arc(geo.nodes[id],geo.nodes[this]) );
                            })

                            container.remove();

                            if (startNode && endNode) {
                                calculateRoute();
                            }
                        }
                        else {
                            $('#errors').append($('<li>').addClass('error').html('Please enter a unique ID'));
                        }
                    });
                }
            });
		});
	});
	$('#hazard').bind('click',function(){
		$('#mycanvas').unbind('click').bind('click',function(e){
            var coords = relMouseCoords(this,e);

            overlay.init({
                id : 'hazardOverlay',
                content : hazardTemplate(),
                callback : function(container) {
                    $('form[name="hazard"]').bind('submit',function(e){
                        e.preventDefault();
                        var id = $(this.elements.id).val();
                        var radius = $(this.elements.radius).val();
                        var increments = $(this.elements.increments).val();
                        var weighting = $(this.elements.weighting).val();
                        var degradation = $(this.elements.degradation).val();
                        if (id) {
                            geo.hazards.push( new geo.hazard(id,coords,radius,increments,weighting,degradation) );
                            container.remove();
                            geo.redraw();
                        }
                        else {
                            $('#errors').append($('<li>').addClass('error').html('Please enter a unique ID'));
                        }
                    });
                }
            });
        });
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

var calculateRoute = function() {
    var journeyTemplate = Handlebars.compile($('#journeyTemplate').html());
    var matrix = floydWarshall();
    $('#journey').html(journeyTemplate(matrix[startNode][endNode]));    
}