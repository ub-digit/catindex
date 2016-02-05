import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ResetsScroll from 'catindex/mixins/resets-scroll';
import IndicatesLoading from 'catindex/mixins/indicates-loading';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetsScroll, IndicatesLoading, {
  model: function() {
    return this.store.find("user", "" + this.get('session.content.secure.username') + "/statistics");
  }
});
