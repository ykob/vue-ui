export default function(id, videoId) {
  return new Vue({
    el: `#${id}`,
    data: {
      media: null,
      time: 0,
      duration: 0
    },
    mounted: function() {
    },
    methods: {
      play: function(event) {
        this.media.play();
      },
      pause: function(event) {
        this.media.pause();
      },
      stop: function(event) {
        this.media.currentTime = 0;
        this.media.pause();
      },
    }
  });
}
