import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["page", "level", "problem", "image_id"],
  level: "secondary",
  problem: "only_problem",
  image_id: ""
});
