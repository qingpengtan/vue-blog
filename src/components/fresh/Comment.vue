<template>
  <div class="blog-comment" id="blog-comment">
    <div class="total" id="aaa">
      <span>最新评论：</span>
      <span class="num">{{items.length}}</span>
    </div>
    <ul>
      <li id="comment-item-1130" class="comment-item" v-for="(item,key) in items" :key="key">
        <div class="cm-avatar">
          <a target="_blank" rel="external nofollow noopener" href="http://www.timrchen.site">
            <img  :src=item.userPic>
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
          <div class="cm-content">
            {{item.comment}}            
          </div>
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
      <div class="editor"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
export default {
  props: ["id"],
  data() {
    return {
      items:[]
    };
  },
  created() {
    console.log(this.id)
    api.getCommentList({ articleId: this.$route.params.id }).then(res => {
      this.items = res.data;
    });
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
        width: 47px;
        height: 47px;
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
      padding: 8px 8px 8px 44px;
      .cm-header {
        position: relative;
        .user-name {
          font-weight: 700;
          margin-right: 0.8em;
        }
        .ua,
        .os {
          color: #999;
          font-size: 10px;
          margin-right: 10px;
        }
        .flool {
          font-weight: 900;
          font-size: 10px;
          float: right;
        }
      }
      .cm-content {
        font-size: 14px;
        line-height: 2;
        margin: 7px 0;
        word-wrap: break-word;
      }
      .cm-footer {
        display: flex;
        .create_at,
        .reply,
        .like {
          font-size: 10px;
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
        width: 43px;
        height: 43px;
        border-radius: 50%;
        background: #fff;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .editor {
      flex-grow: 1;
      height: 80px;
      border: 1px solid;
    }
  }
}

@media only screen and (max-width: 481px) {
  .blog-comment {
    .editor-box .user .gravatar {
      width: 36px;
      height: 36px;
    }
    .comment-item {
      .cm-body {
        padding-left: 35px;
      }
      .cm-avatar a {
        width: 42px;
        height: 42px;
      }
    }
  }
}
</style>
