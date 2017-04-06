export default function(id, videoId) {
  return new Vue({
    el: `#${id}`,
    data: {
      media: null,
      time: 0,
      duration: 0,
    },
    mounted: function() {
      this.media = document.getElementById(videoId);
      this.media.addEventListener('loadedmetadata', () => {
        this.duration = this.media.duration;
        this.loop();
      });
    },
    computed: {
      getProgressRate: function() {
        return this.time / this.duration;
      }
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
      loop: function() {
        this.time = this.media.currentTime;
        requestAnimationFrame(() => {
          this.loop();
        });
      }
    }
  });
}
