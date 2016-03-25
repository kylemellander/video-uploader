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

    // Upload file if it gets past the initial checks.

    return e;
  },

  checkExtension(file) {
    return file.type === "video/mp4";
  },

  checkFileHeader(/*file*/) {
    // Add library to check if mp4 file;
    return true;
  }
});
