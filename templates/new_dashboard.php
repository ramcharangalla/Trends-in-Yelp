<!DOCTYPE html>

<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="../static/lib/css/bootstrap.min.css">
  <link rel="stylesheet" href="../static/lib/css/keen-dashboards.css">
  <link rel="stylesheet" href="../css/main.css">

</head>
<body class="application">

  <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">

    <div class="container-fluid">


      <div class="navbar-header">

        <button type="button" class="btn btn-default btn-sm" onclick="goHome()">
          Home
        </button>

        <div class="nav-center navigation-title" id="business_name">

        </div>



        <!-- <a class="navbar-brand" href="./">
          Four Peaks Brewing Company &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;1340 E 8th St, Ste 104 &nbsp; &nbsp; Tempe, AZ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;No of Reviews: 1755&nbsp; &nbsp; &nbsp; &nbsp; Rating: 4.5</a>


         <p class="navbar-brand">1340 E 8th St, Ste 104</p> -->
      </div>

      <div class="nav-center navigation-title" id="address">


      </div>

      <div class="nav-right navigation-title" id="reset">
        <button type="button" class="btn btn-default btn-sm" onclick="reset()">
          Reset
        </button>
      </div>

      <div class="nav-right navigation-title" id="review_count">


      </div>

      <div class="nav-right navigation-title" id="stars">
      </div>




    </div>
  </div>

  <div class="container-fluid">

    <div class="row">

      <div class="col-sm-6">
        <div class="row">

          <!-- Time Chart -->
          <div class="col-sm-12">
            <div class="chart-wrapper">
              <div class="chart-title">
                Seasonal Trends
              </div>
              <div class="chart-stage">
                <div id="seasonal"></div>

              </div>
            </div>
          </div>
          <!-- Time Chart -->

          <!-- Resources Pie -->
          <div class="col-sm-12">
            <div class="chart-wrapper">
              <div class="chart-title">
                Peak Hours
              </div>
              <div class="chart-stage">
                <div id="bar_chart"></div>
              </div>
            </div>
          </div>


        </div>
      </div>

      <!-- Map -->
      <div class="col-sm-6">
        <div class="chart-wrapper">
          <div class="chart-title">
            Rating Trends
          </div>
          <div class="chart-stage">
            <div id="rating_trends"></div>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="chart-wrapper">
          <div class="chart-title">
            Positive Keywords

          </div>
          <div class="chart-stage">
            <div id="cloud_pros"></div>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="chart-wrapper">
          <div class="chart-title">
            Negative Keywords

          </div>
          <div class="chart-stage">
            <div id="cloud_neg"></div>
          </div>
        </div>
      </div>
      <!-- Map -->
    </div>
      <!-- Metric 1 -->
    <div class="row">

      <!-- Metric 1 -->

      <!-- Metric 2 -->

      <!-- Metric 2 -->
    </div>
    </div>

  </div>

    <hr>

  </div>


  <script src="../static/lib/js/jquery.min.js"></script>
  <script src="../static/lib/js/bootstrap.min.js"></script>
  <script src="../static/lib/js/crossfilter.js"></script>
  <script src="https://d3js.org/d3.v4.js"></script>
  <script src="../static/lib/js/queue.js"></script>


  <script src="../static/lib/js/keen.min.js"></script>
  <script src='../static/js/d3-cloud.js' type='text/javascript'></script>
  <script src="../static/js/lodash.min.js"></script>
  <script src='../static/js/wordcloud.js' type='text/javascript'></script>
  <script src="../ajaxsolr/core/Core.js"></script>
  <script src="../ajaxsolr/core/AbstractManager.js"></script>
  <script src="../ajaxsolr/managers/Manager.jquery.js"></script>
  <script src="../ajaxsolr/core/Parameter.js"></script>
  <script src="../ajaxsolr/core/ParameterStore.js"></script>
  <script src="../ajaxsolr/core/AbstractWidget.js"></script>

  <script src="../ajaxsolr/core/AbstractFacetWidget.js"></script>
  <script src="../ajaxsolr/core/AbstractTextWidget.js"></script>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js"></script>

  <script src='../static/js/spiral.js' type='text/javascript'></script>
  <script src='../static/js/line.js' type='text/javascript'></script>
  <script src='../static/js/peak_hours.js' type='text/javascript'></script>

  <script src="../widgets/WordCloudWidget.js"></script>
  <script src="../widgets/BusinessdetailsWidget.js"></script>
  <script src="../widgets/PeakHoursWidget.js"></script>
  <script src="../widgets/LineChartWidget.js"></script>


  <script src="../js/dashboardmanager.js"></script>


  <script type="text/javascript">
    var $_POST = <?php echo json_encode($_POST); ?>;
    var business_id = $_POST['id'];
    console.log($_POST['id']);
    // $("title").;
    var global_line_data;
    callBusinessdetailsManager(business_id);
    callWordCloudManager(business_id,0,0);
    callPeakHoursManager(business_id);
    callLineChartManager(business_id);

    function goHome() {
      window.location.href = "index.html";
    }

    function reset() {
      callWordCloudManager(business_id,0,0);
      drawLine(gLine,lineHeight,lineWidth,"../line_data_init.tsv","init","steelblue");
      drawSpiral(gSpiral,spiral_height,spiral_width,lineHeight,lineWidth,spiralData,lineData,SpiralDataSize);
    }
</script>







</body>
</html>
