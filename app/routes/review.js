import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {
    return this.store.find('card', 'secondary');
  },

  setupController: function(controller, model) {

    controller.set('model', model);

    switch (model.collection) {
      case 'sv':
        model.is_sv = true;
        break;
      default:
        model.is_sv = false;
        break;
    }

    var authorsObj = model.additional_authors.map(function(item) {
      return {author: item};
    });

    model.authors = authorsObj;

    var signumList = ['Acta', 'Bibliogr', 'Biogr', 'Bokhandel', 'Bokhåll', 'Bokväs', 'Deklam', 'Ekon', 'Encykl', 'Estet', 'Etnogr', 'Film', 'Filos', 'Fornk', 'Förvaltn', 'Geneal', 'Gymn & sport', 'Geogr', 'Handel', 'Herald', 'Hist', 'Intern rätt', 'Jurid', 'Kartogr', 'Kartor', 'Kolonialväs & imper', 'Kommunalväs', 'Kommunik', 'Konst', 'Krigsväs', 'Kulturhist', 'Kyrkohist', 'Kyrkoväs', 'Litt', 'Litt-hist', 'Magi', 'Matern', 'Med', 'Metrik', 'Musik', 'Mynt, mått & vikt', 'Möten & kongr', 'Naturvet', 'Numism', 'Nykterh', 'Ordensväs', 'Pedag', 'Polit ekon', 'Polygr', 'Religionsvet', 'Skrivkonst', 'Socialpol', 'Sociol', 'Sport & spel', 'Språkvet', 'Statist', 'Statsr', 'Stats- & rättsvet', 'Sällsk', 'Teater', 'Teknol', 'Teol', 'Tidn', 'Tidningsväs', 'Tidskr', 'Utsikt'];

    controller.set('signumList', signumList);

  },

});
