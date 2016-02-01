import Ember from 'ember';

export default Ember.Mixin.create({

  showMainCard: Ember.computed.equal('model.card_type', 'main'),
  showReferenceCard: Ember.computed.equal('model.card_type', 'reference'),
  showPseudonymCard: Ember.computed.equal('model.card_type', 'pseudonym'),

  isLookupFieldTypeAuthor: Ember.computed.equal('model.lookup_field_type', 'author'),

  imageUrl: Ember.computed('model', function() {
    return 'http://ipac.ub.gu.se/katalog1957/PictureLoader?Antialias=ON&ImageId=' + this.get('model.ipac_image_id') + '&Scale=1';
  }),

  // Validation properties for main card

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

  // Validation properties for reference card

  isReferenceTextValid: Ember.computed.notEmpty('model.reference_text'),


  // General validation properties

  isFormComplete: Ember.computed('model.card_type', 'isProblemValid', 'isClassificationValid', 'isLookupFieldValueValid', 'isLookupFieldTypeValid', 'isTitleValid', 'areYearsValid', 'isReferenceTextValid', function() {
    if (this.get('isProblemValid')) {
      return true;
    }

    if (this.get('model.card_type') === 'main') {
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
    } else if (this.get('model.card_type') === 'reference' || this.get('model.card_type') === 'pseudonym') {
      if (this.get('isLookupFieldValueValid') && this.get('isReferenceTextValid')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }),

  showClassificationError: Ember.computed('isClassificationValid', 'wasClassificationTouched', function() {
    if(this.get('wasClassificationTouched') && !this.get('isClassificationValid')) {
      return true;
    } else {
      return false;
    }
  }),

  showLookupFieldValueError: Ember.computed('isLookupFieldValueValid', 'wasLookupFieldValueTouched', function() {
    if(this.get('wasLookupFieldValueTouched') && !this.get('isLookupFieldValueValid')) {
      return true;
    } else {
      return false;
    }
  }),

  showLookupFieldTypeError: Ember.computed('isLookupFieldTypeValid', 'wasLookupFieldTypeTouched', function() {
    if(this.get('wasLookupFieldTypeTouched') && !this.get('isLookupFieldTypeValid')) {
      return true;
    } else {
      return false;
    }
  }),

  showTitleError: Ember.computed('isTitleValid', 'wasTitleTouched', function() {
    if(this.get('wasTitleTouched') && !this.get('isTitleValid')) {
      return true;
    } else {
      return false;
    }
  }),

  showYearsError: Ember.computed('areYearsValid', 'wasYearsTouched', function() {
    if(this.get('wasYearsTouched') && !this.get('areYearsValid')) {
      return true;
    } else {
      return false;
    }
  }),

  showProblemError: Ember.computed('isProblemValid', 'wasProblemTouched', function() {
    if(this.get('wasProblemTouched') && !this.get('isProblemValid')) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    addAuthor: function() {
      this.get('model.authors').pushObject(Ember.Object.create({author: ""}));
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
    setClassificationTouched: function() {
      this.set('wasClassificationTouched', true);
    },
    setLookupFieldValueTouched: function() {
      this.set('wasLookupFieldValueTouched', true);
    },
    setLookupFieldTypeTouched: function() {
      this.set('wasLookupFieldTypeTouched', true);
    },
    setTitleTouched: function() {
      this.set('wasTitleTouched', true);
    },
    setYearsTouched: function() {
      this.set('wasYearsTouched', true);
    },
    setProblemTouched: function() {
      this.set('wasProblemTouched', true);
    }
  }


});
