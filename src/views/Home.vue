<template>
  <div class="home">
    <div style="position:relative;width:100%;height:20px">
      <svg-icon style="width:20px;height:16px;position:absolute;right:0" icon-class="close"/>
    </div>
    <div style="width:93%">欢迎您，127.0.0.1大牛，今天是2019年4月13日 己亥(猪)年 三月初九 星期六</div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss" scoped>
.home {
  width: 240px;
  padding: 5px 5px 5px 10px;
  background: hsla(40, 33%, 60%, 0.3);
  line-height: 1.5;
  color: #c1866a;
  font-size: 14px;
  letter-spacing: 1px;
  box-shadow: 0 0 5px 0;
  position: fixed;
  right: 15px;
  bottom: 120px;
}
</style>
