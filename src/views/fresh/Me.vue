<template>
  <div class="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <div class="aside">
      <div class="info">
        <img src="http://119.29.230.48/upload/image/youke.jpg" alt>
        <div style="margin:15px">作为菜鸟我也不知道该说些什么...</div>
        <div class="icon">
          <a href="https://github.com/qingpengtan" target="_blank" title="GitHub">
            <svg-icon style="color:white;padding:0 6px" icon-class="Gits"/>
          </a>
          <a href="https://juejin.im/user/5b441dbbe51d45194908fa94" target="_blank" title="juejin">
            <svg-icon style="color:white;padding:0 6px" icon-class="juejin"/>
          </a>
          <a href="mailto:tang1994year@163.com" title="email">
            <svg-icon style="color:white;padding:0 6px" icon-class="email"/>
          </a>
          <a href="https://segmentfault.com/u/tangqp" target="_blank" title="segmentfault">
            <svg-icon style="color:white;padding:0 6px" icon-class="sf"/>
          </a>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="divider">
        <span class="divider-inner-text">博客简述</span>
      </div>
      <p>
        UI设计：借鉴他人
        <br>相关技术：Vue-Cli3 + Vue2.5 + Spring-Boot + Mysql
        <br>源码地址：
        <a href="https://github.com/qingpengtan/vue-blog" target="_blank">github</a>
      </p>
      <div class="divider">
        <span class="divider-inner-text">关于我</span>
      </div>

      <ul class="tecno">
        <li>
          姓名：唐
          <a href="http://www.zhiroad.cn/detail/137" v-if="jianli">（简历）</a>
        </li>
        <li>学历：本科</li>
        <li>
          联系方式：
          <a href="mailto:tang1994year@163.com">
            <svg-icon style="width:20px;height:20px;position:relative;top:3px" icon-class="email"/>tang1994year@163.com
          </a>
        </li>
        <li>坐标：福建</li>
        <li>技能：</li>
        <li>
          <ul class="child">
            <li>
              JavaScript
              <span class="star">
                <input type="radio" name="item01" id="item01" disabled>
                <label class="star-item" for="item01"></label>
                <input type="radio" name="item01" id="item02" disabled>
                <label class="star-item" for="item02"></label>
                <input type="radio" name="item01" id="item03" disabled checked>
                <label class="star-item" for="item03"></label>
                <input type="radio" name="item01" id="item04" disabled>
                <label class="star-item" for="item04"></label>
                <input type="radio" name="item01" id="item05" disabled>
                <label class="star-item" for="item05"></label>
              </span>
            </li>
            <li>
              Vue
              <span class="star">
                <input type="radio" name="item02" id="item01" disabled>
                <!--这里设置checked初始状态-->
                <label class="star-item" for="item01"></label>
                <input type="radio" name="item02" id="item02" disabled>
                <label class="star-item" for="item02"></label>
                <input type="radio" name="item02" id="item03" disabled checked>
                <label class="star-item" for="item03"></label>
                <input type="radio" name="item02" id="item04" disabled>
                <label class="star-item" for="item04"></label>
                <input type="radio" name="item02" id="item05" disabled>
                <label class="star-item" for="item05"></label>
              </span>
            </li>
            <li>
              SQL
              <span class="star">
                <input type="radio" name="item03" id="item01" disabled>
                <!--这里设置checked初始状态-->
                <label class="star-item" for="item01"></label>
                <input type="radio" name="item03" id="item02" disabled checked>
                <label class="star-item" for="item02"></label>
                <input type="radio" name="item03" id="item03" disabled>
                <label class="star-item" for="item03"></label>
                <input type="radio" name="item03" id="item04" disabled>
                <label class="star-item" for="item04"></label>
                <input type="radio" name="item03" id="item05" disabled>
                <label class="star-item" for="item05"></label>
              </span>
            </li>
            <li>
              Java
              <span class="star">
                <input type="radio" name="item04" id="item01" disabled>
                <!--这里设置checked初始状态-->
                <label class="star-item" for="item01"></label>
                <input type="radio" name="item04" id="item02" disabled checked>
                <label class="star-item" for="item02"></label>
                <input type="radio" name="item04" id="item03" disabled>
                <label class="star-item" for="item03"></label>
                <input type="radio" name="item04" id="item04" disabled>
                <label class="star-item" for="item04"></label>
                <input type="radio" name="item04" id="item05" disabled>
                <label class="star-item" for="item05"></label>
              </span>
            </li>
          </ul>
        </li>
      </ul>

      <div class="msgs">
        <a>{{items.length}}</a>&nbsp;条留言
      </div>
      <div class="msg-edit">
        <div style="display:flex">
          <svg-icon class="avatar" icon-class="Gits"/>
          <textarea rows="5" placeholder="说点什么...（支持Markdown语法）" v-model="content"></textarea>
        </div>
        <button class="send" @click="send">留言</button>
        <svg-icon class="emoji-icon" icon-class="emoji" @click.native="showEmoji"/>
        <span class="login" v-if="!isLogin" @click="confirmLogin()">登录留言？</span>
        <!-- <span class="login" style="margin-right:15px">
          <svg-icon style="width:20px;height:20px;position:relative;top:3px" icon-class="tip"/>支持Markdown
        </span>-->
        <div class="emoji" v-if="emoji">
          <weibo-emoji
            :weiboIcon="weiboIcon"
            @changeEmoji="selsctEmoji = arguments[0].phrase"
            ref="emoji"
          ></weibo-emoji>
        </div>
        <div class="comment-area">
          <comment-list :items="items" :articleId="'1'"></comment-list>
        </div>
      </div>
    </div>
    <Footer style="display:none"></Footer>
  </div>
