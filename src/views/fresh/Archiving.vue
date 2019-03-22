<template>
  <div class="home" ref="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <div class="layout">
      <div class="title" ref="title">文章归档</div>
      <div class="search" ref="search">
        <input type="text" placeholder="搜索你想要的文章" v-model="title" @keyup.enter="search">
        <button @click="search">search</button>
      </div>
      <div class="list-item" ref="list">
        <transition-group enter-active-class="animated zoomIn">
          <div class="month-timeline" v-for="data in listItem" :key="data.time">
            <time id="2018-5" class="timeline-t">{{data.time}}</time>
            <ul class="time-line-items">
              <transition-group enter-active-class="animated slideInLeft">
                <router-link
                  tag="li"
                  :to="{ path: '/detail/'+item.articleId}"
                  class="timeline-item df-sb"
                  v-for="item in data.data"
                  :key="item.articleId"
                >
                  <div class="timeline-text">
                    <tags
                      class="tags"
                      :tags="[{articleTag:item.articleTagName,articleTagId:item.articleTag}]"
                    ></tags>
                    <div class="text-title">{{item.articleTitle}}</div>
                  </div>
                  <div class="timeline-day">{{item.createTime}}</div>
                </router-link>
              </transition-group>
              <li class="timeline-item df-sb" v-if="listItem.length == 0">
                <div class="timeline-text">
                  <div class="text-title">找不到相关文章啦 ︿(￣︶￣)︿</div>
                </div>
                <div class="timeline-day">00</div>
              </li>
            </ul>
          </div>
        </transition-group>
        <div class="month-timeline" v-if="zero">
          <ul class="time-line-items">
            <li class="timeline-item df-sb">
              <div class="timeline-text">
                <div class="text-title">找不到相关文章啦 ︿(￣︶￣)︿</div>
              </div>
              <div class="timeline-day">00</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <version class="version"></version>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import Tags from "@/components/fresh/Tags.vue";
import Version from "@/components/fresh/Version.vue";
import Footer from "@/components/fresh/Footer.vue";
import api from "@/api/article";
import { exists } from "fs";

export default {
  name: "archiving",
  data() {
    return {
      listItem: [],
      title: "",
      zero: false
    };
  },
  components: {
    NavBtn,
    NavMenu,
    Tags,
    Version,
    Footer
  },
  created() {
    document.title = "文章归档";
    this.archieveArticle({});
  },
  activated() {
    document.title = "文章归档";
  },

  mounted() {
    let $html = this.$refs.home;
    let $title = this.$refs.title;
    let $search = this.$refs.search;
    let $list = this.$refs.list;
    this.html = $html;
    $html.addEventListener("scroll", () => {
      if ($html.clientWidth > 481) {
        return;
      }
      if ($html.scrollTop > 60) {
        $search.style.position = "fixed";
        $search.style.paddingTop = "60px";
        $search.style.paddingBottom = "15px";
        $list.style.paddingTop = "180px";
        if ($title.style.position != "fixed") {
          $title.style.position = "fixed";
          $title.style.paddingTop = "20px";
        }
      } else if ($html.scrollTop > 40) {
        $title.style.position = "fixed";
        $title.style.paddingTop = "20px";
        $search.style.position = "relative";
        $search.style.paddingTop = "121px";
        $list.style.paddingTop = "0px";
      } else {
        $title.style.position = "relative";
        $title.style.paddingTop = "60px";
        $search.style.paddingTop = "35px";
        if ($search.style.position != "fixed") {
          $list.style.paddingTop = "0px";
        } else if ($search.style.position == "fixed") {
          $list.style.paddingTop = "85px";
        }
      }
    });
  },
  methods: {
    search() {
      if (this.title.trim() == "" && this.listItem.length) return;
      this.listItem = [];
      this.archieveArticle({ articleTitle: this.title });
    },
    archieveArticle(data) {
      api.archieveArticle(data).then(res => {
        res.data.map(data => {
          let existFlag = false;
          let existIndex = 0;
          for (let i = 0; i < this.listItem.length; i++) {
            if (data.createTime.indexOf(this.listItem[i].time) != -1) {
              existFlag = true;
              existIndex = i;
            }
          }
          if (existFlag) {
            data.createTime = data.createTime.substr(8, 2);
            this.listItem[existIndex]["data"].push(data);
          } else {
            let obj = [];
            obj["time"] = data.createTime.substr(0, 7);
            obj["data"] = [];
            data.createTime = data.createTime.substr(8, 2);
            obj["data"].push(data);
            this.listItem.push(obj);
          }
        });
        this.zero = !this.listItem.length;
      });
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
  .menu {
    position: absolute;
    left: 30px;
    top: 30px;
  }
  .layout {
    width: 800px;
    min-height: calc(100% - 70px);
    margin: 0 auto;
    // display: flex;
    .title {
      width: 100%;
      font-size: 30px;
      text-align: center;
      letter-spacing: 5px;
      padding-top: 80px;
      color: #c1866a;
      background: #eae4d6;
      z-index: 50;
    }
    .search {
      text-align: center;
      padding: 35px 0;
      z-index: 40;
      background: #eae4d6;
      input {
        height: 30px;
        background: hsla(40, 33%, 60%, 0.3);
        padding: 5px 10px;
        width: 60%;
        border-radius: 5px;
        color: #c1866a;
        font-size: 14px;
      }
      button {
        height: 40px;
        background: #ecbba4;
        padding: 5px 10px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        color: #c1866a;
        position: relative;
        left: -5px;
        top: 1px;
        cursor: pointer;
      }
    }
    .list-item {
      width: 100%;
      .month-timeline {
        width: 70%;
        margin: 0 auto;
        .timeline-t {
          font-family: Georgia;
          color: #c1866a;
          font-style: italic;
          font-size: 30px;
        }
        .timeline-item {
          width: 80%;
          margin: 20px auto;
          min-height: 40px;
          color: hsla(40, 33%, 60%, 1);
          background-color: #fff;
          box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
          -webkit-transition: box-shadow 0.5s;
          transition: box-shadow 0.5s;
          position: relative;
          cursor: pointer;
          .timeline-text {
            padding-left: 20px;
            line-height: 40px;
            font-size: 14px;
            .text-title {
              width: 65%;
              margin: 0 auto;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .timeline-day {
            font-family: Georgia;
            color: #c1866a;
            font-style: italic;
            font-size: 20px;
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
          &:hover {
            box-shadow: 10px 20px 35px 10px rgba(0, 0, 0, 0.15);
          }
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
    margin-bottom: 5px;
  }
}
@media only screen and (max-width: 481px) {
  .home {
    .menu {
      z-index: 100;
      left: 20px;
      top: 20px;
    }
    .layout {
      width: 100%;
      min-height: calc(100% - 100px);
      .title {
        padding-top: 60px;
        font-size: 27px;
      }
      .search {
        width: 100%;
        input {
          height: 24px;
          width: 65%;
        }
        button {
          height: 34px;
        }
      }
      .list-item {
        .month-timeline {
          width: 90%;
          .timeline-item {
            width: 100%;
            .timeline-text {
              padding-left: 10px;
              .text-title {
                padding-left: 15px;
              }
            }
          }
        }
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
