import Ember from 'ember';
import IndicatesLoading from 'catindex/mixins/indicates-loading';

export default Ember.Route.extend(IndicatesLoading, {
  setupController: function() {
    this.afterModel();
  }
});
