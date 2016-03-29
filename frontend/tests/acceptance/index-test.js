/* global Blob */
import { test } from 'qunit';
import moduleForAcceptance from 'video-upload-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('it rejects a file type that is not an mp4', function(assert) {
  visit('/');
  const file = new Blob(['test'], {type: 'plain/txt'});
  file.name = 'test.txt';
  triggerEvent('.km-ember-file-upload', 'change', { target: { files: [file] } } );

  andThen(function() {
    assert.equal(find('div.errors').text(), 'That is not a valid video file. Please select an mp4 file.');
  });
});
