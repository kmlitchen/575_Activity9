// Activity 8 ~

// execute fx on load:
window.onload = function(){

	// SVG dimensions:
    var w = 900, h = 500;

    // container block:
    var container = d3.select("body") // get <body> element from the DOM
        .append("svg") // insert an svg
        .attr("width", w) // set width + height (defined above)
        .attr("height", h) 
        .attr("class", "con/ assign heighttainer") // assign class name
        .style("background-color", "rgba(133, 98, 75, 0.36)"); // set svg background color

    // inner block: 
    var innerRect = container.append("rect")
        .datum(400) // set datum
        .attr("width", function(d){ // set width and height based on datum value
            return d * 2; 
        })
        .attr("height", function(d){ 
            return d; 
        })
        .attr("class", "innerRect") // assign class name
        .attr("x", 50) // x-position (from left) 
        .attr("y", 50) // y-position (from top) 
        .style("fill", "#ffffff"); // fill color
    
    // city pop data:
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    // set scale:
    var x = d3.scaleLinear() 
        .range([90, 750]) // min and max output
        .domain([0, 3]); // min and max input

    // find the min value of array:
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    // find the max value of array:
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    // scale for circles - center y coordinate:
    var y = d3.scaleLinear()
            .range([450, 50]) // vs 440, 95
            .domain([0, 700000]); // vs min/maxPop

    // color scale generator: 
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);

    // set circles from city pop data: 
    var circles = container.selectAll(".circles") // 1st creates an empty selection
        .data(cityPop) // add array of city data
        .enter() // one of the great mysteries of the universe
        .append("circle") // beep bop add circle
        .attr("class", "circles") // assign class
        .attr("id", function(d){ // define attributes:
            return d.city;
        })
        .attr("r", function(d){ // set radius based on pop
            var area = d.population * 0.01; 
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){ // place ea circle along x-axis by index pos
            return x(i);
        })
        .attr("cy", function(d){ // place ea circle along y-axis by pop 
            return y(d.population); // (subtracts 450 to build bottom vs down from top of SVG)
        })
        .style("fill", function(d, i){ // set fill by color generator
            return color(d.population);
        })
        .style("stroke", "#000"); // set circle outline 

    // y-axis:
    var yAxis = d3.axisLeft(y);

    // make g element and add y-axis:
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);

    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");

    // add circle labels:
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            return y(d.population); // set vertical pos - center on ea circle
        });

    // label line 1:
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){ // set hz pos - right of ea circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

    // format generator:
    var format = d3.format(",");

    // label line 2:
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") // vertical offset
        .text(function(d){
            return "Pop. " + format(d.population); // format #s w/ format generator
        });

};