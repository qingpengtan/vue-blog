<template>
  <div class="article-list">
    <section class="blog-article animated fadeInDown" v-for="(item,key) in List" :key="key">
      <div class="box">
        <a href="#" target="_blank" aria-label="Github" class="github-corner github">
          <svg-icon style="width:100%;height:100%" icon-class="git"/>
        </a>

        <h2 class="hover">
          <span @click="details(item.articleId)">{{item.articleTitle}}</span>
        </h2>
        <time class="time">{{item.createTime}}</time>
        <div class="desc">
          {{item.articleBrief}}
          <span class="look-more hover">查看更多</span>
        </div>
        <div class="comment hover">
          <div class="bubble">4</div>
          <div class="reply">回复</div>
        </div>
        <tags class="tags" :tags="[{articleTag:item.articleTagName}]"></tags>
      </div>
    </section>
  </div>
</template>

<script>
import Tags from "@/components/fresh/Tags.vue";
export default {
  props: ["List"],
  components: {
    Tags
  },
  data() {
    return {
      tags: [
        { articleTag: "react" },
        { articleTag: "vue" },
        { articleTag: "vue" },
        { articleTag: "vue" },
        { articleTag: "vue" },
        { articleTag: "vue" }
      ]
    };
  },
  methods: {
    details(id) {
      this.$router.push({ path: "/detail/" + id });
    }
  }
};
</script>
<style lang="scss" scoped>
.article-list {
  width: 100%;
  padding: 0 20px;
  padding-top: 80px;
  box-sizing: border-box;
}
.blog-article {
  width: 100%;
  margin: 40px 0;
  background: #f7f8f2;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  padding: 10px;
  box-sizing: border-box;
  &:first-child {
    margin-top: 0;
  }
  .box {
    width: 100%;
    border: 1px dashed #c9c9c7;
    position: relative;
    padding: 33px 20px;
    box-sizing: border-box;
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

    h2 {
      color: #db5640;
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 10px;
      text-align: center;
      margin-top: 33px;
      font-weight: 600;
      span {
        position: relative;
        &::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 1px;
          background: #db5640;
          position: absolute;
          left: 0;
          bottom: -5px;
          animation: line-out 0.5s;
          animation-fill-mode: forwards;
        }
        &:hover::after {
          animation: line-in 0.5s;
          animation-fill-mode: forwards;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
    time {
      display: block;
      text-align: center;
      color: #b2b2ae;
      font-size: 12px;
      margin-bottom: 22px;
      line-height: 19px;
    }
    .desc {
      font-size: 14px;
      text-align: left;
      line-height: 30px;
      text-align: justify;
      .look-more {
        color: #b2b2ae;
        font-size: 12px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .comment {
    margin-top: 22px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
    .bubble {
      width: 40px;
      height: 40px;
      display: inline-block;
      line-height: 40px;
      color: #f9f9f3;
      font-weight: 600;
      background: #b2b2ae;
      border-radius: 50%;
    }
    .reply {
      color: #b2b2ae;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .tags {
    position: absolute;
    bottom: 5px;
    left: 20px;
  }
}

@media only screen and (max-width: 481px) {
  .article-list {
    padding: 80px 2% 0 2%;
  }
  .blog-article .box {
    padding: 10px;
  }
}
@keyframes line-in {
  0% {
    width: 0;
    margin-left: 50%;
  }
  100% {
    width: 100%;
    margin-left: 0;
  }
}

@keyframes line-out {
  0% {
    width: 100%;
    margin-left: 0;
  }
  100% {
    width: 0;
    margin-left: 50%;
  }
}
</style>
