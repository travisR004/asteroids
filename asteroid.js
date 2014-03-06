(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var COLOR = "black";
  var RADIUS = 30;
  var SPEED = 18;

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
    Asteroids.MovingObject.call(this, pos, vel, Math.random()*RADIUS+10, COLOR);
    if (radius){this.radius = radius}
  }

  Asteroid.inherits(Asteroids.MovingObject);

  var randomVec = function(x, y) {
    var startX = Math.random() * x;
    var startY = Math.random() * y;
    return [startX, startY];
  }

  Asteroid.randAsteroid = function(dimX, dimY, radius) {
    var startPos = [dimX, dimY]
    var vel = randomVec((Math.random()*SPEED) - SPEED/2, (Math.random()*SPEED) - SPEED / 2);
    return new Asteroid(startPos, vel, radius);
  }
})(this)