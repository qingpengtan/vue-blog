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
          <span class="reply" v-if="item.userId != 1">
            <span>回复</span>
          </span>
          <!-- <span class="like">
            <span>顶</span>
            <span>&nbsp;(0)</span>
          </span> -->
        </div>
      </div>
    </li>
    <li class="comment-item zero-item" v-if="items == 0">孤独的只剩下沙发....</li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
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
