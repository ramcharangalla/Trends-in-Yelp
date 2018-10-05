// set the dimensions and margins of the graph

function drawPeakHoursChart(data) {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 700 - margin.left - margin.right,
      height = 190 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var barchart_svg = d3.select("#bar_chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  // d3.csv("../peak_hours.csv", function(error, data) {
  //   if (error) throw error;

    // format the data
    // data.forEach(function(d) {
    //   d.count = +d.count;
    // });

    hours = {0:"12AM", 1:"1AM", 2:"2AM", 3:"3AM", 4:"4AM", 5:"5AM", 6:"6AM", 7:"7AM", 8:"8AM", 9:"9AM", 10:"10AM", 11:"11AM", 12:"12PM", 13:"1PM"
    , 14:"2PM", 15:"3PM", 16:"4PM", 17:"5PM", 18:"6PM", 19:"7PM", 20:"8PM", 21:"9PM", 22:"10PM", 23:"11PM"}
    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return (hours[parseInt(d.hour)]); }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    // append the rectangles for the bar chart
    barchart_svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(hours[parseInt(d.hour)]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

    // add the x Axis
    barchart_svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    barchart_svg.append("g")
        .call(d3.axisLeft(y).ticks(5));
    var view_svg = document.getElementById("bar_chart").childNodes[0];

    var bbox = view_svg.getBBox();
    // var viewBox = [bbox.x, bbox.y-40, bbox.width+50, bbox.height+80].join(" ");
    var viewBox = [bbox.x, bbox.y, bbox.width+25, bbox.height+15].join(" ");
    view_svg.setAttribute("viewBox", viewBox);
  // });

}
