<template>
  <div>
    <div class="bg" :style="'background-image:url('+currentMusic.pic+');'"></div>
    <div class="home" @click="cursorClick" ref="home">
      <NavBtn class="menu"></NavBtn>
      <NavMenu></NavMenu>
      <div class="player">
        <aplayer
          ref="player"
          :autoplay="true"
          :listFolded="true"
          :music="firstMusic"
          :theme="'#c1866a'"
          :controls="true"
          :preload="'auto'"
          :list="audio"
          :showLrc="true"
          v-if="flag"
          :volume="0.6"
          listMaxHeight="300px"
        />
      </div>
      <div class="player-cicrle">
        <div class="left">
          <svg-icon class="icon" icon-class="left" @click.native="leftMusic()"/>
        </div>
        <div class="center">
          <div class="title">
            {{currentMusic.title}}
            <br>
            <br>
            {{duration.current}} / {{duration.duration}}
          </div>
          <div class="circle" ref="circle" :style="'background-image:url('+currentMusic.pic+')'">
            <div class="daughter"></div>
          </div>
          <transition name="slide-fade">
            <svg-icon
              class="icon"
              icon-class="start"
              v-show="!isPlay"
              @click.native.stop="playMusic()"
            />
          </transition>
          <transition name="slide-fade">
            <svg-icon
              class="icon"
              icon-class="pause"
              v-show="isPlay"
              @click.native.stop="playMusic()"
            />
          </transition>
          <div class="lrc-text">{{lrc}}</div>
        </div>
        <div class="right">
          <svg-icon class="icon" icon-class="right" @click.native="rightMusic()"/>
        </div>
      </div>
      <Footer style="display:none"></Footer>
      <span ref="cursor">
        <span ref="curtxt"></span>
        <!-- <svg-icon style="width:18px;height:18px;margin-left:5px;" icon-class="musict"/> -->
      </span>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
