function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life, c,frame,circleArray) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.vx = vx;
    this.vy = vy;
    this.birth = birth;
    this.life = life;
    this.opacity = opacity;
    this.frame = frame;
    this.circleArray = circleArray;
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
  
      this.opacity = 1 - ((this.frame - this.birth) * 1) / this.life;
  
      if (this.frame > this.birth + this.life) {
        for (let i = 0; i < this.circleArray.length; i++) {
          if (
            this.birth == this.circleArray[i].birth &&
            this.life == this.circleArray[i].life
          ) {
            this.circleArray.splice(i, 1);
            break;
          }
        }
      } else {
        this.draw();
      }
    };
  }

  export default Circle;