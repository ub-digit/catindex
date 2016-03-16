import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ResetsScroll from 'catindex/mixins/resets-scroll';
import IndicatesLoading from 'catindex/mixins/indicates-loading';
import KnowsAboutDataLayer from 'catindex/mixins/knows-about-data-layer';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetsScroll, IndicatesLoading, KnowsAboutDataLayer, {

  model: function() {
    return this.store.find('card', 'primary');
  },

  setupController: function(controller, model) {

    controller.set('model', model);
    controller.set('model.card_type', 'main');
    controller.set('model.is_sv', false);
    controller.set('model.authors', Ember.A([]));

    // Reset all
    controller.set('formValidated', false);
    controller.set('wasClassificationTouched', false);
    controller.set('wasLookupFieldValueTouched', false);
    controller.set('wasLookupFieldTypeTouched', false);
    controller.set('wasTitleTouched', false);
    controller.set('wasYearsTouched', false);
    controller.set('wasReferenceTextTouched', false);
    controller.set('wasProblemTouched', false);

    controller.set('editMode', true);

    if (localStorage.getItem('sidebarSide') === 'right') {
      controller.set('sidebarRight', true);
    } else {
      controller.set('sidebarRight', false);
    }
    Ember.run.later(this, function() {
      Ember.$('.default-focus-field').focus();
    });
  },
  actions: {
    saveCard: function(card, target){
      var that = this;

      card.registration_type = 'primary';
      card.collection = (card.is_sv) ? 'sv' : null;
      card.additional_authors = card.authors.map(function(item) {
        return item.author || null;
      }).compact();

      this.store.save('card', card).then(
        function(response){

          var diff = moment(response.primary_registrator_end).diff(moment(response.primary_registrator_start), 'seconds');
          that.pushEventToDataLayer('card', 'register', response.card_type, diff);

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
