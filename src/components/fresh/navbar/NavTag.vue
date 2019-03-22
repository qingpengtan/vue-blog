<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration='500'>
    <div class="tag-mask" v-show="isTagActive" @click="navTagClk">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" >
        <div id="sidebar" class="sidebar" v-show="isTagActive">
          <div class="tags-title border-1px-b">Tags</div>
          <Tags :tags="tags" style="margin-top:10px"></Tags>
          <version class="vers"></version>
          <Footer class="footer" :show="false"></Footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import store from "@/store";
import Tags from "@/components/fresh/Tags.vue";
import api from "@/api/article";
import Version from "@/components/fresh/Version.vue";
import Footer from "@/components/fresh/Footer.vue";
export default {
  data() {
    return {
      tags: []
    };
  },
  components: {
    Tags,
    Footer,
    Version
  },
  created() {
    api.getArticleTag().then(res => {
      this.tags = res.data;
    });
  },
  computed: {
    isTagActive() {
      return this.$store.getters.isTagActive; //需要监听的数据
    }
  },
  methods: {
    navTagClk() {
      store.dispatch("IsTagActive", !this.$store.getters.isTagActive);
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9991;

  .sidebar {
    width: 65%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, 0.8);
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px;

    .tags-title {
      width: 100%;
      color: #c1866a;
      font-family: Georgia;
      line-height: 2.2;
      border-bottom: 1px solid #dfcba3;
    }

    .vers {
      position: absolute;
      bottom: 10px;
      line-height: 1.5;
      color: #c1866a;
    }
    .footer {
      position: absolute;
      bottom: 70px;
      padding: 0 10px;
      text-align: left;
      margin: 0 auto;
      line-height: 1.5;
      color: #c1866a;
      font-size: 13px;
    }
  }
}
</style>
