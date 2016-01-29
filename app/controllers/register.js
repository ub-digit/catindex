import Ember from 'ember';

export default Ember.Controller.extend({

  showMainCard: Ember.computed.equal('model.card_type', 'main'),
  showReferenceCard: Ember.computed.equal('model.card_type', 'reference'),
  showPseudonymCard: Ember.computed.equal('model.card_type', 'pseudonym'),

  isLookupFieldTypeAuthor: Ember.computed.equal('model.lookup_field_type', 'author'),

  imageUrl: Ember.computed('model', function() {
    return 'http://ipac.ub.gu.se/katalog1957/PictureLoader?Antialias=ON&ImageId=' + this.get('model.ipac_image_id') + '&Scale=1';
  }),

  // Validation properties

  isClassificationValid: Ember.computed.notEmpty('model.classification'),

  isLookupFieldValueValid: Ember.computed.notEmpty('model.lookup_field_value'),

  isLookupFieldTypeValid: Ember.computed.notEmpty('model.lookup_field_type'),

  isTitleValid: Ember.computed('model.card_type', 'model.title', function() {
    if (this.get('model.card_type') === 'main' && !this.get('model.title.length')) {
      return false;
    } else {
      return true;
    }
  }),

  isYearFromValid: Ember.computed.match('model.year_from', /^\d{4}$/),
  isYearToValid: Ember.computed.match('model.year_to', /^\d{4}$/),

  areYearsValid: Ember.computed('model.year_from', 'model.year_to', 'isYearFromValid', 'isYearToValid', 'model.no_year', function() {

    if (this.get('model.no_year')) {
      return true;
    } else {
      if (!this.get('model.year_from.length')) {
        return false;
      }
      if (!this.get('isYearFromValid')) {
        return false;
      }
      if (this.get('model.year_to.length') && !this.get('isYearToValid')) {
        return false;
      }
      return true;
    }
  }),

  isProblemValid: Ember.computed.match('model.primary_registrator_problem', /\w{3,}/),

  isFormComplete: Ember.computed('isProblemValid', 'isClassificationValid', 'isLookupFieldValueValid', 'isLookupFieldTypeValid', 'isTitleValid', 'areYearsValid', function() {
    if (this.get('isProblemValid')) {
      return true;
    }
    if (
      this.get('isClassificationValid') &&
      this.get('isLookupFieldValueValid') &&
      this.get('isLookupFieldTypeValid') &&
      this.get('isTitleValid') &&
      this.get('areYearsValid')) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    addAuthor: function() {
      this.get('model.authors').pushObject(Ember.Object.create({author: ""}));
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
      this.set('model.card_type', 'main');
    },
    setReferenceCard: function() {
      this.set('model.card_type', 'reference');
    },
    setPseudonymCard: function() {
      this.set('model.card_type', 'pseudonym');
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
