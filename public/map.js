var path = d3.geo.path();

var svg = d3.select("#container").append("svg")
    .attr("width", 960)
    .attr("height", 500);

d3.json("states.json", function(error, us) {
  if (error) throw error;

  svg.append("path")
      .datum(topojson.feature(us, us.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.selectAll(".state")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .style("stroke-width", 1);
});
