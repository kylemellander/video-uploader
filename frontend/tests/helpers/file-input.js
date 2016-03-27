/* global Blob */
import Ember from 'ember';

const createFile = function(content = ['test'], options = {}) {
  const { name, type } = options;
  const file = new Blob(content, {type : type ? type : 'video/mp4'});
  file.name = name ? name : 'test.mp4';

  return file;
}

const uploadFileHelper = function(content, options) {
  const file = createFile(content, options);
  const event = Ember.$.Event('change');

  event.target = {
    files: [file]
  };

  Ember.$('.km-ember-file-upload').trigger(event);
};

const uploadFile = function(app, content, options) {
  const file = createFile(content, options);
  return triggerEvent(
    '.km-ember-file-upload',
    'change',
    { target: { files: [file] } }
  );
};

export { createFile };
export { uploadFile };
export { uploadFileHelper };
