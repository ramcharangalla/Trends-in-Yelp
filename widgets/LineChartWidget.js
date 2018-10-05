(function ($) {

AjaxSolr.LineChartWidget = AjaxSolr.AbstractTextWidget.extend({
  afterRequest: function () {
    // $(this.target).find('input').unbind().removeData('events').val('');

    response = this.manager.response.response["docs"];

    months = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"};

    date_star_sum = {};
    date_star_count = {};

    month_star_sum = {};
    month_star_count = {};
    month_avgs = {};

    date_avgs = {};
    dates = {};
    for(var ind in response) {
      date = response[ind]["date"];
      stars = response[ind]["stars"];

      if(date in date_star_count) {
        date_star_count[date] += 1;
        date_star_sum[date] += parseInt(stars);
      }
      else {
        date_star_count[date] = 1;
        date_star_sum[date] = parseInt(stars);

      }
    }

    for(var ind in response) {
      date = response[ind]["date"];
      stars = response[ind]["stars"];
      stars = parseInt(stars);

      date = new Date(date);

      month = date.getMonth()+1;
      year = date.getFullYear().toString().substr(-2);

      if(year == "16") {


      key = parseInt(month);
      // console.log(key);
      if(key in month_star_count) {
        month_star_count[key] += 1;
        month_star_sum[key] += stars;
      }

      else {
        month_star_count[key] = 1;
        month_star_sum[key] = stars;
      }
    }

    }

    for(var key in month_star_count) {
      month_avgs[key] = month_star_sum[key]/month_star_count[key];
    }

    month_keys = [];
    for(var k in month_avgs) {
      month_keys.push(parseInt(k));
    }

    month_keys.sort(function (a, b) {  return a - b;  });

    console.log(month_keys);

    formatted_months = {1:"01-Jan-16",2:"01-Feb-16",3:"01-Mar-16",4:"01-Apr-16",5:"01-May-16",6:"01-Jun-16",7:"01-Jul-16",8:"01-Aug-16",9:"01-Sep-16",10:"01-Oct-16",11:"01-Nov-16",12:"01-Dec-16"};

    init_data_arr = [];

    for(ind in month_keys) {

      init_data_arr.push({"date": formatted_months[month_keys[ind]],"close": month_avgs[month_keys[ind]]});

    }

    console.log(init_data_arr);
    for(var key in date_star_count) {
      date_avgs[key] = date_star_sum[key]/date_star_count[key];
    }

     keys = [];


    for (var k in date_avgs) {
     if (date_avgs.hasOwnProperty(k)) {
       keys.push(k);
     }
    }

    keys.sort().reverse();


    formatted_dates = {};
    for(ind in keys) {
      date = new Date(keys[ind]);
      // console.log(keys[ind]);
      formatted_dates[keys[ind]] = date.getDate()+"-"+months[date.getMonth()+1]+"-"+date.getFullYear().toString().substr(-2);

      // console.log(date.getDate())
      // console.log(date.getMonth())
      // console.log(date.getDay());
    }

    line_data_arr = [];

    for(ind in keys) {
      line_data_arr.push({"date": formatted_dates[keys[ind]],"close": date_avgs[keys[ind]]});
    }
    // console.log(keys);

    // drawLine(gLine,lineHeight,lineWidth,init_data_arr,"init","steelblue");

    global_line_data = line_data_arr;
    console.log(global_line_data);




    // drawLineChart(hour_count_arr);

  }
});

})(jQuery);
