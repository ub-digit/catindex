import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ResetsScroll from 'catindex/mixins/resets-scroll';
import IndicatesLoading from 'catindex/mixins/indicates-loading';
import KnowsAboutDataLayer from 'catindex/mixins/knows-about-data-layer';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetsScroll, IndicatesLoading, KnowsAboutDataLayer, {

  model: function() {
    return this.store.find('card', 'secondary');
  },

  setupController: function(controller, model) {

    controller.set('model', model);

    // Reset all
    controller.set('wasClassificationTouched', true);
    controller.set('wasLookupFieldValueTouched', true);
    controller.set('wasLookupFieldTypeTouched', true);
    controller.set('wasTitleTouched', true);
    controller.set('wasYearsTouched', true);
    controller.set('wasReferenceTextTouched', true);
    controller.set('wasProblemTouched', true);

    controller.set('editMode', false);

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

    if (localStorage.getItem('sidebarSide') === 'right') {
      controller.set('sidebarRight', true);
    } else {
      controller.set('sidebarRight', false);
    }

  },

  actions: {
    saveCard: function(card, target){
      var that = this;

      card.registration_type = 'secondary';
      card.collection = (card.is_sv) ? 'sv' : null;
      card.additional_authors = card.authors.map(function(item) {
        return item.author || null;
      }).compact();

      this.store.save('card', card).then(
        function(response){
          that.pushToDataLayer('card', 'review', response.card_type, null);
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
    }
  }

});
