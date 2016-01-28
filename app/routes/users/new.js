import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller) {

    controller.set('role', 'OPER');

  },

  actions: {

    cancel: function() {

      this.transitionTo('users');

    }
  }
});
