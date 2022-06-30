// !preview r2d3 data=seq(1, 100, 5)

let radius = 15;
let baseline = height/2              
                
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
    .attr("opacity", 0.1)
    //.attr("stroke", "black")
    .attr("r", radius)
  


// PLAYER
function player() {
  
    svg.append("circle")
     .transition()
     .attr("cx", width/2)
     .attr("cy", height/2)
     .attr("r", 10)
     .attr("id", "player")
     .attr("fill", "yellow")
     .attr("opacity", 0.2)
  
}

player()

function target(x, y) {
  svg.select("#player")
     .transition()
     .duration(1)
     .attr("cx", x)
     .attr("cy", y)
}

function follow() {
  let new_x = +svg.select("#player").attr("cx")
  let new_y = +svg.select("#player").attr("cy") 
  
  let randomArray = [];
  for (let i in data) {
    randomArray[i] = [
      Math.random()*20-10,
      Math.random()*20-10
    ]
  }
  
  return circles.transition()
         .duration(100)
         .attr("cx", (d, i) => new_x + randomArray[i][0])
         .attr("cy", (d, i) => new_y + randomArray[i][1])
         .delay((d, i) => i*20)
         .on("end", follow)
  
}

setTimeout(follow, 100);
                

svg.on("mousemove", function() {
  let x = d3.mouse(this)[0]
  let y = d3.mouse(this)[1]
  target(x, y)
})

svg.style("cursor", "none")

