<template>
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
          <span class="create_at">{{item.createTime | filterTime}}</span>
          <span class="reply" v-if="item.roleId != 4" @click="showReply">
            <span>回复</span>
          </span>
          <!-- <span class="like">
            <span>顶</span>
            <span>&nbsp;(0)</span>
          </span>-->
        </div>
        <div class="reply-area" :data-id="item.comId" v-if="item.roleId != 4" ref="reply">
          <textarea rows="1" placeholder="留下足迹，文明交流..." @focus="replyF"></textarea>
          <div class="btn">
            <span class="cancel" @click="cancel">取消</span>
            <span class="confirm" @click="confirm">确认发送</span>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </li>
    <li class="comment-item zero-item" v-if="items == 0">孤独的只剩下沙发....</li>
  </ul>
</template>

<script>
import api from "@/api/article";
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    articleId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      artId: ""
    };
  },
  methods: {
    showReply(el) {
      el.target.parentNode.parentNode.nextSibling.style.display = "block";
    },
    replyF(el) {
      el.target.setAttribute("rows", 3);
    },
    cancel(el) {
      let node = el.target.parentNode.parentNode;
      node.style.display = "none";
      node.firstChild.setAttribute("rows", 1);
    },
    confirm(el) {
      let node = el.target.parentNode;
      let sib = node.previousSibling;
      if (sib.value == "") return;
      node.parentNode.style.display = "none";
      this.artId =
        this.articleId == null ? this.$route.params.id : this.articleId;
      // api
      //   .pushComment({
      //     parentId: node.parentNode.getAttribute("data-id"),
      //     articleId: this.artId,
      //     comment: sib.value
      //   })
      //   .then(() => {
      sib.value = "";
      node.parentNode.firstChild.setAttribute("rows", 1);
      // api.getCommentList({ articleId: this.$route.params.id }).then(res => {
      //   this.items = res.data;
      // });
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
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
        cursor: pointer;
      }
    }
    .reply-area {
      margin-top: 10px;
      display: none;
      textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #c1866a;
        font-size: 14px;
        color: #c1866a;
        box-sizing: border-box;
        border-radius: 5px;
      }
      .btn {
        float: right;
        font-size: 13px;
        padding-top: 5px;
        span {
          margin-left: 10px;
          cursor: pointer;
          &.cancel {
            color: #999;
          }
          &:hover {
            color: #bd5625;
          }
        }
      }
    }
  }
}
.zero-item {
  text-align: center;
  padding: 32px 0;
}
@media only screen and (max-width: 481px) {
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
</style>
