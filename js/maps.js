var maps = maps || {
	init : function() {
		var self = maps;
		
		self.container = $('#map')[0];

		self.map = new google.maps.Map(self.container,self.haylingIsland);

        //Define OSM map type pointing at the OpenStreetMap tile server
        self.map.mapTypes.set("OSM", new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
            },
            tileSize: new google.maps.Size(256, 256),
            name: "OpenStreetMap",
            maxZoom: 18
        }));
	},
	haylingIsland : {
		center: new google.maps.LatLng(50.810274, -0.97641),
        zoom: 13,
        mapTypeId: "OSM",
        mapTypeControl: false,
        streetViewControl: false
	}
}

$(document).ready(maps.init);