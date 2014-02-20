var maps = maps || {
	init : function() {
		var self = maps;
		
		self.container = $('#map')[0];

		self.map = new google.maps.Map(self.container, {
            center: new google.maps.LatLng(57, 21),
            zoom: 3,
            mapTypeId: "OSM",
            mapTypeControl: false,
            streetViewControl: false
        });

        //Define OSM map type pointing at the OpenStreetMap tile server
        self.map.mapTypes.set("OSM", new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
            },
            tileSize: new google.maps.Size(256, 256),
            name: "OpenStreetMap",
            maxZoom: 18
        }));
	}
}

$(document).ready(maps.init);