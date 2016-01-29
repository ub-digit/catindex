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

  // Validation properties

  isSignumValid: Ember.computed.notEmpty('signum'),

  isLookupFieldValueValid: Ember.computed.notEmpty('lookupFieldValue'),

  isLookupFieldTypeValid: Ember.computed.notEmpty('lookupFieldType'),

  isTitleValid: Ember.computed('cardType', 'title', function() {
    if (this.get('cardType') === 'main' && !this.get('title.length')) {
      return false;
    } else {
      return true;
    }
  }),

  isYear1Valid: Ember.computed.match('year1', /^\d{4}$/),
  isYear2Valid: Ember.computed.match('year2', /^\d{4}$/),

  areYearsValid: Ember.computed('year1', 'year2', 'isYear1Valid', 'isYear2Valid', 'isWithoutYear', function() {

    if (this.get('isWithoutYear')) {
      return true;
    } else {
      if (!this.get('year1.length')) {
        return false;
      }
      if (!this.get('isYear1Valid')) {
        return false;
      }
      if (this.get('year2.length') && !this.get('isYear2Valid')) {
        return false;
      }
      return true;
    }
  }),

  //isFormComplete


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
