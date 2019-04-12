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
    <div style="font-size:13px;color:#c1866a">
      是否关闭鼠标跟随动画？
      <button class="send" @click="send">{{btnTxt}}</button>
    </div>
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
      time: "",
      closeFlag: false,
      btnTxt: "关闭"
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
    },
    send() {
      this.closeFlag = !this.closeFlag;
      this.btnTxt = this.closeFlag ? "开启" : "关闭";
      this.$emit("closeAnim", this.closeFlag);
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
  color: #e18255;
  font-size: 13px;
  letter-spacing: 1px;
  box-shadow: 0 0 5px 0;
  position: fixed;
  right: 25px;
  bottom: 180px;
}
.send {
  width: 50px;
  height: 20px;
  vertical-align: bottom;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: -webkit-linear-gradient(
    left,
    hsla(40, 33%, 60%, 0.99),
    #c1866a 100%
  );
  margin-right: 0;
  font-size: 13px;
  cursor: pointer;
}
@media only screen and (max-width: 481px) {
  .home {
    display: none;
  }
}
</style>
