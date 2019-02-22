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
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    isActive() {
      return this.$store.getters.isActive; 
    }
  },
  methods: {
    navBtnClk() {
      store.dispatch("IsActive", !store.getters.isActive);
    }
  }
};
</script>


<style lang="scss" scoped>
.nav-btn {
  width: 30px;
  height: 30px;
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
</style>
