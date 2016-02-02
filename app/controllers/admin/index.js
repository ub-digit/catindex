import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["page", "level", "problem"],
  level: "all",
  problem: "all"
});
