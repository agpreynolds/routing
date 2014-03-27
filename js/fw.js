var floydWarshall = function() {
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
		
		return {
			distance : distance,
			nodes : [start,end]
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
				//If this path has a shorter distance we want to use it
				if (Matrix[q][r].distance > Matrix[q][p].distance + Matrix[p][r].distance) {
					Matrix[q][r].distance = Matrix[q][p].distance + Matrix[p][r].distance;
					
					//Yucky hack - please explain
					$.merge(Matrix[q][r].nodes,Matrix[q][p].nodes);
					Matrix[q][r].nodes = unique(Matrix[q][r].nodes);
				}				
			}
		}
	}
	return Matrix;		
};

/*
	*http://stackoverflow.com/questions/12551635/jquery-remove-duplicates-from-an-array-of-strings
*/
function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}