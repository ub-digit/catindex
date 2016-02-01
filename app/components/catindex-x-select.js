import Ember from 'ember';
import XSelect from 'emberx-select/components/x-select';

export default XSelect.extend({
  didInsertElement: function() {
    var that = this;
    Ember.run.once(this, function() {
      this.$().on('blur', function() {
        that.sendAction('focus-out');
      });
    });
  }
});
