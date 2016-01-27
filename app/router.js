import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('login');
  this.route('card', {path: '/card/:id'});
  this.route('list');
  this.route('home');
  this.route('users', function() {
    this.route('new');
  });
});

export default Router;
