import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {
    return this.store.find('card', 'primary');
  },

  setupController: function(controller, model) {

    controller.set('model', model);
    controller.set('model.card_type', 'main');
    controller.set('model.is_sv', false);
    controller.set('model.authors', Ember.A([]));

    // Reset all 
  controller.set('wasClassificationTouched', false);
  controller.set('wasLookupFieldValueTouched', false);
  controller.set('wasLookupFieldTypeTouched', false);
  controller.set('wasTitleTouched', false);
  controller.set('wasYearsTouched', false);
  controller.set('wasProblemTouched', false);

    var signumList = ['Acta', 'Bibliogr', 'Biogr', 'Bokhandel', 'Bokhåll', 'Bokväs', 'Deklam', 'Ekon', 'Encykl', 'Estet', 'Etnogr', 'Film', 'Filos', 'Fornk', 'Förvaltn', 'Geneal', 'Gymn & sport', 'Geogr', 'Handel', 'Herald', 'Hist', 'Intern rätt', 'Jurid', 'Kartogr', 'Kartor', 'Kolonialväs & imper', 'Kommunalväs', 'Kommunik', 'Konst', 'Krigsväs', 'Kulturhist', 'Kyrkohist', 'Kyrkoväs', 'Litt', 'Litt-hist', 'Magi', 'Matern', 'Med', 'Metrik', 'Musik', 'Mynt, mått & vikt', 'Möten & kongr', 'Naturvet', 'Numism', 'Nykterh', 'Ordensväs', 'Pedag', 'Polit ekon', 'Polygr', 'Religionsvet', 'Skrivkonst', 'Socialpol', 'Sociol', 'Sport & spel', 'Språkvet', 'Statist', 'Statsr', 'Stats- & rättsvet', 'Sällsk', 'Teater', 'Teknol', 'Teol', 'Tidn', 'Tidningsväs', 'Tidskr', 'Utsikt'];

    controller.set('signumList', signumList);

  },
  actions: {
    saveCard: function(card){
      var that = this;

      Ember.$('#confirmModal').modal('hide');

      card.registration_type = 'primary';
      card.collection = (card.is_sv) ? 'sv' : null;
      card.additional_authors = card.authors.mapBy('author');
      this.store.save('card', card).then(
        function(){
          that.refresh();
        },
        function(){

        }
      );
    }
  }

});
