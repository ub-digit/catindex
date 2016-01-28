import Ember from 'ember';
//import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

//export default Ember.Route.extend(AuthenticatedRouteMixin, {
export default Ember.Route.extend({

  queryParams: {
    id: {
      refreshModel: true
    }
  },

  model: function(params) {

    var id = params.id || '1';

    return id;

  },

  setupController: function(controller, model) {

    controller.set('lookupFieldType', null);
    controller.set('lookupFieldValue', null);
    controller.set('authors', []);
    controller.set('title', null);
    controller.set('year1', null);
    controller.set('year2', null);
    controller.set('isWithoutYear', false);
    controller.set('isSv', false);
    controller.set('problem', null);
    controller.set('signum', null);

    controller.set('model', model);

    var signumList = ['Acta', 'Bibliogr', 'Biogr', 'Bokhandel', 'Bokhåll', 'Bokväs', 'Deklam', 'Ekon', 'Encykl', 'Estet', 'Etnogr', 'Film', 'Filos', 'Fornk', 'Förvaltn', 'Geneal', 'Gymn & sport', 'Geogr', 'Handel', 'Herald', 'Hist', 'Intern rätt', 'Jurid', 'Kartogr', 'Kartor', 'Kolonialväs & imper', 'Kommunalväs', 'Kommunik', 'Konst', 'Krigsväs', 'Kulturhist', 'Kyrkohist', 'Kyrkoväs', 'Litt', 'Litt-hist', 'Magi', 'Matern', 'Med', 'Metrik', 'Musik', 'Mynt, mått & vikt', 'Möten & kongr', 'Naturvet', 'Numism', 'Nykterh', 'Ordensväs', 'Pedag', 'Polit ekon', 'Polygr', 'Religionsvet', 'Skrivkonst', 'Socialpol', 'Sociol', 'Sport & spel', 'Språkvet', 'Statist', 'Statsr', 'Stats- & rättsvet', 'Sällsk', 'Teater', 'Teknol', 'Teol', 'Tidn', 'Tidningsväs', 'Tidskr', 'Utsikt'];

    controller.set('signumList', signumList);

    controller.set('showMainCard', true);
    controller.set('showReferenceCard', false);

  }

});
