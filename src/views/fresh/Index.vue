<template>
  <div class="home" ref="home">
    <NavBtn class="menu"></NavBtn>
    <NavMenu></NavMenu>
    <FixNav class="fix-nav" :title="'博客列表'"></FixNav>
    <div class="layout">
      <tags class="tags" :tags="tags"></tags>
      <div class="content" ref="content">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <article-list :List="list" :end="end"></article-list>
        </mescroll-vue>
      </div>
    </div>
    <!-- <version class="version"></version> -->
    <Footer class="footer"></Footer>
    <back-top v-if="toTop" :html="html"></back-top>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import FixNav from "@/components/fresh/navbar/FixNav.vue";
import Tags from "@/components/fresh/Tags.vue";
import Version from "@/components/fresh/Version.vue";
import Footer from "@/components/fresh/Footer.vue";
import BackTop from "@/components/fresh/BackTop.vue";
import ArticleList from "@/components/fresh/ArticleList.vue";
import api from "@/api/article";
import MescrollVue from "mescroll.js/mescroll.vue";
import store from "@/store";

export default {
  name: "home",
  components: {
    // HelloWorld
    Tags,
    NavMenu,
    NavBtn,
    Version,
    ArticleList,
    Footer,
    MescrollVue,
    FixNav,
    BackTop
  },
  data() {
    return {
      toTop: false,
      end: false,
      html: "",
      page: 0,
      isLoading: true,
      timer: null,
      list: [],
      tags: [],
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        use: false
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        htmlNodata: '<p class="upwarp-nodata">-- THE END --</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        toTop: {
          //回到顶部按钮
          src: require("../../assets/to-top.png"), //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          // warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      }
    };
  },
  mounted() {
    let $html = this.$refs.home;
    this.html = $html;
    $html.addEventListener("scroll", () => {
      store.dispatch("IndexScroll", $html.scrollTop);
      if ($html.scrollTop > 1000) {
        this.toTop = true;
      } else {
        this.toTop = false;
      }
      if (
        this.$refs.content.clientHeight - $html.clientHeight - 50 <
          $html.scrollTop &&
        this.isLoading
      ) {
        this.isLoading = false;
        this.page = this.page + 1;
        // 联网请求
        api.getArticleList({ page: this.page }).then(res => {
          let arr = res.data.articleList;
          this.end = res.data.current >= res.data.totalPage ? true : false;
          // 如果是第一页需手动制空列表
          if (this.page.num === 1) this.list = [];
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
        });
      } else if (
        !this.isLoading &&
        this.$refs.content.clientHeight - $html.clientHeight - 50 >
          $html.scrollTop
      ) {
        this.isLoading = true;
      }
    });
  },
  created() {
    // api.getArticleList().then(res => {
    //   this.list = res.data.articleList;
    // });
    api.getArticleTag().then(res => {
      this.tags = res.data;
    });
    document.title = "ZHIROAD";
  },
  activated() {
    let $html = this.$refs.home;
    $html.scrollTop = store.getters.indexScroll;
    document.title = "ZHIROAD";
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      this.page = this.page + 1;
      // 联网请求
      api.getArticleList({ page: this.page }).then(res => {
        let arr = res.data.articleList;
        // 如果是第一页需手动制空列表
        if (this.page.num === 1) this.list = [];
        // 把请求到的数据添加到列表
        this.list = this.list.concat(arr);
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(arr.length);
        });
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // if (to.path.indexOf("detail") != -1) {
    //   from.meta.keepAlive = true;
    // } else {
    //   from.meta.keepAlive = false;
    //   this.$destroy();
    // }
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
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
  .fix-nav {
    display: none;
  }

  .layout {
    width: 800px;
    min-height: calc(100% - 56px);
    margin: 0 auto;
    display: flex;
    .tags {
      margin-top: 40px;
      width: 200px;
    }
    .content {
      width: 560px;
      margin-left: 200px;
      /deep/ .mescroll {
        &::-webkit-scrollbar {
          display: none;
        }
        .mescroll-upwarp {
          display: none !important;
        }
      }
    }
  }
  .footer {
    width: 800px;
    text-align: center;
    margin: 0 auto;
    line-height: 1.5;
    color: #c1866a;
    font-size: 15px;
  }
  .version {
    position: absolute;
    top: 5px;
    right: 150px;
    color: #c1866a;
  }
}

@media only screen and (max-width: 481px) {
  .home {
    .layout {
      width: 100%;
      min-height: calc(100% - 70px);
      .content {
        width: 100%;
        margin: 0;
        .mescroll {
          position: fixed;
          top: 0;
          bottom: 0;
          height: auto;
          /deep/ .mescroll-upwarp {
            display: block !important;
          }
        }
      }
      .tags {
        display: none;
      }
    }
    .menu {
      display: none;
    }
    .fix-nav {
      display: block;
    }
    .footer {
      width: 100%;
      display: none;
    }
    .version {
      right: 10px;
      display: none;
    }
  }
}
</style>




