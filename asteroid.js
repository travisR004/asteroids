(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var COLOR = "black";
  var RADIUS = 30;
  var SPEED = 13;

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
    Asteroids.MovingObject.call(this, pos, vel,
      Math.random() * RADIUS + 10, COLOR);
    if (radius){this.radius = radius}
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randAsteroid = function(dimX, dimY, radius) {
    var startPos = [dimX, dimY]
    var vel = Asteroids.randomVec((Math.random() * SPEED) - SPEED / 2, (Math.random()*SPEED) - SPEED / 2);
    return new Asteroid(startPos, vel, radius);
  }

  var randomVec = Asteroids.randomVec = function(x, y) {
    var startX = Math.random() * x;
    var startY = Math.random() * y;
    return [startX, startY];
  }
})(this)