<template>
  <div>
    <div class="slide-nav df-sb">
      <NavBtn></NavBtn>
      <span class="slide-text">{{title}}</span>
      <svg-icon @click.native="navTagClk" icon-class="nav" style="width:33px;height:33px"/>
    </div>
    <NavMenu></NavMenu>
    <NavTag></NavTag>
  </div>
</template>

<script>
import store from "@/store";
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import NavTag from "@/components/fresh/navbar/NavTag.vue";

export default {
  props:['title'],
  components: {
    NavBtn,
    NavMenu,
    NavTag
  },
  methods: {
    navTagClk() {
      console.log(this.$store.state)
      store.dispatch("IsTagActive", !this.$store.getters.isTagActive);
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  margin: 0 auto;
  height: 56px;
  max-height: 100px;
  padding: 0 12px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  background: #fff;
  color: #c1866a;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .slide-text {
    color: #c1866a;
    font-weight: 700;
  }
}
</style>
