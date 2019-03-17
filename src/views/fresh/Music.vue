<template>
  <div class="home">
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
        <svg-icon class="icon" icon-class="left" @click.native="left"/>
      </div>
      <div class="center">
        <div class="title">
          {{currentMusic.title}}
          <br>
          <br>
          {{duration.current}} / {{duration.duration}}
        </div>
        <div class="circle" ref="circle" :style="'background:url('+currentMusic.pic+')'">
          <div class="daughter"></div>
        </div>
        <svg-icon class="icon" icon-class="start" v-show="!isPlay" @click.native="play"/>
        <svg-icon class="icon" icon-class="pause" v-show="isPlay" @click.native="play"/>
      </div>
      <div class="right">
        <svg-icon class="icon" icon-class="right" @click.native="right"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
import moment from "moment";
import Aplayer from "vue-aplayer";
import NavBtn from "@/components/fresh/navbar/NavBtn.vue";
import NavMenu from "@/components/fresh/navbar/NavMenu.vue";
import { clearInterval } from "timers";
import { debug } from "util";
export default {
  components: {
    NavBtn,
    NavMenu,
    Aplayer
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
      firstMusic: {},
      index: "0",
      isPaused: false,
      currentMusic: {
        title: "聆听美好音乐~",
        pic: "http://119.29.230.48/upload/image/youke.jpg"
      }
    };
  },
  activated() {
    document.title = "Music ~ " + this.currentMusic.title;
    this.index = window.location.href.split("#")[1];
  },
  mounted() {
    Aplayer.disableVersionBadge = true;
    document.title = "Music ~ " + this.currentMusic.title;
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
            music.musicPic || "http://119.29.230.48/upload/image/2019317&6a9db24551fe4b70b7e286b5fc45d2ae.jpg";
          tempMusic["lrc"] = "[00:00.00]暂无歌词";
          this.audio.push(tempMusic);
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
        audioP.addEventListener("play", () => {
          console.log("开始播放");
          window.location.hash = this.aplayers.playIndex;
          this.isPlay = true;
          this.currentMusic = this.aplayers.currentMusic;
          document.title = "Music ~ " + this.currentMusic.title;
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
          console.log("可以播放");
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
          // this.$refs.circle.style.transform = "rotate(0deg)";
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
          console.log("结束播放");
        });
      });
  },
  methods: {
    left() {
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
    right() {
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
    play() {
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
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: hsla(40, 33%, 60%, 0.3);
  color: hsla(40, 33%, 60%, 0.3);
  .menu {
    position: absolute;
    z-index: 100;
    left: 30px;
    top: 30px;
  }
  .player {
    width: 360px;
    position: absolute;
    bottom: 10px;
    left: 5px;
    z-index: 100;
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
        width: 80px;
        &:hover {
          color: hsla(19, 41%, 77%, 0.61);
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
        color: #c1866a;
      }
      .circle {
        position: absolute;
        width: 60%;
        top: 50%;
        left: 50%;
        background-size: 100% !important;
        animation: rotate 7s linear infinite;
        border-radius: 50%;
        .daughter {
          width: 100%;
          height: 0;
          padding-top: 100%;
        }
      }
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        width: 80px;
        &:hover {
          color: hsla(19, 41%, 77%, 0.61);
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
          width: 50px;
          transform: translate(-50%, -130%);
        }
      }
      .center {
        .icon {
          width: 50px;
          transform: translate(-50%, -130%);
        }
        .circle {
          width: 80%;
          animation: rotate2 7s linear infinite;
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
</style>
