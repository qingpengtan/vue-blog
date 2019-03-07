<template>
  <div class="blog-comment" id="blog-comment">
    <div class="total" id="aaa">
      <span>最新评论：</span>
      <span class="num">{{items.length}}</span>
    </div>
    <comment-list :items="items"></comment-list>
    <div class="msg-edit">
      <div style="display:flex">
        <svg-icon class="avter" icon-class="Gits"/>
        <textarea rows="3" placeholder="说点什么..." v-model="content"></textarea>
      </div>
      <button class="send" @click="sendComment">评论</button>
      <span class="login" @click="confirmLogin()">登录评论？</span>
      <span class="login" style="margin-right:6px">
        <svg-icon style="width:20px;height:20px;position:relative;top:3px" icon-class="tip"/>支持Markdown语法
      </span>
      <svg-icon class="emoji-icon" icon-class="emoji" @click.native="showEmoji"/>
      <div class="emoji" v-if="emoji">
        <weibo-emoji
          :weiboIcon="weiboIcon"
          @changeEmoji="selsctEmoji = arguments[0].phrase"
          ref="emoji"
        ></weibo-emoji>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
import swal from "sweetalert";
import CommentList from "@/components/fresh/CommentList.vue";
import icon from "@/utils/icon";
import marked from "marked";
export default {
  props: ["id"],
  data() {
    return {
      items: [],
      weiboIcon: icon,
      selsctEmoji: "",
      content: "",
      emoji: false
    };
  },
  components: {
    CommentList
  },
  created() {
    api.getCommentList({ articleId: this.$route.params.id }).then(res => {
      this.items = res.data;
    });
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
  },
  watch: {
    selsctEmoji() {
      this.content = this.content + this.selsctEmoji;
      this.emoji = false;
    }
  },
  methods: {
    sendComment() {
      if (this.content.trim() == "") {
        return;
      }
      api
        .pushComment({
          articleId: this.$route.params.id,
          comment: marked(this.content, { sanitize: true })
        })
        .then(() => {
          this.content = "";
          api.getCommentList({ articleId: this.$route.params.id }).then(res => {
            this.items = res.data;
          });
        });
    },
    confirmLogin() {
      swal("是否前往登录？", {
        buttons: {
          cancel: "取消",
          confirm: "确认"
        },
        icon: "info"
      }).then(function(isConfirm) {
        if (isConfirm) {
          window.location.href = "http://www.zhiroad.cn/blog/normal/";
        }
      });
    },
    showEmoji() {
      this.emoji = !this.emoji;
    }
  }
};
</script>


<style lang="scss" scoped>
.blog-comment {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  color: #bba477;
  .total {
    line-height: 40px;
    border-bottom: 1px dashed;
  }

  .msg-edit {
    width: 100%;
    position: relative;
    margin-top: 20px;
    .avter {
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    textarea {
      width: 100%;
      padding: 8px;
      background: rgba(187, 164, 119, 0.3);
      border: 1px solid #c1866a;
      font-size: 14px;
      color: #c1866a;
      box-sizing: border-box;
      border-radius: 5px;
    }

    .emoji-icon {
      width: 25px;
      height: 25px;
      float: left;
      margin: 6px;
      margin-top: 10px;
      margin-left: 48px;
      cursor: pointer;
    }
    .login {
      height: 30px;
      float: right;
      vertical-align: bottom;
      text-align: center;
      line-height: 48px;
      font-size: 13px!important;
      &:hover {
        color: #c1866a;
        cursor: pointer;
      }
    }
    .send {
      width: 70px;
      height: 30px;
      float: right;
      vertical-align: bottom;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      color: #fff;
      background: -webkit-linear-gradient(
        left,
        hsla(40, 33%, 60%, 0.99),
        #c1866a 100%
      );
      margin: 8px;
      margin-right: 0;
      font-size: 14px;
      cursor: pointer;
    }
    .emoji {
      position: absolute;
      background: #fff;
      left: 0;
      top: -245px;
      z-index: 10;
      /deep/ .emoji_box {
        box-shadow: 0 0 5px 0 #c1866a;
        .ej {
          height: 32px;
        }
      }
    }
  }
}

@media only screen and (max-width: 481px) {
  .blog-comment {
    .msg-edit {
      .emoji-icon {
        margin-left: 25px;
      }
      .emoji {
        top: -270px;
        /deep/ .emoji_box {
          width: 102%;
        }
      }
    }
  }
}
</style>
