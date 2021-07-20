// !preview r2d3 data=sin(seq(0, 2, 0.03))
let baseline = height/2
let radius = 25;
let animate = true;

let radiusScale = d3.scaleLinear()
                .domain([d3.min(data), d3.max(data)])
                .range([10, 30])
                
let x = d3.scaleLinear()
      .domain([0, data.length])
      .range([radius, width-radius])
    
let circles = svg.selectAll("circle")
   .data(data)
   .enter()
   .append("circle")
    .attr("cx", (d, i) => x(i))
    .attr("index", (d, i) => i)
    .attr("cy", baseline)
    .attr("fill", "lightgreen")
    .attr("opacity", 0.7)
    .attr("stroke", "darkgreen")
    .attr("r", d => radiusScale(d))

function chop() {
  
  if (animate) {
    circles.transition("doop")
        .delay((d, i) => 15*i)
        .duration(500)
        .attr("cy", d3.randomUniform(0, height))
        .attr("cx", d3.randomUniform(0, width))
        .on("end", function() {
          if (+d3.select(this).attr("index") == data.length-1) {
            recumber()
          }
        })
  }
  
}

function recumber() {
  circles.transition()
        .delay(1000)
        .duration(1000)
        .attr("cx", function() {
          let i = +d3.select(this).attr("index")
          return x(i)
        })
        .attr("cy", baseline)
        .on("end", function() {
          if (animate) {
            if (+d3.select(this).attr("index") == data.length-1) {
            chop()
            }
          }
        })
}

chop()
    
    
// circles.on("mouseover", handleMouseover)
// circles.on("mouseout", handleMouseout)