import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    createUser: function() {

      var that = this;

      this.store.save('user', {username: this.get('username'), password: this.get('password'), role: this.get('role')}).then(
        function() {
          that.send('refreshModel');
          that.transitionToRoute('users');
        },
        function(error) {
          console.log(error);
        }
      );
    }
  }
});
