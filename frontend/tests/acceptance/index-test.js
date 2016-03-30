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

test('it successfully sends a request when a mp4 video is selected', function(assert) {
  visit('/');
  const file = new Blob(['ftypisomisomiso2mp4toodataLavf53.21.1'], {type: 'video/mp4'});
  file.name = 'test.mp4';
  triggerEvent('.km-ember-file-upload', 'change', { target: { files: [file] } } );

  andThen(function() {
    assert.equal(find('div.loading').text(), '%', 'it shows loading text');
  });
});
