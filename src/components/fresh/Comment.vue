<template>
  <div class="blog-comment" id="blog-comment">
    <div class="total" id="aaa">
      <span>最新评论：</span>
      <span class="num">3</span>
    </div>
    <ul>
      <li id="comment-item-1130" class="comment-item">
        <div class="cm-avatar">
          <a target="_blank" rel="external nofollow noopener" href="http://www.timrchen.site">
            <img alt="timrchen" src="../../assets/logo.png">
          </a>
        </div>
        <div class="cm-body">
          <div class="cm-header">
            <span class="user-name">Timrchen</span>
            <span class="os">
              <span class="os_mac">
                <i class="iconfont icon-mac"></i>Mac OS X
              </span>
            </span>
            <span class="ua">
              <span class="ua_chrome">
                <i class="iconfont icon-chrome"></i>Chrome | 72
              </span>
            </span>
            <span class="flool">#1130</span>
          </div>
          <div class="cm-content">
            <!---->
            <p>真好</p>
          </div>
          <div class="cm-footer">
            <span class="create_at">3 天前</span>
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
      <li class="comment-item zero-item">沙发留给你....</li>
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
      top: 28px;
      a {
        display: block;
        border: 4px solid #fff;
        width: 47px;
        height: 47px;
        img {
          width: 100%;
          height: 100%;
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
          line-height: 1.5;
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
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .editor {
      flex-grow: 1;
      height: 100px;
      border: 1px solid;
    }
  }
}
</style>
