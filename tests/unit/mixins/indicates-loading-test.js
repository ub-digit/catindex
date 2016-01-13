import Ember from 'ember';
import IndicatesLoadingMixin from '../../../mixins/indicates-loading';
import { module, test } from 'qunit';

module('Unit | Mixin | indicates loading');

// Replace this with your real tests.
test('it works', function(assert) {
  let IndicatesLoadingObject = Ember.Object.extend(IndicatesLoadingMixin);
  let subject = IndicatesLoadingObject.create();
  assert.ok(subject);
});
