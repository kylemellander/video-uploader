import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ["km-ember-file-upload"],
  type: 'file',
  accept: '.mp4',
  url: '/upload',
  fileSelected(e) {
    let file = e.target.files[0];
    if (!this.checkExtension(file) || !this.checkFileHeader(file)) {
      return this.set('error', 'That is not a valid video file. Please select an mp4 file.');
    }

    const data = new FormData();
    data.append(0, file);
    this.set('loading', true);
    this.set('error', null);
    this.makeRequest(data).then((resp) => {
      this.set('loading', false);
      if (resp.data && resp.data.attributes) {
        this.set('videoUrl', resp.data.attributes.url);
      }
    });
  },

  makeRequest(data) {
    return Ember.$.ajax({
      url: this.get('url'),
      type: 'POST',
      xhr: Ember.run(() => {
          const xhr = Ember.$.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.onprogress = (progress) => {
              const percent = Math.round(progress.loaded / progress.total * 100);
              this.set('progress', percent);
            };
          }
          // Add cancelling upload here
          return xhr;
      }),
      data,
      cache: false,
      contentType: false,
      processData: false
    });
  },

  didInsertElement() {
    this.$().on('change', Ember.run.bind(this, 'fileSelected'));
  },

  willDestroyElement() {
    this.$().off('change', Ember.run.bind(this, 'fileSelected'));
  },

  checkExtension(file) {
    return file && file.type === "video/mp4";
  },

  checkFileHeader(/*file*/) {
    // Add library to check if mp4 file;
    return true;
  }
});
