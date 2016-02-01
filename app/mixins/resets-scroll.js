import Ember from 'ember';

export default Ember.Mixin.create({
  scrollToTop: function() {
    window.scrollTo(0,0);
  }.on('activate')
});
