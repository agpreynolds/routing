var floydWarshall = function() {
	var distance = function(start,end) {
		//Lets assume they are not linked
		var distance = Number.POSITIVE_INFINITY;
		//We always get the start node
		var nodes = [ start ];
		
		//Distance between the same point is zero always
		if (start == end) {
			distance = 0;
		}

		$(geo.arcs).each(function(){
			if ( ( this.startNode.id == start || this.startNode.id == end )
				&& (this.endNode.id == end || this.endNode.id == start ) ) 
			{
				nodes.push(end); 
				distance = this.distance;
			}
		});
		
		return {
			distance : distance,
			nodes : nodes
		};
	}

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
				if (Matrix[q][r].distance > Matrix[q][p].distance + Matrix[p][r].distance) {
					Matrix[q][r].distance = Matrix[q][p].distance + Matrix[p][r].distance;
					Matrix[q][r].nodes.push(p,r);
				}				
			}
		}
	}
	return Matrix;		
};