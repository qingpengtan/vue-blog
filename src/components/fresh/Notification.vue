<template>
  <div>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <div class="side-btn" v-if="!show">
        <svg-icon
          @click.native="close"
          style="width:30px;height:50px;cursor:pointer"
          icon-class="side"
        />
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <div class="home" v-if="show">
        <div style="position:relative;width:100%;height:20px">
          <svg-icon
            @click.native="close"
            style="width:20px;height:16px;position:absolute;right:0;cursor:pointer"
            icon-class="close"
          />
        </div>
        <div style="width:94%">欢迎{{user}}访问，今天是{{time}} 第{{weekDays}}周</div>
        <div class="progress-wrap">
          <div ref="progress" class="progress-deg"></div>
          <div class="progress-marsk"></div>
          <div class="progress-text">{{currentYear}}年已过去: {{progress}}% {{currentDay}}/{{totalDay}}</div>
        </div>
        <div style="font-size:13px;color:#c1866a">
          是否{{btnTxt}}鼠标跟随动画？
          <button class="send" @click="send">{{btnTxt}}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import showCal from "@/utils/navCal";
import api from "@/api/article";
import moment from "moment";
import { close } from "fs";

export default {
  name: "notifiication",
  data() {
    return {
      show: false,
      user: "",
      time: "",
      closeFlag: false,
      weekDays: 0,
      btnTxt: "关闭",
      currentYear: "",
      progress: "0",
      currentDay:0,
      totalDay:365
    };
  },
  created() {
    this.time = showCal();
    api.getUserInfo().then(res => {
      this.user = res.data;
    });
  },
  mounted() {
    let year = moment().format("YYYY");
    let weekYear = year;
    this.currentYear = year;
    let startYear = year + "0101";
    let endYear = year + "1231";
    let totalTime = moment(endYear, "YYYYMMDD") - moment(startYear, "YYYYMMDD")+(24*3600*1000);
    let currentTime = moment() - moment(startYear, "YYYYMMDD");
    this.progress = parseInt((currentTime / totalTime) * 100);
    this.currentDay = Math.ceil(currentTime/(24*3600*1000 ));
    this.totalDay = Math.ceil(totalTime/(24*3600*1000));
    let count = -1;
    while (year == weekYear) {
      weekYear = moment()
        .weekday(-(count * 7))
        .format("YYYY");
      count++;
    }
    this.weekDays = count;
  },
  methods: {
    close() {
      this.show = !this.show;
      if (this.show) {
        this.$nextTick(() => {
          this.$refs.progress.style.width = this.progress + "%";
        });
      }
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
  padding: 5px 5px 10px 15px;
  // background: hsla(40, 33%, 60%, 0.3);
  background: white;
  line-height: 1.5;
  color: #b04512;
  font-size: 13px;
  letter-spacing: 1px;
  box-shadow: 0 0 5px 0 #999;
  position: fixed;
  right: 25px;
  bottom: 180px;
  display: block;
  .progress-wrap {
    height: 24px;
    border: 1px solid rgb(187, 164, 119);
    margin: 10px 10px 10px 0;
    padding: 2px;
    position: relative;
    .progress-deg {
      height: 100%;
      background: rgb(187, 164, 119);
    }
    .progress-marsk {
      position: absolute;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      left: 0;
      top: 0;
      margin: 2px;
      z-index: -1;
      background: #c1c1c1a3;
    }
    .progress-text {
      position: absolute;
      width: 100%;
      color: white;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1000;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
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
.side-btn {
  position: fixed;
  right: 25px;
  bottom: 195px;
  background: #fff;
  color: #c1866a;
  padding: 5px;
  box-shadow: 0 0 5px 0 #999;
  display: block;
}
@media only screen and (max-width: 481px) {
  .home,
  .side-btn {
    display: none;
  }
}
</style>
