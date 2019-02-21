<template>
  <div class="tag">
    <div class="tag-box" v-for="(item,key) in tags" :key="key">
      <i></i>
      {{item.articleTag}}
    </div>
  </div>
</template>

<script>
export default {
  props: ["tags"]
};
</script>


<style lang="scss" scoped>
.tag {
  width: 200px;
  position: absolute;
  .tag-box {
    text-decoration: none;
    font-weight: 400;
    font-size: 10px;
    color: #fff;
    height: 18px;
    line-height: 18px;
    float: left;
    padding: 0 5px 0 10px;
    position: relative;
    border-radius: 0 5px 5px 0;
    margin: 10px 18px 10px 8px;
    &::before {
      content: " ";
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 7px;
      left: 2px;
    }
    &:first-child {
      background-color: rgb(219, 86, 64);
      i {
        border-right-color: rgb(219, 86, 64);
      }
    }
    &:nth-child(2) {
      background-color: rgb(94, 123, 167);
      i {
        border-right-color: rgb(94, 123, 167);
      }
    }
    &:nth-child(3) {
      background-color: rgb(183, 235, 143);
      i {
        border-right-color: rgb(183, 235, 143);
      }
    }
    &:nth-child(4) {
      background-color: rgb(24, 144, 255);
      i {
        border-right-color: rgb(24, 144, 255);
      }
    }
    &:nth-child(5) {
      background-color: rgb(76, 174, 76);
      i {
        border-right-color: rgb(76, 174, 76);
      }
    }
    &:nth-child(6) {
      background-color: rgb(120, 109, 93);
      i {
        border-right-color: rgb(120, 109, 93);
      }
    }
    &:nth-child(7) {
      background-color: rgb(230, 188, 60);
      i {
        border-right-color: rgb(230, 188, 60);
      }
    }
    &:nth-child(8) {
      background-color: rgb(135, 180, 78);
      i {
        border-right-color: rgb(135, 180, 78);
      }
    }
    &:nth-child(9) {
      background-color: rgb(101, 179, 185);
      i {
        border-right-color: rgb(101, 179, 185);
      }
    }
    &:nth-child(10) {
      background-color: rgb(134, 137, 140);
      i {
        border-right-color: rgb(134, 137, 140);
      }
    }
    i {
      position: absolute;
      right: 100%;
      font-size: 0;
      line-height: 0;
      border: 9px solid transparent;
    }
  }
}

@media only screen and (max-width: 481px) {

  
}
</style>
