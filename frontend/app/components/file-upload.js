import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ["km-ember-file-upload"],
  type: 'file',
  accept: '.mp4',
  change(e) {
    if (!e.target && !e.target.files) { return; }
    const file = e.target.files[0];

    if (!this.checkExtension(file) && !this.checkFileHeader(file)) {
      return this.set('error', 'That file is not an mp4 file.');
    }

    const data = new FormData();
    data.append(0, file);
    this.set('loading', true);
    Ember.$.ajax({
      url: '/upload',
      type: 'POST',
      xhr: () => {
          const xhr = Ember.$.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.onprogress = (progress) => {
              const percent = Math.round(progress.loaded / progress.total * 100);
              this.set('progress', percent);
            };
          }
          // Add cancelling upload here
          return xhr;
      },
      data,
      cache: false,
      contentType: false,
      processData: false
    }).then((resp) => {
      this.set('loading', false);
      if (resp.data && resp.data.attributes) {
        this.set('videoUrl', resp.data.attributes.url);
      }
    });
  },

  checkExtension(file) {
    return file && file.type === "video/mp4";
  },

  checkFileHeader(/*file*/) {
    // Add library to check if mp4 file;
    return true;
  }
});
