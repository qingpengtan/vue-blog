<template>
  <div class="home">
    <div class="player">
      <aplayer
        :autoplay="true"
        :listFolded="true"
        :music="audio[0]"
        :theme="'#c1866a'"
        :controls="true"
        :preload="'auto'"
        :list="audio"
        :showLrc="true"
        v-if="flag"
        :volume="0.2"
        listMaxHeight="300px"
      />
    </div>
    <div class="player-cicrle">
      <div class="left">
        <svg-icon class="icon" icon-class="left"/>
      </div>
      <div class="center">
        <div class="circle">
          <div class="daughter"></div>
        </div>
        <svg-icon class="icon" icon-class="start"/>
        <svg-icon class="icon" icon-class="pause"/>
      </div>
      <div class="right">
        <svg-icon class="icon" icon-class="right"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/article";
import Aplayer from "vue-aplayer";
export default {
  components: {
    Aplayer
  },
  data() {
    return {
      audio: [],
      flag: false
    };
  },
  created() {
    api.getMusic().then(res => {
      for (let music of res.data) {
        let tempMusic = {};
        tempMusic["title"] = music.musicName;
        tempMusic["artist"] = " ";
        tempMusic["src"] = music.musicUrl;
        tempMusic["pic"] =
          music.musicPic || "http://119.29.230.48/upload/image/youke.jpg";
        tempMusic["lrc"] = "[00:00.00]暂无歌词";
        this.audio.push(tempMusic);
      }
      this.flag = true;
    });
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: hsla(40, 33%, 60%, 0.3);
  color: hsla(40, 33%, 60%, 0.3);
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
      }
    }
    .center {
      position: relative;
      flex: 4;
      .circle {
        position: absolute;
        width: 60%;
        top: 50%;
        left: 50%;
        background: url("http://119.29.230.48/upload/image/youke.jpg");
        background-size: 100%;
        animation: rotate 3s linear infinite;
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
      }
    }
  }
}
@media only screen and (max-width: 481px) {
  .home {
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
          animation: rotate2 3s linear infinite;
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
