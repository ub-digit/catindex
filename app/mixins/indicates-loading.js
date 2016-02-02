import Ember from 'ember';

export default Ember.Mixin.create({

  beforeModel: function(transition) {
    Ember.$('body').removeClass('loading-remove');
    Ember.$('body').addClass('loading');
    return this._super(transition);
  },

  afterModel: function(resolvedModel, transition) {
    Ember.$('body').removeClass('loading');
    Ember.run.later(this, function() {
      Ember.$('body').addClass('loading-remove');
    }, 1000);
    return this._super(resolvedModel, transition);
  }
});
