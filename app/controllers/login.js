import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate() {
      var data = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:custom', data);
    }
  }
});
