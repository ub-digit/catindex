import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {

    return this.store.find('user');

  },


  actions: {
    createNewUser: function() {
      this.transitionTo('users.new');
    },
    refreshModel: function() {
      this.refresh();
    }

  }
});
