const Vue = require('vue/dist/vue.min');
const PerfectScrollbar = require('perfect-scrollbar');
const FixBody = require('js-util/FixBody');

export default function() {
  return new Vue({
    el: '#global-navi-sp',
    data: {
      items: null,
      ps: null,
      children: {},
      currentId: 0,
      isOpenedNavi: false,
      isOpenedChildren: {},
      fixBody: new FixBody(),
    },
    mounted: function() {
      this.items = this.$el.querySelector('.p-global-navi-sp__items');
      this.ps = new PerfectScrollbar(this.items);

      const children = this.$el.querySelectorAll('.p-global-navi-sp__item-children');
      for (var i = 0; i < children.length; i++) {
        const key = children[i].dataset.key;
        this.children[key] = {
          wrap: children[i],
          inner: children[i].querySelector('.p-global-navi-sp__item-children-in')
        };
        this.isOpenedChildren[key] = false;
      }
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
      toggleChildren: function(event, key) {
        this.isOpenedChildren[key] = !this.isOpenedChildren[key];
        if (this.isOpenedChildren[key]) {
          this.children[key].wrap.style.height = `${this.children[key].inner.clientHeight}px`;
        } else {
          this.children[key].wrap.style.height = `0`;
        }
      },
      updatePerfectScrollbar: function() {
        this.ps.update(this.items);
      },
    }
  })
}
