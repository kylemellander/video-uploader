import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-upload-input', 'Integration | Component | file upload input', {
  integration: true
});

test('it is a file input', function(assert) {
  assert.expect(3);

  this.render(hbs`{{file-upload-input}}`);

  const input = this.$().children();
  assert.ok(input.is('input'), 'is an input');

  assert.equal(input.attr('type'), 'file', 'input is a file input');
  assert.equal(input.attr('accept'), '.mp4', 'only accepts mp4 files');
});
