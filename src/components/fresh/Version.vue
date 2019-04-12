<template>
  <ul class="version">
    <li class="wel">欢迎您，{{user}}大牛，今天是{{time}}</li>
    <li>
      <a href="http://www.zhiroad.cn/blog/normal/" target='_blank' title="普通版">普通版</a>
    </li>
    <li style="color: rgb(185,69,14);" title="清新版">清新版</li>
    <li @click="tip" title="炫酷版">炫酷版</li>
  </ul>
</template>

<script>
import api from "@/api/article";
import showCal from "@/utils/navCal";
import swal from 'sweetalert';
import moment from 'moment';

export default {
  props: ["select"],
  data() {
    return {
      user: "",
      time:""
    };
  },
  created() {
    // moment.locale('zh-cn');
    this.time = showCal();
    api.getUserInfo().then(res => {
      this.user = res.data;
    });
  },
  methods: {
    tip(){
      swal("正在努力开发中...")
    }
  },
};
</script>

<style lang="scss" scoped>
.version li {
  font-size: 13px;
  float: left;
  padding: 0 10px;
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
.wel{
  display: none;
}
.version {
  z-index: 999;
}
@media only screen and (max-width: 481px) {
  .wel{
    display: block;
  }
}
</style>
