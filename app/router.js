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
  this.resource('admin', function() {
    this.route('edit', { path: ':id' });
  });

});

export default Router;
