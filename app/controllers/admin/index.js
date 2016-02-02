import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["page", "problem", "image_id"],
  problem: "all_problems",
  image_id: "",
  page: 1
});

