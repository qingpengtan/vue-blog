<template>
  <div class="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <div class="aside">
      <div class="info">
        <img src="../../assets/logo.png" alt>
        <div>我是一段测试代码</div>
        <br>
        <div>基本介绍</div>
      </div>
    </div>
    <div class="content">基本介绍</div>
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
    }
  }
  .content {
    margin-left: 40px;
    margin-top: 25px;
    flex: 1;
    color: #c1866a;
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
      margin: 15px;
    }
  }
}
</style>
