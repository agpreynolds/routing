/*
    overlay.js
    Badly written js library by Alex Reynolds
    Needs a lot of work but does the job for firing overlays
    Known issues with window / content resizing
*/
var overlay = overlay || {
    init : function(args) {
        if (!args || !args.id || ( !args.path && !args.content ) ) {
            global.consoleDebug('Missing args to: overlay.init()');
            return false;
        }

        var align = function() {
            $(window).unbind('resize').bind('resize',function(){
                contentContainer.center(positionNode);
            });
            $(window).resize();            
        }
        
        var positionNode = args.positionNode;
        var content = args.content;
        var path = args.path;
        var data = args.data || {};
        var callback = args.callback;
        
        var container = $('<div>').addClass('popup-container');
        container.attr('id',args.id);
        if (positionNode) {
            container.lockTo(positionNode);
        }
        $('body').append(container);
        
        if (!args.noBg) {
            var bgContainer = $('<div>').addClass('popup-bg');
            container.append(bgContainer);
        }
        
        var contentContainer = $('<section>').addClass('popup content');
        container.append(contentContainer);

        //If we have a template path we should attempt to include it
        if (path) {
            $.post(path,data)
            .done(function(response){
            	contentContainer.html(response);
            	align();
                
                $('body,html').animate({
                    scrollTop: $('body').offset().top
                }, 500);
            	
                if (callback) {
                    callback(response,container);
                }
                //TODO: Need to bind the close link event in a more generic customisable way
                //TODO: Consider keeping plain text/html popups on page to minimise requests
                else {
                    contentContainer.find('a.close-link').bind('click',function() {
                        container.remove();
                    });
                }
            });            
        }
        //Otherwise we may have some local or js created content to inject
        else if (content) {
            contentContainer.html(content);
            align();
        }        
    }                
}