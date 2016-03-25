import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'file',
  accept: '.mp4',
  change(e) {
    // Upload file here
    return e;
  }
});
