<template>
  <div class="home">
    <svg-icon icon-class="404" class="no-found"/>
    <div class="btn">
      <router-link tag="span" to="/">返回首页</router-link>
      <span @click="goBack">返回上一页</span>
    </div>
    <FixNav class="fix-nav" :title="'404'"></FixNav>
  </div>
</template>
<script>
import FixNav from "@/components/fresh/navbar/FixNav.vue";

export default {
  name: "no-page",
  components: {
    FixNav
  },
  created() {
    document.title = "404";
  },
  methods: {
    goBack() {
      if (window.history.length == 0) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: hsla(40, 33%, 60%, 0.3);
  position: relative;
  color: #c1866a;
  .no-found {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -150px;
  }
  .btn {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -80px;
    margin-top: 50px;
    span {
      color: #c1866a;
      cursor: pointer;
      &:first-child {
        padding-right: 20px;
      }
    }
  }
  .fix-nav {
    display: none;
  }
}
@media only screen and (max-width: 481px) {
  .home {
    .fix-nav {
      display: block;
    }
  }
}
</style>
