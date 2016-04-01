import { moduleFor, test } from 'ember-qunit';

moduleFor('component:file-upload-input', 'Unit | file upload-input', {
  unit: true
});

test('should check if file extension is mp4', function(assert) {
  assert.expect(2);

  const component = this.subject();
  const file = {name: "video.mp4", type: "video/mp4"};

  assert.ok(component.checkExtension(file), 'file extension is mp4');

  file.type = "image/jpg";
  file.name = "image.jpg";

  assert.notOk(component.checkExtension(file), 'file extension is not mp4');
});
