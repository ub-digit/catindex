import Ember from 'ember';

export default Ember.Controller.extend({

  author: null,
  title: null,
  year: null,
  isTitleLookup: null,
  isWithoutYear: null,
  problem: null,

  sidebarRight: false,

  showMainCard: true,
  showReferenceCard: false,

  imageUrl: Ember.computed('model', function() {
    return 'http://ipac.ub.gu.se/katalog1957/PictureLoader?Antialias=ON&ImageId=' + this.get('model') + '&Scale=1';
  }),

  actions: {
    next: function(id) {
      id++;
      this.transitionToRoute('card', id);
    },
    previous: function(id) {
      id--;
      this.transitionToRoute('card', id);
    },
    toggleSidebar: function() {

      this.toggleProperty('sidebarRight');

    },
    showMainCard: function() {
      this.set('showMainCard', true);
      this.set('showReferenceCard', false);
    },
    showReferenceCard: function() {
      this.set('showMainCard', false);
      this.set('showReferenceCard', true);
    }
  }
});
