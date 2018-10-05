(function ($) {

AjaxSolr.PeakHoursWidget = AjaxSolr.AbstractTextWidget.extend({
  afterRequest: function () {
    // $(this.target).find('input').unbind().removeData('events').val('');
    console.log(this.manager.response.response);
    response = this.manager.response.response["docs"][0];

    time_list = response["time"];
    // console.log(time_list);
    hour_counts = {};

    for(var i in time_list) {
      hour_count = time_list[i].split("-")[1];
      hour = hour_count.split(":")[0];
      count = hour_count.split(":")[1];

      if(hour in hour_counts) {
        hour_counts[hour] += parseInt(count);
      }
      else {
        hour_counts[hour] = parseInt(count);
      }
    }

    console.log(hour_counts);
    hour_count_arr = [];

    for(var key in hour_counts) {
      hour_count_arr.push({"hour": key,"count": hour_counts[key]});
    }
    drawPeakHoursChart(hour_count_arr);

  }
});

})(jQuery);
