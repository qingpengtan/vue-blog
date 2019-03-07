<template>
  <div class="reply-area" :data-id="item.comId" v-if="item.roleId != 4" ref="reply">
    <textarea rows="1" placeholder="说点什么..." @focus="replyF" v-model="content"></textarea>
    <svg-icon class="emoji-icon" icon-class="emoji" @click.native="showEmoji"/>
    <div class="emoji" v-if="emoji">
      <weibo-emoji
        :weiboIcon="weiboIcon"
        @changeEmoji="selsctEmoji = arguments[0].phrase"
        ref="emoji"
      ></weibo-emoji>
    </div>
    <div class="btn">
      <span class="cancel" @click="cancel">取消</span>
      <span class="confirm" @click="confirm">确认发送</span>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import icon from "@/utils/icon";
import store from "@/store";
import marked from "marked";
import api from "@/api/article";

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          comId: 1,
          roleId: 3
        };
      }
    },
    articleId: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      weiboIcon: icon,
      selsctEmoji: "",
      content: "",
      emoji: false,
      content: "",
      artId: ""
    };
  },
  watch: {
    selsctEmoji() {
      this.content = this.content + this.selsctEmoji;
      this.emoji = false;
    }
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
  methods: {
    showEmoji() {
      this.emoji = !this.emoji;
    },
    replyF(el) {
      el.target.setAttribute("rows", 3);
    },
    cancel(el) {
      let node = el.target.parentNode.parentNode;
      store.dispatch("ShowAreaId", "");
      node.firstChild.setAttribute("rows", 1);
    },
    confirm(el) {
      let node = el.target.parentNode;
      if (this.content == "") return;
      store.dispatch("ShowAreaId", "");
      this.artId =
        this.articleId == null ? this.$route.params.id : this.articleId;
      api
        .pushComment({
          parentId: this.item.comId,
          articleId: this.artId,
          comment: marked(this.content, { sanitize: true })
        })
        .then(() => {
          this.content = "";
          node.parentNode.firstChild.setAttribute("rows", 1);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.reply-area {
  margin-top: 10px;
  position: relative;
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
  .emoji-icon {
    width: 25px;
    height: 25px;
    float: left;
    margin: 2px;
    cursor: pointer;
  }

  .emoji {
    position: absolute;
    background: #fff;
    left: 45px;
    z-index: 10;
    /deep/ .emoji_box {
      box-shadow: 0 0 5px 0 #c1866a;
      .ej {
        height: 32px;
      }
    }
  }
}
@media only screen and (max-width: 481px) {
  .reply-area .emoji {
    left: -50px;
    top: 70px;
    /deep/ .emoji_box {
      width: 100%;
    }
  }
}
</style>
