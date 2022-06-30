// !preview r2d3 data=seq(1, 100, 5)

let radius = 15;
let baseline = height - radius - 1                
                
let x = d3.scaleLinear()
      .domain([0, data.length])
      .range([radius+1, width-radius-1])
    
let circles = svg.selectAll("circle")
   .data(data)
   .enter()
   .append("circle")
    .attr("cx", function(d, i) {
      return x(i)
    })
    .attr("cy", baseline)
    .attr("fill", "rgba(200, 150, 150)")
    .attr("opacity", 0.7)
    //.attr("stroke", "black")
    .attr("r", radius)
    
let handleMouseover = function() {
      d3.select(this)
        .transition("doop")
        .duration(500)
        .attr("cy", function() {
          if (+d3.select(this).attr("cy") == baseline) {
            return (+d3.select(this).attr("cy") - 150)
          } else {
            return baseline
          }
        })
        .transition()
        .attr("cy", baseline)
    }
    
    
circles.on("mouseover", handleMouseover)
// circles.on("mouseout", handleMouseout)