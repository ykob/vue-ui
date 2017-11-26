const Vue = require('vue/dist/vue.min');
const debounce = require('js-util/debounce');
const MathEx = require('js-util/MathEx');

export default function(query) {
  return new Vue({
    el: query,
    data: {
      media: null,
      seekbar: null,
      seekbarWidth: 0,
      seekbarOffsetX: 0,
      time: 0,
      duration: 0,
      volumebar: null,
      volumebarWidth: 0,
      volumebarOffsetX: 0,
      volume: 0,
      isPlaying: false,
      isGrabbingSeekbar: false,
      isGrabbingVolumebar: false,
    },
    mounted: function() {
      // init
      this.media = this.$el.querySelector('.p-video-player__media');
      this.seekbar = this.$el.querySelector('.p-video-player__seekbar-wrap');
      this.volumebar = this.$el.querySelector('.p-video-player__volume-bar');
      this.reLayoutSeekbar();
      this.reLayoutVolumebar();

      // addEventListener
      window.addEventListener('resize', debounce(() => {
        this.reLayoutSeekbar();
      }), 100);
      document.addEventListener('mousemove', (event) => {
        event.preventDefault();
        this.moveSeekbar(event);
        this.moveVolumebar(event);
      });
      document.addEventListener('mouseup', (event) => {
        this.releaseSeekbar(event);
        this.releaseVolumebar(event);
      });
      this.media.addEventListener('loadedmetadata', () => {
        this.duration = this.media.duration;
        this.volume = this.media.volume;
      });
      this.media.addEventListener('ended', () => {
        this.stop();
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
        this.time = 0;
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
      mute: function() {
        this.volume = 0;
      },
      grabVolumebar: function(event) {
        event.preventDefault();
        this.isGrabbingVolumebar = true;
        this.volume = MathEx.clamp(
          (event.clientX - this.volumebarOffsetX - window.pageXOffset) / this.volumebarWidth,
          0, 1);
      },
      moveVolumebar: function(event) {
        event.preventDefault();
        if (!this.isGrabbingVolumebar) return;
        this.volume = MathEx.clamp(
          (event.clientX - this.volumebarOffsetX - window.pageXOffset) / this.volumebarWidth,
          0, 1);
      },
      releaseVolumebar: function(event) {
        event.preventDefault();
        this.isGrabbingVolumebar = false;
      },
      reLayoutVolumebar: function() {
        this.volumebarWidth = this.volumebar.clientWidth;
        this.volumebarOffsetX = this.volumebar.getBoundingClientRect().left;
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
