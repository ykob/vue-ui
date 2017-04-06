export default function(id, videoId) {
  return new Vue({
    el: id,
    data: {
      media: document.getElementById(videoId)
    },
    mounted: function() {
      this.media.play();
    },
    methods: {

    }
  });
}
