const Vue = require('vue/dist/vue.min');

export default function(items) {
  return new Vue({
    el: '#photo-gallery',
    data: {
      items: items,
      currentNum: 0,
      prevNum: items.length - 1,
      nextNum: 1,
      touchX: 0,
      moveX: 0,
      clock: 0,
      isAnimate: false,
      isAnimatePrev: false,
      isAnimateNext: false,
      isDrag: false,
    },
    computed: {
      getCurrentItemSrc: function() {
        return this.items[this.currentNum].src;
      },
      getPrevItemSrc: function() {
        return this.items[this.prevNum].src;
      },
      getNextItemSrc: function() {
        return this.items[this.nextNum].src;
      },
      getTitle: function() {
        return this.items[this.currentNum].title;
      },
      getText: function() {
        return this.items[this.currentNum].text;
      },
      getHref: function() {
        return this.items[this.currentNum].href;
      },
      getMoveX: function() {
        if (this.isDrag) {
          return 'translateX(' + (this.moveX - this.touchX) + 'px)';
        } else {
          return '';
        }
      }
    },
    methods: {
      startDrag: function(event) {
        event.preventDefault();
        if (this.isAnimatePrev || this.isAnimateNext) return;
        if (event.touches) {
          this.touchX = event.touches[0].clientX;
          this.moveX = event.touches[0].clientX;
        } else {
          this.touchX = event.clientX;
          this.moveX = event.clientX;
        }
        this.isDrag = true;
      },
      drag: function(event) {
        event.preventDefault();
        if (this.isDrag) {
          if (event.touches) {
            this.moveX = event.touches[0].clientX;
          } else {
            this.moveX = event.clientX;
          }
        }
      },
      finishDrag: function() {
        if (this.moveX - this.touchX > 0) {
          this.isAnimatePrev = true;
        } else if (this.moveX - this.touchX < 0) {
          this.isAnimateNext = true;
        }
        this.touchX = 0;
        this.moveX = 0;
        this.isDrag = false;
        this.clock = Date.now();
      },
      gotoPrev: function() {
        if (this.isAnimatePrev || this.isAnimateNext) return;
        this.isAnimatePrev = true;
      },
      gotoNext: function() {
        if (this.isAnimatePrev || this.isAnimateNext) return;
        this.isAnimateNext = true;
      },
      selectPager: function(i) {
        this.nextNum = i;
        this.isAnimateNext = true;
        this.clock = Date.now();
      },
      setCurrentNum: function() {
        if (this.isAnimatePrev) {
          this.currentNum = this.prevNum;
        } else if (this.isAnimateNext) {
          this.currentNum = this.nextNum;
        }
        setTimeout(() => {
          this.isAnimatePrev = false;
          this.isAnimateNext = false;
          this.prevNum = (this.currentNum == 0) ? this.items.length - 1 : this.currentNum - 1;
          this.nextNum = (this.currentNum == this.items.length - 1) ? 0 : this.currentNum + 1;
        }, 200);
      },
      judgeCurrentNum: function(index) {
        return (this.currentNum == index) ? true : false;
      }
    }
  });
}
