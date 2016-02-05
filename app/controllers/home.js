import Ember from 'ember';

export default Ember.Controller.extend({
  reviewDisabled: Ember.computed.not("model.statistics.available_for_secondary_registration_count"),

  indexedCards: Ember.computed('model.statistics.totals.card_count', 'model.statistics.totals.not_started_card_count', function() {
    return this.get('model.statistics.totals.card_count') - this.get('model.statistics.totals.not_started_card_count');
  }),

  progressbarWidthStyle: Ember.computed('model.statistics.totals.card_count', 'indexedCards', function() {
    var perc = this.get('indexedCards') / this.get('model.statistics.totals.card_count') * 100;
    return 'width: ' + perc + '%;';
  }),

  indexTimeString: Ember.computed('model.statistics.totals.primary_ended_average_time', function() {
    var duration = moment.duration(this.get('model.statistics.totals.primary_ended_average_time'));
    return moment(duration.asMilliseconds()).format('mm:ss');
  }),
  reviewTimeString: Ember.computed('model.statistics.totals.secondary_ended_average_time', function() {
    var duration = moment.duration(this.get('model.statistics.totals.secondary_ended_average_time'));
    return moment(duration.asMilliseconds()).format('mm:ss');
  })

});
