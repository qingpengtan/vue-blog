<template>
  <div>
    总访问量：{{res.visterNum}}，当前设备信息：
    IP：{{res.ip}} Browser：{{res.browser}} OS：{{res.os}}
    <br>
    <span v-if="show">
      ©2019 ZHIROAD之路 &nbsp;Created By Tang
    </span>
  </div>
</template>

<script>
import api from "@/api/article";
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      res: ""
    };
  },
  created() {
    api.getVisitInfo().then(res => {
      this.res = res.data;
    });
  }
};
</script>
