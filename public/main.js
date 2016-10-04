// Set up the map projection that we would like to use
var projection = d3.geo.albersUsa();

if(io !== undefined) {
  socket = io.connect('http://localhost:3000');

  // This listens on the "twitter-steam" channel and data is
  // received everytime a new tweet is receieved.
  socket.on('twitter-stream', function (data) {

  });

  // Listens for a success response from the server to
  // say the connection was successful.
  socket.on("connected", function(r) {
    console.log('connected to tweet server');
  });

  socket.on('tweet', function(tweet){
    if (tweet.coordinates) {
      projectedCoords = projection(tweet.coordinates.coordinates);
      if (projectedCoords) {
        var id = new Date().getTime();
        svg.append("circle")
          .attr('id', 'circle' + id)
          .attr("r",5)
          .attr('fill', '#6cb8ee')
          .attr('opacity', 1)
          .attr("transform", function() {
            return "translate(" + projection(tweet.coordinates.coordinates) + ")";
          });
        d3.selectAll('#circle' + id).transition().duration(1000)
          .attr('r',20)
          .attr('opacity', 0.5)
          .transition().duration(1000).delay(2000)
          .attr('r',5)
          .attr('opacity', 0)
          .remove();
      }
    }
  });

}