import moment from "moment";
import Aplayer from "vue-aplayer";
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import Footer from "@/components/fresh/Footer.vue";
import { clearInterval, setTimeout } from "timers";
import { debug } from "util";
export default {
  name: "music",
  components: {
    NavBtn,
    NavMenu,
    Aplayer,
    Footer
  },
  data() {
    return {
      audio: [],
      flag: false,
      isPlay: false,
      aplayers: "",
      duration: {
        duration: "00 : 00",
        current: "00 : 00"
      },
      lrc: "聆听美好音乐~",
      firstMusic: {},
      index: "0",
      isPaused: false,
      tip: [
        "富强",
        "民主",
        "文明",
        "和谐",
        "自由",
        "平等",
        "公正",
        "法治",
        "爱国",
        "敬业",
        "诚信",
        "友善"
      ],
      count: 0,
      currentMusic: {
        title: "聆听美好音乐~",
        pic:
          "http://119.29.230.48/upload/image/2019317&6a9db24551fe4b70b7e286b5fc45d2ae.jpg"
      },
      cursorSpan: "",
      curtxt: ""
    };
  },
  activated() {
    document.title = this.currentMusic.title;
    this.index = window.location.href.split("#")[1];
  },
  mounted() {
    Aplayer.disableVersionBadge = true;
    document.title = this.currentMusic.title;
    this.index = window.location.href.split("#")[1];
    this.$refs.circle.style.animationPlayState = "paused";
    api
      .getMusic()
      .then(res => {
        for (let music of res.data) {
          let tempMusic = {};
          if (music.musicName.indexOf(".mp3") == -1) {
            tempMusic["title"] = music.musicName;
          } else {
            tempMusic["title"] = music.musicName.substring(
              0,
              music.musicName.length - 4
            );
          }
          tempMusic["artist"] = " ";
          tempMusic["src"] = music.musicUrl;
          tempMusic["pic"] =
            music.musicPic ||
            "http://119.29.230.48/upload/image/2019317&6a9db24551fe4b70b7e286b5fc45d2ae.jpg";
          tempMusic["lrc"] = music.musicLrc || "[00:00.00]暂无歌词";
          tempMusic["theme"] = "pic";
          this.audio.unshift(tempMusic);
        }
        if (
          isNaN(parseInt(this.index)) ||
          this.audio.length <= parseInt(this.index)
        ) {
          this.firstMusic = this.audio[
            parseInt(Math.random() * this.audio.length)
          ];
        } else {
          this.firstMusic = this.audio[parseInt(this.index)];
        }

        this.flag = true;
      })
      .then(() => {
        this.aplayers = this.$refs.player;
        let audioP = this.aplayers.audio;
        this.aplayers.shouldShuffle = true;
        audioP.addEventListener("play", () => {
          // console.log("开始播放");
          window.location.hash = this.aplayers.playIndex;
          this.isPlay = true;
          this.currentMusic = this.aplayers.currentMusic;
          document.title = this.currentMusic.title;
          this.$refs.circle.style.animationPlayState = "paused"; //上下一首音乐的时候先暂停动画
          if (this.isPaused) {
            this.$refs.circle.style.animationPlayState = "running";
            this.isPaused = false;
          }
          // console.log(this.aplayers);
          this.intervalTime();
        });
        audioP.addEventListener("pause", () => {
          this.isPlay = false;
          this.isPaused = true;
          this.$refs.circle.style.animationPlayState = "paused";
        });
        audioP.oncanplay = () => {
          // console.log("可以播放");
          let time = moment.duration(audioP.duration, "seconds");
          if (this.isPlay) {
            this.$refs.circle.style.animationPlayState = "running";
          }
          this.duration.duration =
            "0" +
            Math.floor(
              moment.duration(time.asMilliseconds(), "milliseconds").asMinutes()
            ) +
            " : " +
            moment(time.asMilliseconds()).format("ss");
          this.intervalTime();
        };
        audioP.addEventListener("ended", () => {
          // this.$refs.circle.style.animationFillMode = "rotate(0deg)";
          if (this.aplayers.repeatMode != "no-repeat") {
            this.aplayers.shouldShuffle = false;
          }
          if (this.aplayers.shouldShuffle) {
            this.aplayers.onSelectSong(
              this.audio[parseInt(Math.random() * this.audio.length)]
            );
          } else {
            if (this.aplayers.playIndex == 0) {
              this.aplayers.onSelectSong(this.audio[0]);
            }
          }
          this.isPaused = false;
          // console.log("结束播放");
        });
      });
  },
  methods: {
    leftMusic() {
      if (this.aplayers.repeatMode != "no-repeat") {
        this.aplayers.shouldShuffle = false;
      }
      if (this.aplayers.shouldShuffle) {
        this.aplayers.onSelectSong(
          this.audio[parseInt(Math.random() * this.audio.length)]
        );
      } else {
        if (this.aplayers.playIndex == 0) {
          this.aplayers.onSelectSong(this.audio[this.audio.length - 1]);
        } else {
          this.aplayers.onSelectSong(this.audio[this.aplayers.playIndex - 1]);
        }
      }
    },
    rightMusic() {
      if (this.aplayers.repeatMode != "no-repeat") {
        this.aplayers.shouldShuffle = false;
      }
      if (this.aplayers.shouldShuffle) {
        this.aplayers.onSelectSong(
          this.audio[parseInt(Math.random() * this.audio.length)]
        );
      } else {
        if (this.aplayers.playIndex + 1 == this.audio.length) {
          this.aplayers.onSelectSong(this.audio[0]);
        } else {
          this.aplayers.onSelectSong(this.audio[this.aplayers.playIndex + 1]);
        }
      }
    },
    playMusic() {
      this.isPlay = !this.isPlay;
      this.isPlay ? this.aplayers.play() : this.aplayers.pause();
    },
    intervalTime() {
      let audioP = this.aplayers.audio;
      let timer = null;
      window.clearInterval(timer);
      timer = setInterval(() => {
        if (!this.isPlay) {
          window.clearInterval(timer);
        }
        let t = moment.duration(audioP.currentTime, "seconds");
        this.duration.current =
          "0" +
          Math.floor(
            moment.duration(t.asMilliseconds(), "milliseconds").asMinutes()
          ) +
          " : " +
          moment(t.asMilliseconds()).format("ss");
        if (document.querySelector(".aplayer-lrc-current")) {
          let lrcText = document.querySelector(".aplayer-lrc-current")
            .innerText;
          if (lrcText) {
            this.lrc = lrcText;
          }
        }
      }, 1000);
    },
    cursorClick(ev) {
      if (!this.cursorSpan) {
        this.cursorSpan = this.$refs.cursor;
        this.curtxt = this.$refs.curtxt;
      }
      this.cursorSpan.style.transition = "none";
      this.cursorSpan.style.opacity = 1;
      this.cursorSpan.style.marginTop = "0px";
      this.cursorSpan.style.position = "absolute";
      this.cursorSpan.style.top = ev.clientY + "px";
      this.cursorSpan.style.left = ev.clientX + "px";
      this.cursorSpan.style.fontSize = "18px";
      this.cursorSpan.style.color = this.getColor();
      this.curtxt.innerText = this.tip[this.count];
      this.cursorSpan.style.fontWeight = "600";
      this.count++;
      if (this.count >= 12) {
        this.count = 0;
      }
      setTimeout(() => {
        this.cursorSpan.style.transition = "all .5s";
        this.cursorSpan.style.marginTop = "-100px";
      }, 100);
      setTimeout(() => {
        this.cursorSpan.style.opacity = 0;
      }, 500);
    },
    getColor() {
      let str = "0123456789abcdef";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += str[parseInt(Math.random() * str.length)];
      }
      return color;
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}
.home {
  width: 100%;
  height: 100%;
  background: hsla(0, 3%, 0%, 0.3);
  color: rgba(250, 250, 250, 0.3);
  right: 15px !important;
  cursor: url(http://119.29.230.48/upload/image/2019328&0bd3ca9b5c624b92aa82f647b0d0ef56.png)
      5 5,
    default;
  .menu {
    position: absolute;
    z-index: 100;
    left: 30px;
    top: 30px;
    /deep/ ul {
      li {
        background: rgba(250, 250, 250, 1);
      }
    }
  }
  .player {
    width: 360px;
    position: absolute;
    bottom: 10px;
    left: 5px;
    z-index: 100;
    /deep/ .aplayer-list li {
      cursor: url(http://119.29.230.48/upload/image/2019325&8de5d67bad2c46029338487e202c4db0.png)
          5 5,
        pointer;
    }
  }
  .player-cicrle {
    width: 60%;
    min-width: 800px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    .left,
    .right {
      position: relative;
      flex: 1;
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        width: 40px;
        transition: width 0.5s;
        &:hover {
          width: 50px;
        }
      }
    }
    .center {
      position: relative;
      flex: 4;
      .title {
        width: 100%;
        text-align: center;
        margin-top: 80px;
      }
      .circle {
        position: absolute;
        width: 60%;
        top: 50%;
        left: 50%;
        background-size: 100% !important;
        animation: rotate 7s linear infinite;
        border-radius: 50%;
        background-color: rgba(250, 250, 250, 0.3);
        box-shadow: 0 0 10px 0px #fff;
        .daughter {
          width: 100%;
          height: 0;
          padding-top: 100%;
        }
      }
      .lrc-text {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 80%;
        transform: translate(-50%, 50%);
        text-align: center;
        font-size: 24px;
        line-height: 1.5;
      }
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        width: 40px;
        transition: width 0.5s;
        &:hover {
          width: 50px;
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
    .player {
      width: calc(100% - 10px);
    }
    .player-cicrle {
      width: 100%;
      min-width: 100%;
      .left,
      .right {
        .icon {
          transform: translate(-50%, -130%);
        }
      }
      .center {
        .icon {
          transform: translate(-50%, -130%);
        }
        .circle {
          width: 80%;
          animation: rotate2 7s linear infinite;
        }
        .lrc-text {
          top: 70%;
          font-size: 16px;
        }
      }
    }
  }
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(359deg);
  }
}

@keyframes rotate2 {
  from {
    transform: translate(-50%, -90%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -90%) rotate(359deg);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease !important;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1) !important;
}
.slide-fade-enter,
.slide-fade-leave-to {
  margin-top: -100px;
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave {
  margin-top: 0;
  opacity: 1;
}
</style>
