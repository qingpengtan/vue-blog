<template>
  <div class="tag">
    <router-link
      tag="div"
      :to="{path:'/tags/'+item.articleTagId}"
      class="tag-box"
      v-for="(item,key) in tags"
      :key="key"
      :title="item.articleTag"
      :style="'background:'+getColor(item.articleTag) "
    >
      <i :style="'border-right-color:'+getColor(item.articleTag)"></i>
      {{item.articleTag}}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["tags"],
  methods: {
    getColor(value) {
      if (value == "Java") {
        return "rgb(219, 86, 64)";
      } else if (value == "Web开发") {
        return "rgb(94, 123, 167)";
      } else if (value == "NodeJS") {
        return "rgb(101, 179, 185)";
      } else if (value == "Go语言") {
        return "rgb(24, 144, 255)";
      } else if (value == "大数据") {
        return "rgb(76, 174, 76)";
      } else if (value == "Python") {
        return "rgb(120, 109, 93)";
      } else if (value == "杂谈笔录") {
        return "rgb(135, 180, 78)";
      } else {
        return "rgb(230, 188, 60)";
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.tag {
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
    cursor: pointer;
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
