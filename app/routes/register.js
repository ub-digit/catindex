import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ResetsScroll from 'catindex/mixins/resets-scroll';
import IndicatesLoading from 'catindex/mixins/indicates-loading';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetsScroll, IndicatesLoading, {

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
    controller.set('wasReferenceTextTouched', false);
    controller.set('wasProblemTouched', false);

    controller.set('editMode', true);

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

      card.registration_type = 'primary';
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
    }
  }

});
