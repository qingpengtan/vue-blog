<template>
  <div class="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <div class="layout">
      <div class="title">文章归档</div>
      <div class="search">
        <input type="text" placeholder="搜索你想要的文章">
        <button>search</button>
      </div>
      <div class="list-item">
        <div class="month-timeline">
          <time id="2018-5" class="timeline-t">2018-5</time>
          <ul class="time-line-items">
            <li class="timeline-item df-sb">
              <div class="timeline-text">
                <tags class="tags" :tags="[{articleTagId:1,articleTag:'精选知识'}]"></tags>
                <div class="text-title">判断3个数组的方法，请分别介绍它们之间的区别和优劣</div>
              </div>
              <div class="timeline-day">13</div>
            </li>

            <li class="timeline-item df-sb">
              <div class="timeline-text">
                <tags class="tags" :tags="[{articleTagId:1,articleTag:'精选知识'}]"></tags>
                <div class="text-title">判断3个数组的方法，请分别介绍它们之间的区别和优劣</div>
              </div>
              <div class="timeline-day">13</div>
            </li>
          </ul>
        </div>

        <div class="month-timeline">
          <time id="2018-5" class="timeline-t">2018-5</time>
          <ul class="time-line-items">
            <li class="timeline-item df-sb">
              <div class="timeline-text">
                <tags class="tags" :tags="[{articleTagId:1,articleTag:'精选知识'}]"></tags>
                <div class="text-title">判断3个数组的方法，请分别介绍它们之间的区别和优劣</div>
              </div>
              <div class="timeline-day">13</div>
            </li>

            <li class="timeline-item df-sb">
              <div class="timeline-text">
                <tags class="tags" :tags="[{articleTagId:1,articleTag:'精选知识'}]"></tags>
                <div class="text-title">判断3个数组的方法，请分别介绍它们之间的区别和优劣</div>
              </div>
              <div class="timeline-day">13</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import Tags from "@/components/fresh/Tags.vue";
export default {
  name: "archiving",
  components: {
    NavBtn,
    NavMenu,
    Tags
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
    min-height: calc(100% - 56px);
    margin: 0 auto;
    // display: flex;
    .title {
      width: 100%;
      font-size: 30px;
      text-align: center;
      letter-spacing: 5px;
      padding-top: 80px;
      color: #c1866a;
    }
    .search {
      text-align: center;
      padding: 35px 0;
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
          margin: 15px auto;
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
        }
      }
    }
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
      min-height: 100%;
      .title {
        padding-top: 60px;
        font-size: 27px;
      }
      .search {
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
  }
}
</style>
