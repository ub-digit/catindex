import Ember from 'ember';

export default Ember.Route.extend({


  model: function(params) {
    console.log(params);
    return this.store.find('card', params);
  },

  setupController: function(controller, model) {

    controller.set('model', model);

    // Reset all
    controller.set('wasClassificationTouched', false);
    controller.set('wasLookupFieldValueTouched', false);
    controller.set('wasLookupFieldTypeTouched', false);
    controller.set('wasTitleTouched', false);
    controller.set('wasYearsTouched', false);
    controller.set('wasReferenceTextTouched', false);
    controller.set('wasProblemTouched', false);

    controller.set('editMode', true);

    switch (model.collection) {
      case 'sv':
        model.is_sv = true;
        break;
      default:
        model.is_sv = false;
        break;
    }

    model.year_from = model.year_from ? model.year_from.toString() : null;
    model.year_to = model.year_to ? model.year_to.toString() : null;

    var authorsObj = model.additional_authors.map(function(item) {
      return {author: item};
    });

    model.authors = authorsObj;

    var signumList = ['Acta', 'Bibliogr', 'Biogr', 'Bokhandel', 'Bokhåll', 'Bokväs', 'Deklam', 'Ekon', 'Encykl', 'Estet', 'Etnogr', 'Film', 'Filos', 'Fornk', 'Förvaltn', 'Geneal', 'Gymn & sport', 'Geogr', 'Handel', 'Herald', 'Hist', 'Intern rätt', 'Jurid', 'Kartogr', 'Kartor', 'Kolonialväs & imper', 'Kommunalväs', 'Kommunik', 'Konst', 'Krigsväs', 'Kulturhist', 'Kyrkohist', 'Kyrkoväs', 'Litt', 'Litt-hist', 'Magi', 'Matern', 'Med', 'Metrik', 'Musik', 'Mynt, mått & vikt', 'Möten & kongr', 'Naturvet', 'Numism', 'Nykterh', 'Ordensväs', 'Pedag', 'Polit ekon', 'Polygr', 'Religionsvet', 'Skrivkonst', 'Socialpol', 'Sociol', 'Sport & spel', 'Språkvet', 'Statist', 'Statsr', 'Stats- & rättsvet', 'Sällsk', 'Teater', 'Teknol', 'Teol', 'Tidn', 'Tidningsväs', 'Tidskr', 'Utsikt'];

    controller.set('signumList', signumList);

    if (localStorage.getItem('sidebarSide') === 'right') {
      controller.set('sidebarRight', true);
    } else {
      controller.set('sidebarRight', false);
    }

  },

  actions: {
    saveCard: function(card, target){
      var that = this;

      Ember.$('#confirmModal').modal('hide');

      card.registration_type = 'tertiary';
      card.collection = (card.is_sv) ? 'sv' : null;
      card.additional_authors = card.authors.map(function(item) {
        return item.author || null;
      }).compact();

      this.store.save('card', card).then(
        function(){
          if (target) {
            that.transitionTo(target);
          } else {
            that.refresh();
            that.scrollToTop();
            Ember.$('#formCol').scrollTop(0);
          }
        },
        function(){

        }
      );
    },
    cancel: function() {
      this.transitionTo('admin');
    }

  }
});
