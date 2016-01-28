import Ember from 'ember';

export default Ember.Controller.extend({

  lookupFieldType: null,
  lookupFieldValue: null,
  authors: [],
  title: null,
  year1: null,
  year2: null,
  isWithoutYear: null,
  problem: null,
  isSv: false,

  sidebarRight: false,

  showMainCard: true,
  showReferenceCard: false,

  isLookupFieldTypeAuthor: Ember.computed.equal('lookupFieldType', 'author'),

  imageUrl: Ember.computed('model', function() {
    return 'http://ipac.ub.gu.se/katalog1957/PictureLoader?Antialias=ON&ImageId=' + this.get('model.ipac_image_id') + '&Scale=1';
  }),

  actions: {
    addAuthor: function() {

      this.get('authors').pushObject(Ember.Object.create({author: ""}));

    },
    next: function(id) {
      id++;
      this.transitionToRoute('card', id);
    },
    cancel: function() {
      this.transitionToRoute('home');
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
