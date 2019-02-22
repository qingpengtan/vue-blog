<template>
  <div class="nav">
    <transition name="fade">
      <div class="mask" @click="navBtnClk" v-show="isActive">
        <ul class="nav-menu" :class="{ active: isActive}">
          <router-link tag="li" to="/" :class="{ active: isActive}" title="Home">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="home" style="width:40%;height:80px"/>
            </div>Home
          </router-link>
          <router-link tag="li" to="/" :class="{ active: isActive}" title="Blog">
            <div class="menu-icon">
              <svg-icon
                class="svg-icons"
                icon-class="Blog"
                style="width:60%;height:65px;margin-left:15px;margin-top:15px;"
              />
            </div>Blog
          </router-link>
          <li :class="{ active: isActive}" title="Music">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="Music" style="width:35%;height:80px"/>
            </div>Music
          </li>
          <li :class="{ active: isActive}" title="Message">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="message" style="width:35%;height:80px"/>
            </div>Message
          </li>
          <li :class="{ active: isActive}" title="Resource">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="Resources" style="width:35%;height:80px"/>
            </div>Resource
          </li>
          <li :class="{ active: isActive}" title="Me">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="me" style="width:35%;height:80px"/>
            </div>Me
          </li>
          <li :class="{ active: isActive}" title="Example">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="example" style="width:35%;height:80px"/>
            </div>Example
          </li>
          <li :class="{ active: isActive}" title="Github">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="Gits" style="width:35%;height:80px"/>
            </div>Github
          </li>
          <li :class="{ active: isActive}" title="Juejin">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="juejin" style="width:35%;height:80px"/>
            </div>Juejin
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "nav-menu",
  computed: {
    isActive() {
      return this.$store.getters.isActive; //需要监听的数据
    }
  },
  methods: {
    navBtnClk() {
      store.dispatch("IsActive", !this.$store.getters.isActive);
    }
  }
};
</script>


<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .nav-menu {
    position: absolute;
    width: 240px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
    &.active {
      width: 415px;
    }
    li {
      width: 60px;
      height: 60px;
      text-align: center;
      border: 1px solid hsla(0, 0%, 86%, 0.1);
      float: left;
      margin: 5px 8px;
      color: #bcbcbc;
      cursor: pointer;
      transition: all 0.3s;
      &.active {
        width: 120px;
        height: 120px;
      }
    }
  }
}

@media only screen and (max-width: 481px) {
  .mask .nav-menu {
    &.active {
      width: 100%;
    }
    li.active {
      width: 31%;
      margin: 1%;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}
</style>
