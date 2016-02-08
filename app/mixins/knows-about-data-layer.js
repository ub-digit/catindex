import Ember from 'ember';

export default Ember.Mixin.create({

  pushEventToDataLayer: function(category, action, label, value) {

    var o = {
      'event' : 'GAEvent',
      'eventCategory': category,
      'eventAction': action,
      'eventLabel': label,
      'eventValue': value
    };

    if(dataLayer) {
      dataLayer.push(o);
    }
  }
});
