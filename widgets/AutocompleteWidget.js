(function ($) {

AjaxSolr.AutocompleteWidget = AjaxSolr.AbstractTextWidget.extend({
  afterRequest: function () {
    // $(this.target).find('input').unbind().removeData('events').val('');


    var self = this;

    var callback = function (response) {
      var list = [];
      // console.log(response.response.docs[0]);
      for (var ind in response.response.docs) {
        var doc = response.response.docs[ind];
        var business_id = doc["business_id"][0];
        var name = doc["name"][0]
        var address = doc["address"][0]
        // console.log(doc["business_id"][0]);
        // console.log(doc["name"]);
        list.push({
          "business_id": business_id,
          label: name+" "+ address,
          field: "name",
          value:name
        });
        // break;
      }
      // for (var i = 0; i < self.fields.length; i++) {
      //   var field = self.fields[i];
      //   for (var facet in response.facet_counts.facet_fields[field]) {
      //     // console.log(facet);
      //
      //   }
      // }

      self.requestSent = false;
      $(self.target).find('input').autocomplete('destroy').autocomplete({
        source: list,
        select: function(event, ui) {
          if (ui.item) {
            self.requestSent = true;
            console.log(ui.item.business_id);
            global_business_id = ui.item.business_id;
            if (self.manager.store.addByValue('fq', ui.item.field + ':' + AjaxSolr.Parameter.escapeValue(ui.item.value))) {
              self.doRequest();
            }
          }
        }

      });

      // This has lower priority so that requestSent is set.
      $(self.target).find('input').bind('keydown', function(e) {
        if (self.requestSent === false && e.which == 13) {
          var value = $(this).val();
          if (value && self.set(value)) {
            self.doRequest();
          }
        }
      });

      // console.log(list);
    } // end callback

    var params = [ 'rows=41500&json.nl=map' ];
      // var params = [ 'rows=0&facet=true&facet.limit=-1&facet.mincount=1&json.nl=map' ];
    for (var i = 0; i < this.fields.length; i++) {
      params.push('facet.field=' + this.fields[i]);
    }
    var values = this.manager.store.values('fq');
    // console.log(values);
    for (var i = 0; i < values.length; i++) {
      params.push('fq=' + encodeURIComponent(values[i]));
    }

    var values = this.manager.store.values('fl');
    // console.log(values);
    for (var i = 0; i < values.length; i++) {
      params.push('fl=' + encodeURIComponent(values[i]));
    }


    params.push('q=' + this.manager.store.get('q').val());
    $.getJSON(this.manager.solrUrl + 'select?' + params.join('&') + '&wt=json&json.wrf=?', {}, callback);
  }
});

})(jQuery);
