import Ember from 'ember';

export default Ember.Route.extend({


  model: function(params) {

    return params;

  },

  setupController: function(controller, model) {

    if (localStorage.getItem('sidebarSide') === 'right') {
      controller.set('sidebarRight', true);
    } else {
      controller.set('sidebarRight', false);
    }

    controller.set('model', model);

  },

  actions: {

    cancel: function() {
      this.transitionTo('admin');
    }

  }
});
