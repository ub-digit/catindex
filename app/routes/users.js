import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import IndicatesLoading from 'catindex/mixins/indicates-loading';

export default Ember.Route.extend(AuthenticatedRouteMixin, IndicatesLoading, {

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
