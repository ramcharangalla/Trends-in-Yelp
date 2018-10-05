//Code based on Line chart by Mike Bostock https://bl.ocks.org/mbostock/3883245

var bb = document.querySelector ("#rating_trends")
                    .getBoundingClientRect();
var width = bb.right - bb.left;
var height = 235;

// var width = 700;
// var height = 500;

var lineHeight = height-50;
var lineWidth = width-50;


var gLine = d3.select("#rating_trends")
                .append("svg")
                .attr("height",height-50)
                .attr("width",width-50)
                .append("g");


// var gLine = d3.select("svg").append("g").attr("class", "mainLine")
//     .attr("transform","translate("+spiralWidth+", 0)");



var drawLine = function(g, gHeight, gWidth,fname,MonthYear,color){

  var year;
  var svg = g,
    margin = {top: 30, right: 30, bottom: 30, left: 60},
    width = gWidth - margin.left - margin.right,
    height = gHeight - margin.top - margin.bottom;

  d3.selectAll(".lineClass").remove();
  var g = svg.append("g")
        .attr("class","lineClass")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

//console.log("sdff");
d3.tsv(fname, function(d) {

  d.date = parseTime(d.date);
    var res = d.date.toDateString().split(" ");
    var monyear = res[1] + "-"+res[3];
    //console.log(MonthYear);
    //console.log(monyear);
  d.close = +d.close;
  if(MonthYear=="init"){
    console.log("initlo");
    year = ' 2016-17';
    return d;
  }
  if(monyear==MonthYear){
    year = "   " +res[1]+"-"+res[3];
  return d;}
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0,5]);//d3.max(data, function(d) { return d.close; })]);

  g.append("g")
      .attr("transform", "translate(0," + (height+1) + ")")
      .attr("fill", "#000")
      .call(d3.axisBottom(x).tickFormat(function(d) {
          var res = d.toString().split(" ");
        if(MonthYear=="init"){
        return   res[1]+"-"+res[3].substr(2,4); }
        return res[1]+"-"+res[2];
      }))//.tickFormat(d3.timeFormat("%d-%b")))
      .attr("x", 6)
      .attr("dx", "0.71em");
    //.select(".domain")
      //.remove();
console.log(year);
  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", "0.71em")
      .attr("x", -35)
      .attr("dx", "0.71em")
      .attr("text-anchor", "end")
      .text("Avg Ratings "+year);
      // .html("Avg Rating"+"<br/>"+year);

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});
// var view_svg = document.getElementById("rating_trends").childNodes[0];
// console.log(view_svg);
// var bbox = view_svg.getBBox();
// // 71.300048828125 118.71786499023438 432.5652770996094 437.401611328125
// var viewBox = [70, 120, 430, 430].join(" ");
// view_svg.setAttribute("viewBox", viewBox);
// }
}
drawLine(gLine,lineHeight,lineWidth,"../line_data_init.tsv","init","steelblue");
// drawLine(gLine,lineHeight,lineWidth,"../line_data_thur.tsv","May-2016");
