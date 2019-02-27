<template>
  <div class="blog-comment" id="blog-comment">
    <div class="total" id="aaa">
      <span>最新评论：</span>
      <span class="num">{{items.length}}</span>
    </div>
    <ul>
      <li id="comment-item-1130" class="comment-item" v-for="(item,key) in items" :key="key">
        <div class="cm-avatar">
          <a>
            <img :src="item.userPic">
          </a>
        </div>
        <div class="cm-body">
          <div class="cm-header">
            <span class="user-name">{{item.userName}}</span>
            <!-- <span class="os">
              <span class="os_mac">
                <i class="iconfont icon-mac"></i>Mac OS X
              </span>
            </span>
            <span class="ua">
              <span class="ua_chrome">
                <i class="iconfont icon-chrome"></i>Chrome | 72
              </span>
            </span>-->
            <span class="flool">#{{items.length - key}}</span>
          </div>
          <div class="cm-content">{{item.comment}}</div>
          <div class="cm-footer">
            <span class="create_at">{{item.createTime}}</span>
            <span class="reply">
              <span>回复</span>
            </span>
            <span class="like">
              <span>顶</span>
              <span>&nbsp;(0)</span>
            </span>
          </div>
        </div>
      </li>
      <li class="comment-item zero-item" v-if="items == 0">孤独的只剩下沙发....</li>
    </ul>

    <div class="editor-box">
      <div class="user">
        <div class="gravatar">
          <img alt="匿名用户" src="../../assets/logo.png">
        </div>
      </div>
      <textarea v-model="content" class="editor"></textarea>
      <button class="send" @click="sendComment">发送</button>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
export default {
  props: ["id"],
  data() {
    return {
      items: [],
      content: ""
    };
  },
  created() {
    api.getCommentList({ articleId: this.$route.params.id }).then(res => {
      this.items = res.data;
    });
  },
  methods: {
    sendComment() {
      if(this.content.trim() == ''){
        return;
      }
      api
        .pushComment({
          articleId: this.$route.params.id,
          comment: this.content
        })
        .then(() => {
          this.content = '';
          api.getCommentList({ articleId: this.$route.params.id }).then(res => {
            this.items = res.data;
          });
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
  .comment-item {
    position: relative;
    padding: 8px 0 8px 20px;
    border-bottom: 1px dashed;
    .cm-avatar {
      position: absolute;
      left: 0;
      top: 24px;
      a {
        display: block;
        width: 42px;
        height: 42px;
        background: #fff;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .cm-body {
      width: 100%;
      height: 100%;
      padding: 8px 8px 8px 36px;
      .cm-header {
        position: relative;
        .user-name {
          font-weight: 700;
          margin-right: 0.8em;
          color: #c1866a;
          font-size: 15px;
        }
        .ua,
        .os {
          color: #999;
          font-size: 11px;
          margin-right: 10px;
        }
        .flool {
          font-weight: 900;
          font-size: 11px;
          float: right;
        }
      }
      .cm-content {
        font-size: 13px;
        line-height: 2;
        margin: 7px 0;
        word-wrap: break-word;
      }
      .cm-footer {
        display: flex;
        .create_at,
        .reply,
        .like {
          font-size: 11px;
          margin-right: 11px;
        }
      }
    }
  }
  .zero-item {
    text-align: center;
    padding: 32px 0;
  }

  .editor-box {
    width: 100%;
    display: flex;
    margin: 16px 0;
    .user {
      margin-right: 14px;
      .gravatar {
        margin-bottom: 7px;
        width: 36px;
        height: 36px;
        border-radius: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
    .editor {
      flex-grow: 1;
      padding: 8px;
      background: rgba(187, 164, 119, 0.3);
      border: 1px solid #c1866a;
      font-size: 14px;
      color: #c1866a;
      border-radius: 5px;
    }

    .send {
      width: 70px;
      height: 30px;
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
      margin: 0 auto;
      margin-top: 30px;
      margin-left: 8px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 481px) {
  .blog-comment {
    .editor-box .user .gravatar {
      width: 33px;
      height: 33px;
    }
    .comment-item {
      .cm-body {
        padding-left: 32px;
      }
      .cm-avatar a {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
