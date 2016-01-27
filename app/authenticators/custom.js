import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
      type: 'GET',
      url: ENV.APP.authenticationBaseURL+'/'+properties.token
        }).then(function() {
      resolve(properties);
        }, function() {
      reject();
        });
    });
  },
  authenticate: function(credentials) {
    Ember.$('body').addClass("loading");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: ENV.APP.authenticationBaseURL,
        data: JSON.stringify({
          username: credentials.identification,
          password: credentials.password
        }),
        contentType: 'application/json'
      }).then(function(response) {
        var token = response.access_token;
        Ember.run(function() {
          resolve({
            authenticated: true,
            token: token,
            username: response.user.username
          });
        });
      },
      function(xhr, status, error) {
        var response = xhr.responseText;
        Ember.run(function() {
          //reject(xhr.responseJSON.error);
          reject(response);
        });
      });
    });
  },
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      resolve();
    });
  }
});

