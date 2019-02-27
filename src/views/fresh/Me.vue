<template>
  <div class="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <div class="aside">
      <div class="info">
        <img src="../../assets/logo.png" alt>
        <div style="margin:15px">作为菜鸟我也不知道该说些什么...</div>
        <div class="icon">
          <svg-icon class="svg" icon-class="Gits"/>
          <svg-icon class="juejin" icon-class="juejin"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="divider">
        <span class="divider-inner-text">博客简述</span>
      </div>
      <p>UI设计：借鉴他人
        <br>相关技术：Vue-Cli3 + Vue2.5 + Spring-Boot + Mysql
        <br>源码地址为
        <!-- https://github.com/qingpengtan/vue-blog -->
        <a href target="_blank">github</a>，仅供参考！
      </p>
      <div class="divider">
        <span class="divider-inner-text">关于我</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
export default {
  name: "me",
  components: {
    NavBtn,
    NavMenu
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: hsla(40, 33%, 60%, 0.3);
  display: flex;
  flex-wrap: wrap;
  .menu {
    position: absolute;
    z-index: 100;
    left: 30px;
    top: 30px;
  }
  .aside {
    width: 310px;
    height: 100%;
    background-image: url("../../assets/about-bg.jpg");
    color: #fff;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    position: relative;
    .info {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -100%);
      text-align: center;
      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }
      svg {
        width: 20px;
        height: 20px;
        padding-left: 20px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
  .content {
    margin-left: 40px;
    margin-top: 5px;
    width: calc(85% - 310px);
    color: #c1866a;
    .divider {
      display: table;
      white-space: nowrap;
      margin: 16px 0;
      height: 1px;
      line-height: 1.5;
      &::before,
      &::after {
        top: 50%;
        width: 5%;
        content: "";
        display: table-cell;
        position: relative;
        border-top: 1px solid #c1866a61;
        transform: translateY(50%);
        box-sizing: border-box;
      }
      &::after {
        width: 95%;
      }
      .divider-inner-text {
        color: #c05725;
        padding: 0 10px;
      }
    }
    p {
      font-size: 15px;
      line-height: 2;
    }
    a {
      color: #1592c2;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 481px) {
  .home {
    align-content: flex-start;
    .menu {
      z-index: 100;
      left: 20px;
      top: 20px;
    }
    .aside {
      width: 100%;
      height: 287px;
      .info {
        transform: translate(-50%, -70%);
      }
    }
    .content {
      margin: 0px 15px;
      width: 100%;
    }
  }
}
</style>
