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

  showMainCard: Ember.computed.equal('cardType', 'main'),
  showReferenceCard: Ember.computed.equal('cardType', 'reference'),
  showPseudonymCard: Ember.computed.equal('cardType', 'pseudonym'),



  isLookupFieldTypeAuthor: Ember.computed.equal('lookupFieldType', 'author'),

  imageUrl: Ember.computed('model', function() {
    return 'http://ipac.ub.gu.se/katalog1957/PictureLoader?Antialias=ON&ImageId=' + this.get('model.ipac_image_id') + '&Scale=1';
  }),

  actions: {
    addAuthor: function() {

      this.get('authors').pushObject(Ember.Object.create({author: ""}));

    },
    next: function() {
      this.transitionToRoute('register');
    },
    cancel: function() {
      this.transitionToRoute('home');
    },
    toggleSidebar: function() {
      this.toggleProperty('sidebarRight');
    },

    setMainCard: function() {
      this.set('cardType', 'main');
    },
    setReferenceCard: function() {
      this.set('cardType', 'reference');
    },
    setPseudonymCard: function() {
      this.set('cardType', 'pseudonym');
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
