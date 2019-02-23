<template>
  <div class="home">
    <NavBtn class="nav-menu"></NavBtn>
    <NavMenu></NavMenu>
    <FixNav class="fix-nav" :title="'博客详情'"></FixNav>
    <div class="layout">
      <div id="back" class="align-c hover article-back" @click="goBack()">
        <svg-icon style="width:20px;height:16px;margin-right:5px" icon-class="back"/>
        <span>Back</span>
      </div>

      <div id="article">
        <div class="article-nums">
          <span>文章阅读量:</span>
          <span>957</span>
        </div>
        <article class="article-content cf">
          <a href="#" target="_blank" aria-label="Github" class="github-corner github">
            <svg-icon style="width:100%;height:100%" icon-class="git"/>
          </a>
          <h1>{{article.articleTitle}}</h1>
          <div class="ql-snow">
            <div class="ql-editor" style="padding:0">
              <div
                id="content"
                v-html="article.content"
                v-highlight
                style="    line-height: 1.6;
    word-wrap: break-word;"
              ></div>
            </div>
          </div>
        </article>
      </div>
      <Comment></Comment>
    </div>
    <version class="version"></version>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import FixNav from "@/components/fresh/navbar/FixNav.vue";
import Tags from "@/components/fresh/Tags.vue";
import Comment from "@/components/fresh/Comment.vue";
import Version from "@/components/fresh/Version.vue";
import Footer from "@/components/fresh/Footer.vue";
import api from "@/api/article";

export default {
  name: "home",
  components: {
    // HelloWorld
    NavMenu,
    Version,
    NavBtn,
    FixNav,
    Comment,
    Footer
  },
  data() {
    return {
      article: {}
    };
  },
  created() {
    api.getDetails({ articleId: this.$route.params.id }).then(res => {
      this.article = res.data;
      document.title = res.data.articleTitle;
    });
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: hsla(40, 33%, 60%, 0.3);
  .nav-menu {
    position: absolute;
    left: 30px;
    top: 30px;
  }
  .fix-nav {
    display: none;
  }
  .layout {
    width: 900px;
    margin: 0 auto;
    #back {
      padding: 20px 0;
      color: #bba477;
      cursor: pointer;
      display: inline-block;
      &.article-back {
        margin-top: 80px;
        margin-left: 2%;
      }
    }
    #article {
      width: 96%;
      margin: 0 auto;
      max-width: 1000px;
      background: #f8f9f3;
      padding: 10px;
      .github {
        position: absolute;
        right: 0;
        top: 0;
        color: rgb(74, 183, 189);
        cursor: pointer;
        width: 80px;
        height: 80px;
        border: 0;
      }
      .article-nums {
        line-height: 40px;
        font-size: 14px;
        color: #555;
      }
      .article-content {
        padding: 30px 60px;
        border: 1px dashed #c9c9c7;
        position: relative;
        h1 {
          font-weight: 600;
          text-align: center;
        }
      }
    }
  }
  .version {
    position: absolute;
    top: 5px;
    right: 150px;
    color: #c1866a;
  }
  .footer {
    width: 800px;
    text-align: center;
    margin: 0 auto;
    line-height: 1.5;
    color: #c1866a;
    font-size: 15px;
  }
}

@media only screen and (max-width: 481px) {
  .home {
    .nav-menu {
      display: none;
    }
    .fix-nav {
      display: block;
    }
    .layout {
      width: 100%;
      #back.article-back {
        margin-top: 50px;
      }
      #article .article-content {
        padding: 10px;
        min-height: 200px;
      }
      .blog-comment {
        width: 90%;
      }
    }
    .version {
      right: 10px;
      display: none;
    }
    .footer {
      width: 100%;
    }
  }
}
</style>




