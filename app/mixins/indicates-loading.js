import Ember from 'ember';

export default Ember.Mixin.create({

  beforeModel: function() {
    Ember.$('body').addClass('loading');
    return this._super();
  },

  afterModel: function() {
    Ember.$('body').removeClass('loading');
    return this._super();
  }
});
