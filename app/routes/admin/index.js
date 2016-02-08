import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import IndicatesLoading from 'catindex/mixins/indicates-loading';

export default Ember.Route.extend(AuthenticatedRouteMixin, IndicatesLoading, {
  queryParams: {
    page: { refreshModel: true },
    problem: { refreshModel: true },
    image_id: { refreshModel: true }
  },
  model: function(params) {
    return this.store.find('card', params);
  },

  actions: {
    gotoCard: function(id) {
      this.transitionTo('admin.edit', id);
    },
    fetchSampleCard: function() {
      var that = this;
      this.store.find('card', 'sample').then(function(card) {
        that.transitionTo('admin.edit', card.id, {queryParams: {viewMode: true}});
      }, function() {
        alert("Inga poster finns för stickprov");
      });
    }
  }
});
