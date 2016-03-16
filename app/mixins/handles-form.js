import Ember from 'ember';
import KnowsAboutDataLayer from 'catindex/mixins/knows-about-data-layer';

export default Ember.Mixin.create(KnowsAboutDataLayer, {

  application: Ember.inject.controller(),

  showMainCard: Ember.computed.equal('model.card_type', 'main'),
  showReferenceCard: Ember.computed.equal('model.card_type', 'reference'),
  showPseudonymCard: Ember.computed.equal('model.card_type', 'pseudonym'),

  isLookupFieldTypeAuthor: Ember.computed.equal('model.lookup_field_type', 'author'),
  isLookupFieldTypeTitle: Ember.computed.equal('model.lookup_field_type', 'title'),

  imageUrl: Ember.computed('model', function() {
    return 'http://ipac.ub.gu.se/katalog1957/PictureLoader?Antialias=ON&ImageId=' + this.get('model.ipac_image_id') + '&Scale=1';
  }),

  showPreviousCardLookupValue: Ember.computed(function() { return false; }),

  // Validation properties for main card

  isClassificationValid: Ember.computed.notEmpty('model.classification'),

  //isLookupFieldValueValid: Ember.computed.notEmpty('model.lookup_field_value'),
  isLookupFieldValueValid: Ember.computed('model.lookup_field_value', 'model.lookup_field_type', function() {
    if (this.get('model.lookup_field_type')==='author') {
      if (this.get('model.lookup_field_value') && this.get('model.lookup_field_value').match(/^[^\[\]\/]+$/)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.get('model.lookup_field_value.length')) {
        return true;
      } else {
        return false;
      }
    }
  }),

  isAdditionalAuthorsValid: Ember.computed('model.authors.@each.author', function() {
    var isValid = true;
    var that = this;
    this.get('model.authors').forEach(function(author, i) {
      that.get('model.authors').set(i + '.valid', true);
      if (author.author && !author.author.match(/^[^\[\]\/]+$/)) {
        isValid = false;
        that.get('model.authors').set(i + '.valid', false);
      }
    });
    return isValid;
  }),

  isLookupFieldTypeValid: Ember.computed.notEmpty('model.lookup_field_type'),

  isTitleValid: Ember.computed('model.card_type', 'model.title', 'model.lookup_field_type', function() {
    if (this.get('model.card_type') === 'main' && !this.get('model.title.length')) {
      return false;
    } else if (this.get('model.card_type') === 'reference' &&
               this.get('model.lookup_field_type') === 'title' &&
               !this.get('model.title.length')) {
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

  isCardValid: Ember.computed('model.card_type', 'isClassificationValid', 'isLookupFieldValueValid', 'isLookupFieldTypeValid', 'isTitleValid', 'areYearsValid', 'isReferenceTextValid', 'isAdditionalAuthorsValid', function() {
    if (this.get('model.card_type') === 'main') {
      if (
        this.get('isClassificationValid') &&
        this.get('isLookupFieldValueValid') &&
        this.get('isLookupFieldTypeValid') &&
        this.get('isAdditionalAuthorsValid') &&
        this.get('isTitleValid') &&
        this.get('areYearsValid')) {
        return true;
      } else {
        return false;
      }
    } else if (this.get('model.card_type') === 'reference') {
      if (this.get('isLookupFieldValueValid') && this.get('isReferenceTextValid') && this.get('isTitleValid')) {
        return true;
      } else {
        return false;
      }
    } else if(this.get('model.card_type') === 'pseudonym') {
      if (this.get('isLookupFieldValueValid') && this.get('isReferenceTextValid')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }),

  isFormComplete: Ember.computed('isCardValid', 'isProblemValid', function() {
    if (this.get('isProblemValid')) {
      return true;
    }

    if (this.get('isCardValid')) {
      return true;
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

  showReferenceTextError: Ember.computed('isReferenceTextValid', 'wasReferenceTextTouched', function() {
    if(this.get('wasReferenceTextTouched') && !this.get('isReferenceTextValid')) {
      return true;
    } else {
      return false;
    }
  }),

  showProblemError: Ember.computed('isProblemValid', 'isCardValid', 'wasProblemTouched', function() {
    if(this.get('wasProblemTouched') && !this.get('isProblemValid') && !this.get('isCardValid')) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    addAuthor: function() {
      this.get('model.authors').pushObject(Ember.Object.create({author: "", valid: true}));
    },
    toggleSidebar: function() {
      this.toggleProperty('sidebarRight');
      if (this.get('sidebarRight')) {
        localStorage.setItem('sidebarSide', 'right');
        this.pushEventToDataLayer('gui', 'toggle sidebar', 'right', null);
      } else {
        localStorage.setItem('sidebarSide', 'left');
        this.pushEventToDataLayer('gui', 'toggle sidebar', 'left', null);
      }
    },
    setMainCard: function() {
      this.set('model.card_type', 'main');
      Ember.run.later(this, function() {
        Ember.$('.default-focus-field').focus();
      });
    },
    setReferenceCard: function() {
      this.set('model.card_type', 'reference');
      Ember.run.later(this, function() {
        Ember.$('.default-focus-field').focus();
      });
    },
    setPseudonymCard: function() {
      this.set('model.card_type', 'pseudonym');
      Ember.run.later(this, function() {
        Ember.$('.default-focus-field').focus();
      });
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
    setReferenceTextTouched: function() {
      this.set('wasReferenceTextTouched', true);
    },
    setProblemTouched: function() {
      this.set('wasProblemTouched', true);
    },
    setEditMode: function() {
      this.set('editMode', true);
      Ember.run.later(this, function() {
        Ember.$('.default-focus-field').focus();
      });
    },
    setConfirmMode: function() {
      this.set('editMode', false);
      Ember.run.later(function() {
        Ember.$('#saveNextButton').focus();
      });
    },
    validateForm: function() {
      this.set('formValidated', true);
      this.set('wasClassificationTouched', true);
      this.set('wasLookupFieldValueTouched', true);
      this.set('wasLookupFieldTypeTouched', true);
      this.set('wasTitleTouched', true);
      this.set('wasYearsTouched', true);
      this.set('wasReferenceTextTouched', true);
      this.set('wasProblemTouched', true);
    }
  }
});
