(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var RADIUS = 3;
  var COLOR = "red";

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

})(this)