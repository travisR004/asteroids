(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "white";
    ctx.lineWidth = "2";
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    ctx.stroke();
  }

  MovingObject.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dist = Math.sqrt(Math.pow((otherObject.pos[0]-this.pos[0]),2) + Math.pow((otherObject.pos[1]-this.pos[1]),2));

    if((otherObject.radius + this.radius) > dist) {
      return true;
    } else {
      return false;
    }
  }
})(this)