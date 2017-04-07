export default function(id, videoId) {
  return new Vue({
    el: `#${id}`,
    data: {
      media: null,
      seekbar: null,
      seekbarWidth: 0,
      seekbarOffsetX: 0,
      time: 0,
      duration: 0,
      isGrabbingSeekbar: false,
      isPlayedBeforeGrabSeeker: false
    },
    mounted: function() {
      this.media = this.$el.querySelector('.p-video-player__media');
      this.media.addEventListener('loadedmetadata', () => {
        this.duration = this.media.duration;
        this.loop();
      });
      this.seekbar = this.$el.querySelector('.p-video-player__seekbar-wrap');
      this.seekbarWidth = this.seekbar.clientWidth;
      this.seekbarOffsetX = this.seekbar.getBoundingClientRect().left;
      document.addEventListener('mousemove', (event) => {
        this.moveSeekbar(event);
      });
      document.addEventListener('mouseup', (event) => {
        this.releaseSeekbar(event);
      });
    },
    computed: {
      getProgressRate: function() {
        return this.time / this.duration;
      },
      getCurrentTime: function() {
        return this.convertSecondsToTime(this.time);
      },
      getDuration: function() {
        return this.convertSecondsToTime(this.duration);
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
      },
      grabSeekbar: function(event) {
        event.preventDefault();
        this.isGrabbingSeekbar = true;
        this.media.currentTime = event.layerX / this.seekbarWidth * this.duration;
        if (!this.media.paused) this.isPlayedBeforeGrabSeeker = true;
        this.media.pause();
      },
      moveSeekbar: function(event) {
        event.preventDefault();
        if (!this.isGrabbingSeekbar) return;
        this.media.currentTime =
          (event.clientX - this.seekbarOffsetX - window.pageXOffset)
          / this.seekbarWidth * this.duration;
      },
      releaseSeekbar: function(event) {
        event.preventDefault();
        this.isGrabbingSeekbar = false;
        if (this.isPlayedBeforeGrabSeeker) {
          this.media.play();
          this.isPlayedBeforeGrabSeeker = false;
        }
      },
      convertSecondsToTime: function(time) {
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = '0' + seconds;
        let minutes = Math.floor(time / 60 % 60);
        return `${minutes}:${seconds}`
      }
    }
  });
}