</template>

<script>
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import CommentList from "@/components/fresh/CommentList.vue";
import Footer from "@/components/fresh/Footer.vue";
import swal from "sweetalert";
import marked from "marked";
import api from "@/api/article";
import icon from "@/utils/icon";
export default {
  name: "me",
  data() {
    return {
      content: "",
      items: [],
      weiboIcon: icon,
      jianli: false,
      isLogin: localStorage.getItem("x_token"),
      emoji: false,
      selsctEmoji: ""
    };
  },
  components: {
    NavBtn,
    NavMenu,
    CommentList,
    Footer
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
  created() {
    document.title = "我的";
    if (this.$route.query.jianli != undefined) {
      this.jianli = true;
    }
    api.getCommentList({ articleId: 1 }).then(res => {
      this.items = res.data;
    });
  },
  activated() {
    document.title = "我的";
  },
  watch: {
    selsctEmoji() {
      this.content = this.content + this.selsctEmoji;
      this.emoji = false;
    }
  },
  methods: {
    send() {
      if (this.content.trim() == "") {
        return;
      }
      api
        .pushComment({
          articleId: 1,
          comment: marked(this.content, { sanitize: true })
        })
        .then(() => {
          this.content = "";
          api.getCommentList({ articleId: 1 }).then(res => {
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
.home {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: hsla(40, 33%, 60%, 0.3);
  display: flex;
  flex-wrap: wrap;
  .menu {
    position: absolute;
    z-index: 100;
    left: 30px;
    top: 30px;
  }
  .aside {
    width: 310px;
    height: 100%;
    background-image: url("../../assets/about-bg.jpg");
    color: #fff;
    background-repeat: no-repeat;
    background-position: 82%;
    background-size: cover;
    position: fixed;
    .info {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -90%);
      text-align: center;
      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }
      svg {
        width: 20px;
        height: 20px;
        padding-left: 20px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
  .content {
    position: relative;
    left: 350px;
    background: rgba(255,255,255,0.75);
    margin-top: 20px;
    padding: 30px 20px;
    width: 830px;
    border-radius: 10px;
    color: #c1866a;
    .divider {
      display: table;
      white-space: nowrap;
      margin: 16px 0;
      height: 1px;
      line-height: 1.5;
      &::before,
      &::after {
        top: 50%;
        width: 5%;
        content: "";
        display: table-cell;
        position: relative;
        border-top: 1px solid #c1866a61;
        transform: translateY(50%);
        box-sizing: border-box;
      }
      &::after {
        width: 95%;
      }
      .divider-inner-text {
        color: #c05725;
        padding: 0 10px;
      }
    }

    p,
    .tecno {
      font-size: 15px;
      line-height: 2;
      li {
        width: 100%;
        word-break: break-all;
        .star {
          display: inline-block;
          font-size: 0;
          position: relative;
          top: 5px;
          left: 20px;
        }
        .child {
          padding-left: 15px;
          li {
            list-style-type: disc;
          }
        }
        .star-item {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 4px;
          cursor: pointer;
          background: url("../../assets/star.png") center top no-repeat;
        }
        input[type="radio"] {
          position: absolute;
          clip: rect(0, 0, 0, 0);
        }
        input[type="radio"]:checked + .star-item ~ .star-item {
          background-position: center bottom;
        }

        .star-item:after {
          position: absolute;
          width: 100px;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          right: 0;
          margin-right: -105px;
          color: #666;
        }
      }
    }
    .msgs {
      padding: 20px 0 10px 10px;
      border-bottom: 1px solid #c1866a61;
    }
    .msg-edit {
      width: 100%;
      margin-top: 20px;
      position: relative;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #c1866a;
        font-size: 14px;
        color: #c1866a;
        box-sizing: border-box;
        border-radius: 5px;
      }
      .emoji-icon {
        width: 27px;
        height: 27px;
        float: left;
        margin: 8px;
        margin-left: 60px;
        cursor: pointer;
      }
      .login {
        height: 30px;
        float: right;
        vertical-align: bottom;
        text-align: center;
        line-height: 48px;
        font-size: 13px !important;
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
    .emoji {
      position: absolute;
      background: #fff;
      margin-left: 95px;
      margin-top: 8px;
      z-index: 10;
      /deep/ .emoji_box {
        box-shadow: 0 0 5px 0 #c1866a;
        .ej {
          height: 32px;
        }
      }
    }
    .comment-area {
      margin: 0 50px;
      clear: both;
    }
    a {
      color: #1592c2;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 481px) {
  .home {
    align-content: flex-start;
    .menu {
      z-index: 100;
      left: 20px;
      top: 20px;
    }
    .aside {
      width: 100%;
      height: 287px;
      position: relative;
      .info {
        transform: translate(-50%, -50%);
      }
    }
    .content {
      margin: 0;
      left: 0px;
      padding: 12px;
      width: 100%;
      border-radius: 0px;
      .msg-edit {
        .emoji-icon {
          margin-left: 45px;
        }
        .emoji {
          margin: 0;
          margin-top: 50px;
          /deep/ .emoji_box {
            width: 100%;
          }
        }
        .avatar {
          margin-right: 4px;
          width: 45px;
          height: 45px;
        }
      }
      .comment-area {
        margin: 0;
        /deep/ .zero-item {
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
