(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photoCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class='cat'>\r\n  <div class='cat-photo'>\r\n    <img src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":3,"column":14},"end":{"line":3,"column":21}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":3,"column":28},"end":{"line":3,"column":37}}}) : helper)))
    + "Cat\">\r\n  </div>\r\n  <h2 class='cat-title'> "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":5,"column":25},"end":{"line":5,"column":34}}}) : helper)))
    + " cat </h2>\r\n  <div class='element'>\r\n    <h3 class='timeline-element-title'> Energy: </h2>\r\n    <h3 class='timeline-element-text'> "
    + alias4(((helper = (helper = helpers.energy || (depth0 != null ? depth0.energy : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"energy","hash":{},"data":data,"loc":{"start":{"line":8,"column":39},"end":{"line":8,"column":49}}}) : helper)))
    + " </h3>\r\n  </div>\r\n  <div class='element'>\r\n    <h3 class='timeline-element-title'> Sociability: </h2>\r\n    <h3 class='timeline-element-text'> "
    + alias4(((helper = (helper = helpers.sociability || (depth0 != null ? depth0.sociability : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sociability","hash":{},"data":data,"loc":{"start":{"line":12,"column":39},"end":{"line":12,"column":54}}}) : helper)))
    + " </h3>\r\n  </div>\r\n  <div class='element'>\r\n    <h3 class='timeline-element-title'> Color: </h2>\r\n    <h3 class='timeline-element-text'> "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":16,"column":39},"end":{"line":16,"column":48}}}) : helper)))
    + " </h3>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();