//TODO: Implement Floyd-Warshall

$(function() {
	var floydWarshall = function() {
		var Matrix = {};
		
		for (var i in geo.nodes){
			Matrix[i] = {};
			for(var j in geo.nodes){
				Matrix[i][j] = distance(i, j);
			}
		}
		for (var p in geo.nodes) {
			for (var q in geo.nodes){
				for (var r in geo.nodes) {
					Matrix[q][r] = Math.min (Matrix[q][r], Matrix[q][p] + Matrix[p][r]);
				}
			}
		}
		return Matrix;		
	};

	var distance = function(start,end) {
		//Lets assume they are not linked
		var distance = Number.POSITIVE_INFINITY;
		
		//Distance between the same point is zero always
		if (start == end) {
			distance = 0;
		}

		$(geo.arcs).each(function(){
			if ( ( this.startNode.id == start || this.startNode.id == end )
				&& (this.endNode.id == end || this.endNode.id == start ) ) 
			{
				distance = this.distance;
			}
		});
		
		return distance;
	}

	floydWarshall();
});