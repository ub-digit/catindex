import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller) {

    controller.set('role', 'OPER');
    controller.set('username', null);
    controller.set('password', null);

  },

  actions: {

    cancel: function() {

      this.transitionTo('users');

    }
  }
});
