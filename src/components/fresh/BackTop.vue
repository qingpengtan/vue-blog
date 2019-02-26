<template>
  <svg-icon @click.native="backTop" class="to-top" icon-class="toTop" style="width:33px;height:33px" />
</template>

<script>
export default {
  props: ["html"],
  methods: {
    backTop() {
      clearInterval(pointTime);
      let pointTime = setInterval(() => {
        var scrolltop = this.html.scrollTop;
        if (scrolltop == 0) {
          clearInterval(pointTime);
        }
        var cur = parseInt(scrolltop);
        let speed = (0 - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        this.html.scrollTop = speed + cur;
      }, 30);
    }
  }
};
</script>

<style lang="scss" scoped>
.to-top {
  position: fixed;
  right: 200px;
  bottom: 50px;
  z-index: 10000;
  cursor: pointer;
}
@media only screen and (max-width: 481px) {
  .to-top {
    display: none;
  }
}
</style>
