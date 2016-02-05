import Ember from 'ember';

export default Ember.Controller.extend({
  reviewDisabled: Ember.computed.not("model.statistics.available_for_secondary_registration_count"),

  indexedCards: Ember.computed('model.statistics.totals.card_count', 'model.statistics.totals.not_started_card_count', function() {
    return this.get('model.statistics.totals.card_count') - this.get('model.statistics.totals.not_started_card_count');
  }),

  progressbarWidthStyle: Ember.computed('model.statistics.totals.card_count', 'indexedCards', function() {
    var perc = this.get('indexedCards') / this.get('model.statistics.totals.card_count') * 100;
    return 'width: ' + perc + '%;';
  })

});
