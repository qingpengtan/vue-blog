<template>
  <div class="tag-mask" v-show="isTagActive" @click="navTagClk">
    <div id="sidebar" class="sidebar">
      <div class="tags-title border-1px-b">Tags</div>
      <Tags :tags=tags style="margin-top:10px"></Tags>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Tags from "@/components/fresh/Tags.vue";
import api from "@/api/article";
export default {
  data(){
    return{
      tags: []
    }
  },
  components:{
    Tags
  },
  created() {
        api.getArticleTag().then(res => {
      this.tags = res.data;
    });
  },
  computed: {
    isTagActive() {
      return this.$store.getters.isTagActive; //需要监听的数据
    }
  },
  methods: {
    navTagClk() {
      store.dispatch("IsTagActive", !this.$store.getters.isTagActive);
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .sidebar {
    width: 65%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, 0.8);
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px;

    .tags-title {
      width: 100%;
      color: #c1866a;
      font-family: Georgia;
      line-height: 2.2;
      border-bottom: 1px solid #dfcba3;
    }
  }
}
</style>
