import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    createNewUser: function() {

      this.transitionTo('users.new');

    }

  }

});
