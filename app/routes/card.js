import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

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

    controller.set('author', null);
    controller.set('title', null);
    controller.set('year', null);
    controller.set('isTitleLookup', false);
    controller.set('isWithoutYear', false);
    controller.set('problem', null);
    controller.set('signum', null);

    controller.set('model', model);

    var signumList = ['Acta', 'Bibliogr', 'Biogr', 'Bokhandel', 'Bokhåll', 'Bokväs', 'Deklam', 'Ekon', 'Encykl', 'Estet', 'Etnogr', 'Film', 'Filos', 'Fornk', 'Förvaltn', 'Geneal', 'Gymn & sport', 'Geogr', 'Handel', 'Herald', 'Hist', 'Intern rätt', 'Jurid', 'Kartogr', 'Kartor', 'Kolonialväs & imper', 'Kommunalväs', 'Kommunik', 'Konst', 'Krigsväs', 'Kulturhist', 'Kyrkohist', 'Kyrkoväs', 'Litt', 'Litt-hist', 'Magi', 'Matern', 'Med', 'Metrik', 'Musik', 'Mynt, mått & vikt', 'Möten & kongr', 'Naturvet', 'Numism', 'Nykterh', 'Ordensväs', 'Pedag', 'Polit ekon', 'Polygr', 'Religionsvet', 'Skrivkonst', 'Socialpol', 'Sociol', 'Sport & spel', 'Språkvet', 'Statist', 'Statsr', 'Stats- & rättsvet', 'Sällsk', 'Teater', 'Teknol', 'Teol', 'Tidn', 'Tidningsväs', 'Tidskr', 'Utsikt'];

    controller.set('signumList', signumList);

    controller.set('showMainCard', true);
    controller.set('showReferenceCard', false);

  }

});
