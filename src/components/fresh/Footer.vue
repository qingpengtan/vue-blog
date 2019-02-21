<template>
  <div>
    总访问量：{{res.visterNum}}，当前设备信息：
    IP：{{res.ip}} Browser：{{res.browser}} OS：{{res.os}}
    <br>©2019 ZHIROAD之路 &nbsp;Created By Tang
  </div>
</template>

<script>
import api from "@/api/article";
export default {
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
