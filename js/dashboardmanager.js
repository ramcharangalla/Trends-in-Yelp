var WordCloudManager;

(function ($) {

  // $(function () {
    WordCloudManager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/yelp/'
    });

    WordCloudManager.addWidget(new AjaxSolr.WordCloudWidget({
      id: 'word_cloud',
      target: '#cloud_pros'
    }));

    BusinessDetailsManager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/yelp/'
    });

    BusinessDetailsManager.addWidget(new AjaxSolr.BusinessDetailsWidget({
      id: 'business_details',
      target: '#business_details'
    }));

    PeakHoursManager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/yelp/'
    });

    PeakHoursManager.addWidget(new AjaxSolr.PeakHoursWidget({
      id: 'peak_hours',
      target: '#peak_hours'
    }));

    LineChartManager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/yelp/'
    });

    LineChartManager.addWidget(new AjaxSolr.LineChartWidget({
      id: 'line_chart',
      target: '#line_chart'
    }));


})(jQuery);

function callWordCloudManager(business_id,month,year) {

  WordCloudManager.init();
  // facet.field=pos_keywords&facet=on&indent=on&q=business_id:JzOp695tclcNCNMuBl7oxA&review_id:*&rows=0&wt=json&facet.limit=100
  WordCloudManager.store.remove('q');
  WordCloudManager.store.remove('fq');
  WordCloudManager.store.addByValue('q', 'review_id:*');
  WordCloudManager.store.addByValue('fq', 'business_id:'+business_id);

  if(month != 0 && year != 0) {
    // date:[2016-03-01T00:00:00Z%20TO%202016-04-01T00:00:00Z]
    var next_month;
    if(month != 11) {
      next_month = ((month+1)%12);
    }
    else {
      next_month = 12;
    }

    date = '['+year+'-'+month+'-01T00:00:00Z TO '+ year+'-'+next_month+'-01T00:00:00Z]';
    console.log(date);
    WordCloudManager.store.addByValue('fq', 'date:'+date);
  }

  var params = {
    facet: true,
    'facet.field': [ 'pos_keywords','neg_keywords'],
    'facet.limit': 50,
    'facet.mincount': 1,
    'json.nl': 'map'
  };
  for (var name in params) {
    WordCloudManager.store.addByValue(name, params[name]);
    // console.log(name,params[name]);
  }
  WordCloudManager.doRequest();

}

function callBusinessdetailsManager(business_id) {

  BusinessDetailsManager.init();

  BusinessDetailsManager.store.remove('q');
  BusinessDetailsManager.store.remove('fq');
  BusinessDetailsManager.store.addByValue('q', 'business_id:'+business_id);
  BusinessDetailsManager.store.addByValue('fq', 'address:*');

  BusinessDetailsManager.doRequest();



}

function callPeakHoursManager(business_id) {

  PeakHoursManager.init();

  PeakHoursManager.store.remove('q');
  PeakHoursManager.store.remove('fq');
  PeakHoursManager.store.addByValue('q', 'business_id:'+business_id);
  PeakHoursManager.store.addByValue('fq', 'type:checkin');
  PeakHoursManager.store.addByValue('rows', '1');

  PeakHoursManager.doRequest();

}

function callLineChartManager(business_id) {

  LineChartManager.init();

  LineChartManager.store.remove('q');
  LineChartManager.store.remove('fq');
  LineChartManager.store.addByValue('q', 'business_id:'+business_id);
  LineChartManager.store.addByValue('fq', 'review_id:*');
  LineChartManager.store.addByValue('fl', 'stars');
  LineChartManager.store.addByValue('fl', 'date');
  LineChartManager.store.addByValue('rows', '2000');

  LineChartManager.doRequest();

}
