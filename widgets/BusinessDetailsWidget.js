(function ($) {

AjaxSolr.BusinessDetailsWidget = AjaxSolr.AbstractTextWidget.extend({
  afterRequest: function () {
    // $(this.target).find('input').unbind().removeData('events').val('');
    console.log(this.manager.response.response);
    response = this.manager.response.response["docs"][0];

    name = response["name"];
    address = response["address"];
    review_count = response["review_count"];
    stars = response["stars"];
    document.getElementById("business_name").innerHTML = name;
    document.getElementById("address").innerHTML = address;
    document.getElementById("review_count").innerHTML = "No of Reviews: "+review_count;
    document.getElementById("stars").innerHTML = "Rating: "+stars;


  }
});

})(jQuery);
