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
  }),
  isIPACLookupView: Ember.computed('problem', function() {
    if((this.get('problem') === 'indexed_ipac_lookup_cards') ||
       (this.get('problem') === 'ipac_lookup_cards_with_mismatch')) {
      return true;
    } else {
      return false;
    }
  })
});
