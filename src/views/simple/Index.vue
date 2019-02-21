<template>
  <div class="home">
    <NavMenu></NavMenu>
    <div class="layout">
      <tags class="tags" :tags = "tags"></tags>
      <div class="content">
        <article-list :List="list"></article-list>
      </div>
    </div>
    <version class="version"></version>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Tags from "@/components/fresh/Tags.vue";
import Version from "@/components/fresh/Version.vue";
import NavMenu from "@/components/fresh/NavMenu.vue";
import ArticleList from "@/components/fresh/ArticleList.vue";
import api from "@/api/article";

export default {
  name: "home",
  components: {
    // HelloWorld
    Tags,
    NavMenu,
    Version,
    ArticleList
  },
  data() {
    return {
      list: [],
      tags:[],
    };
  },
  created() {
    api.getArticleList().then(res => {
      this.list = res.data.articleList;
    });

    api.getArticleTag().then(res => {
      console.log(res);
      this.tags= res.data;
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: hsla(40, 33%, 60%, 0.3);
  .layout {
    width: 800px;
    margin: 0 auto;
    display: flex;
    .tags {
      margin-top: 40px;
    }
    .content {
      width: 560px;
      margin-left: 200px;
    }
  }
  .version {
    position: absolute;
    top: 5px;
    right: 150px;
    color: #c1866a;
  }
}
</style>




