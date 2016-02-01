import Ember from 'ember';
import HandlesFormMixin from '../../../mixins/handles-form';
import { module, test } from 'qunit';

module('Unit | Mixin | handles form');

// Replace this with your real tests.
test('it works', function(assert) {
  let HandlesFormObject = Ember.Object.extend(HandlesFormMixin);
  let subject = HandlesFormObject.create();
  assert.ok(subject);
});
