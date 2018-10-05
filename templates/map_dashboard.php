<!DOCTYPE html>

<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="../static/lib/css//bootstrap.min.css">
  <link rel="stylesheet" href="../static/lib/css/keen-dashboards.css">
  <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />

</head>
<body class="application">

  <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">

      <div class="navbar-header">

        <button type="button" class="btn btn-default btn-sm" onclick="goHome()">
          Home
        </button>

        <div class="nav-center navigation-title">
         Setup a New Business
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
                Select Category
              </div>
              <div class="chart-stage" style="height:700px;">
                <div id="map"></div>

              </div>
            </div>
          </div>
        </div>
        </div>
          <!-- Time Chart -->

          <!-- Resources Pie -->
          <div class="col-sm-6">
            <div class="row">
          <div class="col-sm-12">
            <div class="chart-wrapper">
              <div class="chart-title">
                Enter a Location
              </div>
              <div class="chart-stage" style="height:700px;">
                <input id="pac-input" class="controls" type="text" placeholder="Search Box">
                <div id="loc_map"></div>
              </div>
            </div>
          </div>
          <!-- Resources Pie -->
        </div>
      </div>


      <!-- Metric 2 -->


  </div>

    <hr>

  </div>
  <!--
  <script src="../static/lib/js/bootstrap.min.js"></script>
  <script src="../static/lib/js/crossfilter.js"></script>
  <script src="https://d3js.org/d3.v4.js"></script>
  <script src="../static/lib/js/queue.js"></script>


  <script src="../static/lib/js/keen.min.js"></script>
  <script src="../ajaxsolr/core/Core.js"></script>
  <script src="../ajaxsolr/core/AbstractManager.js"></script>
  <script src="../ajaxsolr/managers/Manager.jquery.js"></script>
  <script src="../ajaxsolr/core/Parameter.js"></script>
  <script src="../ajaxsolr/core/ParameterStore.js"></script>
  <script src="../ajaxsolr/core/AbstractWidget.js"></script>

  <script src="../ajaxsolr/core/AbstractFacetWidget.js"></script>
  <script src="../ajaxsolr/core/AbstractTextWidget.js"></script> -->

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js"></script>


  <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
  <script src="../static/geojson/choropleth.geojson"></script>
  <script src='../static/js/choropleth.js' type='text/javascript'></script>
  <script src='../static/js/loc_map.js' type='text/javascript'></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3jkMaX5v7EVliUna1as_mBt0v70-R4k8&libraries=places&callback=initAutocomplete"
         async defer>

  </script>

  <script type="text/javascript">

  function goHome() {
    window.location.href = "index.html";
  }

  </script>










</body>
</html>
