<template>
  <div class="home" v-if="show">
    <div style="position:relative;width:100%;height:20px">
      <svg-icon
        @click.native="close"
        style="width:20px;height:16px;position:absolute;right:0;cursor:pointer"
        icon-class="close"
      />
    </div>
    <div style="width:94%">欢迎您，{{user}}大牛，今天是{{time}}</div>
  </div>
</template>

<script>
import showCal from "@/utils/navCal";
import api from "@/api/article";

export default {
  name: "notifiication",
  data() {
    return {
      show: true,
      user: "",
      time: ""
    };
  },
  created() {
    this.time = showCal();
    api.getUserInfo().then(res => {
      this.user = res.data;
    });
  },
  methods: {
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 240px;
  padding: 5px 5px 5px 10px;
  background: hsla(40, 33%, 60%, 0.3);
  line-height: 1.5;
  color: #c1866a;
  font-size: 14px;
  letter-spacing: 1px;
  box-shadow: 0 0 5px 0;
  position: fixed;
  right: 25px;
  bottom: 180px;
}
@media only screen and (max-width: 481px) {
  .home {
    display: none;
  }
}
</style>
