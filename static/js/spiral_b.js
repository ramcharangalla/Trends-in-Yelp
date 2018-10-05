var bb = document.querySelector ("#seasonal")
                    .getBoundingClientRect();
var spiral_width = bb.right - bb.left;
// var spiral_height = 400;

// var spiral_width = 700;
var spiral_height = 485;


// var height = 700;
// var width = 1200;
// var spiralHeight = 700;
// var spiralWidth =500;
// var lineHeight = spiral_height-50;
// var lineWidth = spiral_width-50;


var line_bb = document.querySelector ("#rating_trends")
                    .getBoundingClientRect();
var line_width = line_bb.right - line_bb.left;
var line_height = 235;

// var width = 700;
// var height = 500;

var lineHeight = line_height-50;
var lineWidth = line_width-50;

var selectName;
var gSpiral = d3.select("#seasonal")
                .append("svg")
                .attr("height",spiral_height-50)
                .attr("width",spiral_width-50)
                .append("g");



var drawSpiral = function(g, gHeight, gWidth,lineHeight,lineWidth,spiralData,lineData,SpiralDataSize) {
    var width = gWidth,
      height = gHeight,
      start = 0,
      end = 2.25,
      numSpirals = 3
      margin = {top:50,bottom:50,left:50,right:50};

    var theta = function(r) {
      return numSpirals * Math.PI * r;
    };

    // used to assign nodes color by group
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var r = d3.min([width, height]) / 2 - 40;

    var radius = d3.scaleLinear()
      .domain([start, end])
      .range([40, r]);

    var svg = g.append("g").attr("class", "SpiralClass")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var points = d3.range(start, end + 0.001, (end - start) / 1000);

    var spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(theta)
      .radius(radius);

    var path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .style("fill", "none")
      .style("stroke", "steelblue");

    var spiralLength = path.node().getTotalLength(),

        N = SpiralDataSize,
        barWidth = (spiralLength / N) - 1;

   var someData = [];

   d3.csv(spiralData, function(data) {

    for (var i = 0; i < N; i++) {
   // console.log(data[i].date);
   var testDate = data[i].date;
   var res = testDate.split("-");
   var formatMonth = d3.timeFormat("%B"),
       formatDay = d3.timeFormat("%A"),
       dat = new Date(res[0],res[1]-1,res[2]);

  	//console.log(dat.getMonth());
  	var val = data[i].count;//Math.floor(Math.random() * (10 - 1)) + 1;
  //	console.log(val);


  	someData.push({
        date: dat,
        value: val,
        group: dat.getMonth()
     });
  }


    var timeScale = d3.scaleTime()
      .domain(d3.extent(someData, function(d){
        return d.date;
      }))
      .range([0, spiralLength]);

    // yScale for the bar height
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(someData, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 40]);//added for bar height

    svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
        .attr("class",function(d){
            var date = d.date.toDateString().split(" ");
            return "SpiralRect " + date[1]+date[3];
        })
      .attr("x", function(d,i){

        var linePer = timeScale(d.date),
            posOnLine = path.node().getPointAtLength(linePer),
            angleOnLine = path.node().getPointAtLength(linePer - barWidth);

        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral

        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", function(d){
        return barWidth;
      })
      .attr("height", function(d){
        return yScale(d.value);
      })
      .style("fill", function(d){return color(d.group);})
      .style("stroke", function(d){return color(d.group);}).style("stroke-width","6px")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });

    // add date labels
    var tF = d3.timeFormat("%b %Y"),
        firstInMonth = {};

    svg.selectAll("text")
      .data(someData)
      .enter()
      .append("text")
      .attr("dy", 10)
      .style("text-anchor", "start")
      .style("font", "10px arial")
      .append("textPath")
      // only add for the first of each month
      .filter(function(d){
        var sd = tF(d.date);
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .text(function(d){
        return tF(d.date);
      })
      // place text along spiral
      .attr("xlink:href", "#spiral")
      .style("fill", "grey")
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


    var tooltip = d3.select("body")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'date');
    tooltip.append('div')
    .attr('class', 'value');

    svg.selectAll(".SpiralRect")
    .on('mouseover', function(d) {
        //console.log("in mouse over");
		 var res = d.date.toDateString().split(" ");
        tooltip.select('.date').html("Month and Year: <b>" + res[1] + res[3] + "</b>");
        var val = Math.round((((d.value-0.1)*(39.0))+1.0 )*100)/100;
        //console.log("cal"+val);
        tooltip.select('.value').html("check in: <b>" + val + "<b>");


        var SelectName = "."+res[1]+res[3];
        console.log(SelectName);
        d3.selectAll(SelectName)
        .style("fill","#2c24ed")
        .style("stroke","#2c24ed")
        .style("stroke-width","6px");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

    })
    .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
        .on('click',function(d) {
            //console.log("in mouse over");
            var res = d.date.toDateString().split(" ");
            //tooltip.select('.date').html("Month and Year: <b>" + res[1] + res[3] + "</b>");
            //tooltip.select('.value').html("check in: <b>" + Math.round(d.value*100)/100 + "<b>");
            tooltip.style('display', 'none');
            selectName = "."+res[1]+res[3];
            svg.selectAll("rect")
            .style("fill", function(d){return color(d.group);})
            .style("stroke", function(d){return color(d.group);}).style("stroke-width","6px")
            d3.selectAll(selectName)
                .style("fill","#000000")
                .style("stroke","#000000")
                .style("stroke-width","6px");
            var monthYear = res[1] + "-"+res[3];
            // var lineData = global_line_data;
            drawLine(gLine,lineHeight,lineWidth,global_line_data,monthYear,color(d.group));
            month_dict = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12,}
            callWordCloudManager(business_id,month_dict[res[1]],res[3]);
            //tooltip.style('display', 'block');
            //tooltip.style('opacity',2);

        })
    .on('mouseout', function(d) {
        svg.selectAll("rect")
        .style("fill", function(d){return color(d.group);})
        .style("stroke", function(d){return color(d.group);}).style("stroke-width","6px")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
        if(selectName) {
          svg.selectAll(selectName)
              .style("fill","#000000")
              .style("stroke","#000000")
              .style("stroke-width","6px");
        }

    });
});

var view_svg = document.getElementById("seasonal").childNodes[0];

var bbox = view_svg.getBBox();
var viewBox = [bbox.x, bbox.y-40, bbox.width+50, bbox.height+80].join(" ");
view_svg.setAttribute("viewBox", viewBox);

}

var spiralData = "final_spiral_four.csv";//final_spiral.csv
        // line data file path
var lineData   = "../line_data_thur.tsv";//line_data.tsv
// spiral data file length i.e no of rows in spiral Data
var SpiralDataSize = 692;

drawSpiral(gSpiral,spiral_height,spiral_width,lineHeight,lineWidth,spiralData,lineData,SpiralDataSize);
