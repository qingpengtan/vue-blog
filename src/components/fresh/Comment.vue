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
        <textarea rows="3" placeholder="留下足迹，文明交流..." v-model="content"></textarea>
      </div>
      <button class="send" @click="sendComment">留言</button>
      <span class="login" @click="confirmLogin()">登录回复？</span>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
import swal from "sweetalert";
import CommentList from "@/components/fresh/CommentList.vue";
export default {
  props: ["id"],
  data() {
    return {
      items: [],
      content: ""
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
  methods: {
    sendComment() {
      if (this.content.trim() == "") {
        return;
      }
      api
        .pushComment({
          articleId: this.$route.params.id,
          comment: this.content
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
    .login {
      width: 70px;
      height: 30px;
      float: right;
      vertical-align: bottom;
      text-align: center;
      line-height: 48px;
      font-size: 14px;
      font-size: 14px;
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
  }
}

@media only screen and (max-width: 481px) {
}
</style>
