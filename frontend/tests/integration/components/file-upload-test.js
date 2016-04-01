import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-upload', 'Integration | Component | file upload', {
  integration: true
});

test('it displays the file upload button', function(assert) {
  assert.expect(2);

  this.render(hbs`{{file-upload}}`);

  const comp = this.$().children();
  assert.ok(comp.is('div'), 'is a div');

  assert.equal(this.$().text().trim(), 'Choose an mp4 file', 'it renders the button');
});
