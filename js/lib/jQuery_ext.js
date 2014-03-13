/*
    * File for extensions to the jQuery wrapper
    * Attribution will be provided where due
*/

/* ************************************************ */

/*
    * Center a jQuery element
    * Could probably improve this using jQuery itself
*/
$.fn.center = function(ele) {
    var container = {};
    if (ele) {
        container.width = ele.outerWidth();
        container.height = ele.outerHeight();
    }
    else {
        container.width = window.innerWidth;
        container.height = window.innerHeight;
    }
    var width = this.outerWidth();
    var xPos =  ( container.width - width ) / 2;
    var height = this.outerHeight();
    var yPos = ( container.height - height ) / 2;
    if (yPos < 10 ) {
        yPos = 10;
    }
    this.css({
        'left' : xPos + "px",
        'top' : yPos + "px",
        'position' : 'absolute'
    });
}

/*
    * Overlays an element on top of an existing element
    * Current usage : Loading bar
*/
$.fn.lockTo = function(ele) {
    var offsets = ele.offset();
    var xPos = offsets.left;
    var yPos = offsets.top;
    var width = ele.outerWidth();
    var height = ele.outerHeight();

    this.css({
        'left' : xPos + 'px',
        'top'  : yPos + 'px',
        'width': width + 'px',
        'height': height + 'px',
        'position' : 'absolute'
    });
}