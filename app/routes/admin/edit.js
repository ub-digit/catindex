import Ember from 'ember';

export default Ember.Route.extend({


  model: function(params) {

    return params;

  },

  actions: {

    cancel: function() {
      this.transitionTo('admin');
    }

  }
});
