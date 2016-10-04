// Set up the map projection that we would like to use
var projection = d3.geo.albersUsa();

// set up a sound to play when a new tweet comes in
var sounds = [];
for (var i = 1; i < 27; i++) {
  var str = i.toString();
  sounds.push(new Howl({
    src: ['sounds/c' + ('000'+str).substring(str.length) + '.mp3'],
    volume: 0.25,
  }))
}


if(io !== undefined) {
  socket = io.connect(window.location.origin);

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
        var sound = sounds[Math.floor(Math.random() * sounds.length)];
        sound.play();
        var id = new Date().getTime();
        svg.append("circle")
          .attr('id', 'circle' + id)
          .attr("r",5)
          .attr('fill', '#6cb8ee')
          .attr('opacity', 1)
          .attr("transform", function() {
            return "translate(" + projection(tweet.coordinates.coordinates) + ")";
          });
        d3.selectAll('#circle' + id).transition().duration(0)
          .attr('r',20)
          .attr('opacity', 0.5)
          .transition().duration(1000).delay(1000)
          .attr('r',5)
          .attr('opacity', 0)
          .remove();
      }
    }
  });

}
