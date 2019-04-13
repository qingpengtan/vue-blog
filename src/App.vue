<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>-->
    <!-- </div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <request-loding></request-loding>
    <Notification @closeAnim="closeAnim"></Notification>
    <canvas style="position:absolute;z-index:-1;left:0;top:0"></canvas>
  </div>
</template>

<script>
import RequestLoding from "@/components/RequestLoading.vue";
import Notification from "@/components/fresh/Notification.vue";

var circleArray = [];
var frame = 0;

function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life, c) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  this.vx = vx;
  this.vy = vy;
  this.birth = birth;
  this.life = life;
  this.opacity = opacity;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = "rgba(" + rgb + "," + this.opacity + ")";
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.opacity = 1 - ((frame - this.birth) * 1) / this.life;

    if (frame > this.birth + this.life) {
      for (let i = 0; i < circleArray.length; i++) {
        if (
          this.birth == circleArray[i].birth &&
          this.life == circleArray[i].life
        ) {
          circleArray.splice(i, 1);
          break;
        }
      }
    } else {
      this.draw();
    }
  };
}

export default {
  data() {
    return {
      mouse: {
        x: undefined,
        y: undefined
      },
      c: "",
      colorArray: [
        "255,85,80",
        "9,80,100",
        "243,81,45",
        "255,182,193",
        "220,20,60",
        "0,191,255",
        "135,206,250",
        "30,144,255",
        "100,149,237",
        "255,222,173",
        "144,238,144",
        "64,224,208",
        "255,215,0",
        "240,230,140",
        "210,180,140",
        "255,99,71",
        "255,127,80",
      ],
      closeFlag: false
    };
  },
  components: {
    RequestLoding,
    Notification
  },
  mounted() {
    var canvas = document.querySelector("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    this.c = canvas.getContext("2d");

    window.addEventListener("resize", () => {
      canvas.height = document.body.clientHeight;
      canvas.width = document.body.clientWidth;

      this.initCanvas();
    });

    window.addEventListener("mousemove", event => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
      this.drawCircles();
    });
    window.addEventListener("touchmove", event => {
      let touch = event.touches[0];
      this.mouse.x = touch.clientX;
      this.mouse.y = touch.clientY;
      this.drawCircles();
    });
    this.initCanvas();
    this.animate();
    var that = this;

    // This is just for demo purposes :
    for (let i = 1; i < 110; i++) {
      (function(index) {
        setTimeout(function() {
          that.mouse.x = 100 + i * 10;
          that.mouse.y = 100;
          that.drawCircles();
        }, i * 10);
      })(i);
    }
  },
  methods: {
    initCanvas() {
      circleArray = [];
    },

    drawCircles() {
      if (this.closeFlag) return;
      for (let i = 0; i < 6; i++) {
        let radius = Math.floor(Math.random() * 4) + 2;
        let vx = Math.random() * 2 - 1;
        let vy = Math.random() * 2 - 1;
        let spawnFrame = frame;
        let rgb = this.colorArray[
          Math.floor(Math.random() * this.colorArray.length)
        ];
        let life = 100;
        circleArray.push(
          new Circle(
            this.mouse.x,
            this.mouse.y,
            radius,
            vx,
            vy,
            rgb,
            1,
            spawnFrame,
            life,
            this.c
          )
        );
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      frame += 1;
      this.c.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }
    },
    closeAnim(flag) {
      this.closeFlag = flag;
    }
  }
};
</script>


<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
