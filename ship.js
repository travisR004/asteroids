(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var RADIUS = 15;
  var COLOR = "green";
  var MAX_VEL = 9;

  var Ship = Asteroids.Ship = function(pos, vel) {
    this.direction = Math.PI / 2
    Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);

  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
     ctx.beginPath();
     ctx.fillStyle = COLOR;
     ctx.strokeStyle = "white";

     ctx.moveTo(this.pos[0] - Math.sin(this.direction) * RADIUS / 1.5,
                this.pos[1] - Math.cos(this.direction) * RADIUS / 1.5);
     ctx.lineTo(this.pos[0] + Math.sin(this.direction) * RADIUS / 1.5,
                this.pos[1] + Math.cos(this.direction) * RADIUS / 1.5);
     ctx.lineTo(this.pos[0] + Math.cos(this.direction) * RADIUS * 2,
                this.pos[1] - Math.sin(this.direction) * RADIUS * 2);

     ctx.closePath();
     ctx.fill();
     ctx.stroke();
   };

   Ship.prototype.fireBullet = function() {
     var vel = [ Math.cos(this.direction) , -Math.sin(this.direction)]
     var dir = [vel[0] * 13, vel[1] * 13];
     var pos = [this.pos[0], this.pos[1]]
     return new Asteroids.Bullet(pos, dir);
   }

  Ship.prototype.power = function(impulse){
    if (this.vel[0] > MAX_VEL) {
         this.vel[0] = MAX_VEL;
       } else if (this.vel[0] < -MAX_VEL) {
         this.vel[0] = -MAX_VEL;
       } else {
         this.vel[0] -= Math.cos(this.direction) * impulse;
       }
       if (this.vel[1] > MAX_VEL) {
         this.vel[1] = MAX_VEL;
       } else if (this.vel[1] < -MAX_VEL) {
         this.vel[1] = -MAX_VEL;
       } else {
         this.vel[1] += Math.sin(this.direction) * impulse;
       }
     }
}) (this)