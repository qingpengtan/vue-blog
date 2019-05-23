<template>
  <ul class="version">
    <li class="wel">欢迎{{user}}访问，今天是{{time}} 第{{weekDays}}周</li>
    <li class="progress-text">{{currentYear}}年已过去: {{progress}}% {{currentDay}}/{{totalDay}}</li>
    <!-- <li>
      <a href="http://www.zhiroad.cn/blog/normal/" target='_blank' title="普通版">普通版</a>
    </li>
    <li style="color: rgb(185,69,14);" title="清新版">清新版</li>
    <li @click="tip" title="炫酷版">炫酷版</li>-->
  </ul>
</template>

<script>
import api from "@/api/article";
import showCal from "@/utils/navCal";
import swal from "sweetalert";
import moment from "moment";

export default {
  props: ["select"],
  data() {
    return {
      user: "",
      time: "",
      weekDays: 0,
      currentYear: "",
      progress: "0",
      currentDay: 0,
      totalDay: 365
    };
  },
  created() {
    // moment.locale('zh-cn');
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
    let totalTime =
      moment(endYear, "YYYYMMDD") -
      moment(startYear, "YYYYMMDD") +
      24 * 3600 * 1000;
    let currentTime = moment() - moment(startYear, "YYYYMMDD");
    this.progress = parseInt((currentTime / totalTime) * 100);
    this.currentDay = Math.ceil(currentTime / (24 * 3600 * 1000));
    this.totalDay = Math.ceil(totalTime / (24 * 3600 * 1000));
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
    tip() {
      swal("正在努力开发中...");
    }
  }
};
</script>

<style lang="scss" scoped>
.version li {
  font-size: 13px;
  float: left;
  // padding: 0 10px;
  cursor: pointer;
  border-right: 1px solid;
  color: inherit;
  &:last-child {
    border-right: none;
  }
  a {
    color: inherit;
  }

  &:hover:not(:first-child) {
    color: rgb(185, 69, 14);
  }
}
.wel {
  display: none;
}
.version {
  z-index: 999;
}
@media only screen and (max-width: 481px) {
  .wel {
    display: block;
  }
}
</style>
