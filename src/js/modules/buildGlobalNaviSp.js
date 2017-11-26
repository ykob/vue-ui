const Vue = require('vue/dist/vue.min');
const PerfectScrollbar = require('perfect-scrollbar');
const FixBody = require('js-util/FixBody');

export default function(query) {
  const elmItem = document.querySelectorAll('.p-global-navi-sp__item');
  const isOpenedChildren = {};
  for (var i = 0; i < elmItem.length; i++) {
    isOpenedChildren[elmItem[i].dataset.key] = false
  }

  return new Vue({
    el: query,
    data: {
      items: null,
      ps: null,
      children: {},
      currentId: 0,
      isOpenedNavi: false,
      isOpenedChildren: isOpenedChildren,
      fixBody: new FixBody(),
    },
    mounted: function() {
      this.items = this.$el.querySelector('.p-global-navi-sp__items');
      this.ps = new PerfectScrollbar(this.items);
    },
    methods: {
      toggleNavi: function() {
        this.isOpenedNavi = !this.isOpenedNavi;
        if (this.isOpenedNavi) {
          this.fixBody.set();
        } else {
          this.fixBody.cancel();
        }
      },
      closeNavi: function() {
        this.isOpenedNavi = false;
        this.fixBody.cancel();
      },
      toggleChildren: function(key) {
        const keyChild = `child_${key}`;
        const keyChildIn = `child_${key}_in`;
        this.isOpenedChildren[key] = !this.isOpenedChildren[key];
        if (this.isOpenedChildren[key]) {
          this.$refs[keyChild].style.height = `${this.$refs[keyChildIn].clientHeight}px`;
        } else {
          this.$refs[keyChild].style.height = `0`;
        }
      },
      updatePerfectScrollbar: function() {
        this.ps.update(this.items);
      },
    }
  })
}
