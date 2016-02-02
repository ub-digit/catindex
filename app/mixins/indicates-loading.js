import Ember from 'ember';

export default Ember.Mixin.create({

  beforeModel: function(transition) {
    Ember.$('body').addClass('loading');
    return this._super(transition);
  },

  afterModel: function(resolvedModel, transition) {
    Ember.$('body').removeClass('loading');
    return this._super(resolvedModel, transition);
  }
});
