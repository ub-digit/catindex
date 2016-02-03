import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["page", "problem", "image_id"],
  problem: null,
  image_id: "",
  page: 1,

  observesFilter: Ember.observer('problem', 'image_id', function() {
    this.set('page', 1);
  }),
  observerProblemFilter: Ember.observer('problem', function() {
    this.set('image_id', '');
  })
});
