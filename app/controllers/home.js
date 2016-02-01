import Ember from 'ember';

export default Ember.Controller.extend({
  reviewDisabled: Ember.computed.not("model.statistics.available_for_secondary_registration_count")
});
