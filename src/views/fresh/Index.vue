<template>
  <div class="home">
    <NavMenu class="menu"></NavMenu>
    <div class="layout">
      <tags class="tags" :tags="tags"></tags>
      <div class="content">
        <article-list :List="list"></article-list>
      </div>
    </div>
    <Footer class="footer"> </Footer>
    <version class="version"></version>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Tags from "@/components/fresh/Tags.vue";
import Version from "@/components/fresh/Version.vue";
import NavMenu from "@/components/fresh/NavMenu.vue";
import Footer from "@/components/fresh/Footer.vue";
import ArticleList from "@/components/fresh/ArticleList.vue";
import api from "@/api/article";

export default {
  name: "home",
  components: {
    // HelloWorld
    Tags,
    NavMenu,
    Version,
    ArticleList,
    Footer
  },
  data() {
    return {
      list: [],
      tags: []
    };
  },
  created() {
    api.getArticleList().then(res => {
      this.list = res.data.articleList;
    });

    api.getArticleTag().then(res => {
      this.tags = res.data;
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
  .footer{
    width: 800px;
    text-align: center;
    margin: 0 auto;
    line-height: 1.5;
    color: #c1866a;
    font-size: 15px;
  }
  .version {
    position: absolute;
    top: 5px;
    right: 150px;
    color: #c1866a;
  }
}

@media only screen and (max-width: 481px) {
  .home {
    .layout {
      width: 100%;

      .content {
        width: 100%;
        margin: 0;
      }
      .tags,{
        display: none;
      }
    }
    .menu{
      display: none;
    }
    .footer{
      width: 100%;
    }
    .version {
      right: 10px;
    }
  }
}
</style>




