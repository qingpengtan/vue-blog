<template>
  <div class="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <FixNav class="fix-nav"></FixNav>
    <div class="layout">
      <tags class="tags" :tags="tags"></tags>
      <div class="content">
        <article-list :List="list"></article-list>
      </div>
    </div>
    <version class="version"></version>
    <Footer class="footer"></Footer>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import FixNav from "@/components/fresh/navbar/FixNav.vue";
import Tags from "@/components/fresh/Tags.vue";
import Version from "@/components/fresh/Version.vue";
import Footer from "@/components/fresh/Footer.vue";
import ArticleList from "@/components/fresh/ArticleList.vue";
import api from "@/api/article";

export default {
  name: "home",
  components: {
    // HelloWorld
    Tags,
    NavMenu,
    NavBtn,
    Version,
    ArticleList,
    Footer,
    FixNav
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
  .menu {
    position: absolute;
    left: 30px;
    top: 30px;
  }
  .fix-nav {
    display: none;
  }

  .layout {
    width: 800px;
    margin: 0 auto;
    display: flex;
    .tags {
      margin-top: 40px;
      width: 200px;
    }
    .content {
      width: 560px;
      margin-left: 200px;
    }
  }
  .footer {
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
      .tags {
        display: none;
      }
    }
    .menu {
      display: none;
    }
    .fix-nav {
      display: block;
    }
    .footer {
      width: 100%;
    }
    .version {
      right: 10px;
    }
  }
}
</style>




