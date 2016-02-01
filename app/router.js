import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('login');
  this.route('home', {path: '/'});
  this.route('users', function() {
    this.route('new');
  });
  this.route('register');
  this.route('review');
});

export default Router;
