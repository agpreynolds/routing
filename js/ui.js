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

                            var nodes = $(this.elements["nodes[]"]).val();
                            $(nodes).each(function(){
                                new geo.arc(geo.nodes[id],geo.nodes[this]);
                            })

                            container.remove();
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
                        var degradation = $(this.elements.degradation).val();
                        if (id && !geo.hazards[id]) {
                            geo.hazards[id] = new geo.hazard(id,coords,radius,increments,degradation);
                            container.remove();
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