<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link> -->
    <!-- </div> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <request-loding></request-loding>
  </div>
</template>

<script>
import RequestLoding from "@/components/RequestLoading.vue";
export default {
  components: {
    RequestLoding
  }
};
</script>


<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
