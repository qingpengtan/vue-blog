<template>
  <div class="nav">
    <ul :class="{ active: isActive}" class="nav-btn" @click="navBtnClk">
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
      <li :class="{ active: isActive}"></li>
    </ul>
    <transition name="fade">
      <div class="mask" @click="navBtnClk" v-show="isActive">
        <ul class="nav-menu" :class="{ active: isActive}">
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="home" style="width:40%;height:80px"/>
            </div>Home
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon
                class="svg-icons"
                icon-class="Blog"
                style="width:60%;height:65px;margin-left:15px;margin-top:15px;"
              />
            </div>Blog
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="Music" style="width:35%;height:80px"/>
            </div>Music
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="message" style="width:35%;height:80px"/>
            </div>Message
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="Resources" style="width:35%;height:80px"/>
            </div>Resource
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="me" style="width:35%;height:80px"/>
            </div>Me
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="example" style="width:35%;height:80px"/>
            </div>Example
          </li>
          <li :class="{ active: isActive}">
            <div class="menu-icon">
              <svg-icon class="svg-icons" icon-class="Gits" style="width:35%;height:80px"/>
            </div>Github
          </li>
          <li :class="{ active: isActive}">
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
export default {
  name: "nav-menu",
  data() {
    return {
      isActive: false
    };
  },
  created() {},
  methods: {
    navBtnClk() {
      this.isActive = !this.isActive;
    }
  }
};
</script>


<style lang="scss" scoped>
.nav-btn {
  width: 30px;
  height: 30px;
  margin: 30px;
  position: absolute;
  transition: all 0.3s;
  cursor: pointer;
  li {
    width: 4px;
    height: 4px;
    background: #c1866a;
    float: left;
    margin: 3px;
    transition: all 0.3s;
    &.active {
      margin: 1px;
      background: #ccc;
    }
    .menu-icon {
      height: 80px;
    }
  }
  &.active {
    width: 21px;
    height: 21px;
  }
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.65);
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
      transition: all 0.3s;
      &.active {
        width: 120px;
        height: 120px;
      }
    }
  }
}

@media only screen and (max-width: 481px) {
  .mask .nav-menu{
    &.active {
      width: 100%;
    }
    li.active{
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
