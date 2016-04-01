import Ember from 'ember';

const { run, TextField, RSVP, $ } = Ember;

export default TextField.extend({
  classNames: ["km-ember-file-upload"],
  type: 'file',
  accept: '.mp4',
  url: '/videos',
  fileSelected(e) {
    this.set('videoUrl', null);

    let file = e.target.files[0];
    if (!this.checkExtension(file)) {
      return this.set('error', 'That is not a valid video file. Please select an mp4 file.');
    }

    if (file.size > 104857600) {
      return this.set('error', 'That file is too large.  The maximum file size is 100MB.');
    }

    const data = new FormData();
    data.append("file", file);
    data.append("size", file.size);
    this.set('loading', true);
    this.set('error', null);
    return new RSVP.Promise((resolve, reject) => {
      this.makeRequest(data, resolve, reject);
    });
  },

  uploadSuccess(resp) {
    this.set('loading', false);
    if (resp.data && resp.data.attributes) {
      this.set('videoUrl', resp.data.attributes.url);
    }
  },

  handleError(resp) {
    this.set('loading', false);
    if (resp && resp.responseJSON && resp.responseJSON.errors) {
      this.set('error', resp.responseJSON.errors.file[0]);
    }
  },

  makeRequest(data, resolve, reject) {
    return $.ajax({
      url: this.get('url'),
      type: 'POST',
      xhr: () => {
        const xhr = $.ajaxSettings.xhr();

        xhr.upload.onprogress = (progress) => {
          run(this, this.didProgress, progress);
        };
        // Add cancelling upload here
        return xhr;
      },
      data,
      cache: false,
      contentType: false,
      processData: false,
      success: (resp) => {
        run(() => {
          resolve(this.uploadSuccess(resp));
        });
      },
      error: (resp) => {
        run(() => {
          reject(this.handleError(resp));
        });
      }
    });
  },

  didProgress(progress) {
    const percent = Math.round(progress.loaded / progress.total * 100);
    this.set('progress', percent);
  },

  didInsertElement() {
    this.$().on('change', run.bind(this, 'fileSelected'));
  },

  willDestroyElement() {
    this.$().off('change', run.bind(this, 'fileSelected'));
  },

  checkExtension(file) {
    return file && file.type === "video/mp4";
  },

});
