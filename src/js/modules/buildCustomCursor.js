const Vue = require('vue/dist/vue.min');

export default function() {
  const cursor = new Vue({
    el: '#vue-custom-cursor',
    data: {
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      state: 0,
    },
    computed: {
      setStyles: function() {
        return `transform:translate3d(${this.vx}px, ${this.vy}px, 0)`;
      },
    },
    methods: {
      move: function() {
        const dist = Math.sqrt(Math.pow(this.ax - this.vx, 2) + Math.pow(this.ay - this.vy, 2));
        const f = dist * 0.08;
        this.vx += (this.ax - this.vx === 0) ? 0 : (this.ax - this.vx) / dist * f;
        this.vy += (this.ay - this.vy === 0) ? 0 : (this.ay - this.vy) / dist * f;
      },
      setVelocity: function(x, y) {
        this.ax = x;
        this.ay = y;
      },
    }
  });

  const render = () => {
    cursor.move();
  };
  const renderLoop = () => {
    render();
    requestAnimationFrame(() => {
      renderLoop();
    });
  };

  window.addEventListener('mousemove', (e) => {
    cursor.setVelocity(e.x, e.y);
  });

  renderLoop();

  return cursor;
}
