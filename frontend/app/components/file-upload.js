import Ember from 'ember';

export default Ember.TextField.extend({
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

    Ember.$.ajax({
      url: '/upload',
      type: 'POST',
      xhr: () => {
          const xhr = Ember.$.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener('progress', this.trackProgress, false);
          }
          return xhr;
      },
      data,
      cache: false,
      contentType: false,
      processData: false
    }).then(() => {
      // handle response;
    });
  },

  trackProgress() {

  },

  checkExtension(file) {
    return file.type === "video/mp4";
  },

  checkFileHeader(/*file*/) {
    // Add library to check if mp4 file;
    return true;
  }
});
