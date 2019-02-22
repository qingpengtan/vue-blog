<template>
  <ul class="version">
    <li>欢迎您，{{user}}大牛</li>
    <li>
      <a href="http://www.zhiroad.cn/blog/normal/">普通版</a>
    </li>
    <li style="    color: rgb(185,69,14);">清新版</li>
    <li @click="tip">炫酷版</li>
  </ul>
</template>

<script>
import api from "@/api/article";

export default {
  props: ["select"],
  data() {
    return {
      user: ""
    };
  },
  created() {
    api.getUserInfo().then(res => {
      this.user = res.data;
    });
  },
  methods: {
    tip(){
      alert("正在努力开发中...")
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
.version {
  z-index: 999;
}
@media only screen and (max-width: 481px) {
}
</style>
