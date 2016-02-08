import Ember from 'ember';
import KnowsAboutDataLayerMixin from '../../../mixins/knows-about-data-layer';
import { module, test } from 'qunit';

module('Unit | Mixin | knows about data layer');

// Replace this with your real tests.
test('it works', function(assert) {
  let KnowsAboutDataLayerObject = Ember.Object.extend(KnowsAboutDataLayerMixin);
  let subject = KnowsAboutDataLayerObject.create();
  assert.ok(subject);
});
