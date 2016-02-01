import Ember from 'ember';
import HandlesForm from 'catindex/mixins/handles-form';

export default Ember.Controller.extend(HandlesForm, {

  isProblemValid: Ember.computed.match('model.secondary_registrator_problem', /\w{3,}/),

});
