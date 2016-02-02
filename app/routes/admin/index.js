import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import IndicatesLoading from 'catindex/mixins/indicates-loading';

export default Ember.Route.extend(AuthenticatedRouteMixin, IndicatesLoading, {
  queryParams: {
    page: { refreshModel: true },
    level: { refreshModel: true },
    problem: { refreshModel: true },
    image_id: { refreshModel: true }
  },
  model: function(params) {
    console.log(params);
    return [{
      id: 1,
      ipac_image_id: 10023,
      primary_registrator_username: "tjosan",
      secondary_registrator_username: "grodanboll",
      lookup_field_value: "A",
      title: "A och P i hummusodling"
    },{
      id: 2,
      ipac_image_id: 10029,
      primary_registrator_username: "grodanboll",
      secondary_registrator_username: "tjosan",
      lookup_field_value: "B",
      title: "B is a buzzing thing"
    }];
    return this.store.find('card', params);
  }
});
