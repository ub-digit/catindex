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
    var data = [{
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
    if(!params.page) {
      params.page = 1;
    }
    if(params.page === 1) {
      data = [data[0]];
      data.meta = {
        pagination: {
          pages: 2,
          page: 1,
          per_page: 1,
          next: 2,
          previous: null
        }
      };
    }
    if(params.page === 2) {
      data = [data[1]];
      data.meta = {
        pagination: {
          pages: 2,
          page: 2,
          per_page: 1,
          next: null,
          previous: 1
        }
      };
    }
    return data;
    return this.store.find('card', params);
  }
});
