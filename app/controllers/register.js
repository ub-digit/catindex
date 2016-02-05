import Ember from 'ember';
import HandlesForm from 'catindex/mixins/handles-form';

export default Ember.Controller.extend(HandlesForm, {

  isProblemValid: Ember.computed.match('model.primary_registrator_problem', /\w{3,}/),

  showPreviousCardLookupValue: Ember.computed('model.lookup_field_value', 'model.previous_card_lookup_value', function() {
    if(!this.get('model.previous_card_lookup_value')) { return false; }
    var lookupFieldValue = this.get('model.lookup_field_value');
    if(!lookupFieldValue || !lookupFieldValue.length) {
      return true;
    }
    return false;
  }),

  actions: {
    usePreviousLookup: function() {
      this.set('model.lookup_field_value', this.get('model.previous_card_lookup_value'));
      Ember.$('#lookupFieldValue').focus();
    }
  }
});
