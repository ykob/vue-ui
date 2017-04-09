import debounce from 'js-util/debounce';

export default function(id) {
  return new Vue({
    el: `#${id}`,
    data: {
      media: null,
      seekbar: null,
      seekbarWidth: 0,
      seekbarOffsetX: 0,
      time: 0,
      duration: 0,
      volume: 0,
      isPlaying: false,
      isGrabbingSeekbar: false,
    },
    mounted: function() {
      // init
      this.media = this.$el.querySelector('.p-video-player__media');
      this.seekbar = this.$el.querySelector('.p-video-player__seekbar-wrap');
      this.reLayoutSeekbar();

      // addEventListener
      window.addEventListener('resize', debounce(() => {
        this.reLayoutSeekbar();
      }), 100);
      document.addEventListener('mousemove', (event) => {
        this.moveSeekbar(event);
      });
      document.addEventListener('mouseup', (event) => {
        this.releaseSeekbar(event);
      });
      this.media.addEventListener('loadedmetadata', () => {
        this.duration = this.media.duration;
      });
      this.media.addEventListener('ended', () => {
        this.media.currentTime = 0;
        this.isPlaying = false;
      });
    },
    watch: {
      volume: function() {
        this.media.volume = this.volume;
      }
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
      },
    },
    methods: {
      play: function() {
        this.media.play();
        this.isPlaying = true;
        this.loop();
      },
      pause: function() {
        this.media.pause();
        this.isPlaying = false;
      },
      playOrPause: function() {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      },
      stop: function() {
        this.media.currentTime = 0;
        this.pause();
      },
      loop: function() {
        this.time = this.media.currentTime;
        if (!this.isPlaying) return;
        requestAnimationFrame(() => {
          this.loop();
        });
      },
      grabSeekbar: function(event) {
        event.preventDefault();
        this.isGrabbingSeekbar = true;
        this.time = this.media.currentTime = event.layerX / this.seekbarWidth * this.duration;
        this.media.pause();
      },
      moveSeekbar: function(event) {
        event.preventDefault();
        if (!this.isGrabbingSeekbar) return;
        this.time = this.media.currentTime =
          (event.clientX - this.seekbarOffsetX - window.pageXOffset)
          / this.seekbarWidth * this.duration;
      },
      releaseSeekbar: function(event) {
        event.preventDefault();
        this.isGrabbingSeekbar = false;
        if (this.isPlaying) {
          this.media.play();
        }
      },
      reLayoutSeekbar: function() {
        this.seekbarWidth = this.seekbar.clientWidth;
        this.seekbarOffsetX = this.seekbar.getBoundingClientRect().left;
      },
      convertSecondsToTime: function(time) {
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = '0' + seconds;
        let minutes = Math.floor(time / 60 % 60);
        return `${minutes}:${seconds}`
      },
    }
  });
}
