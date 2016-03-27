import { test } from 'qunit';
import moduleForAcceptance from 'video-upload-frontend/tests/helpers/module-for-acceptance';
import { createFile, uploadFileHelper, uploadFile } from '../helpers/file-input';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    uploadFile();

    assert.equal(currentURL(), '/');
  });
});
