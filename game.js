(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );
  var FPS = 30;
  var DIM_X = 1000;
  var DIM_Y = 900;
  var buildAsteroids = 10;
  var score = 0;

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([DIM_X / 2, DIM_Y / 2], [0, 0]);
    this.bullets = [];
  };

  Game.prototype.addAsteroids = function(numAsteroids) {
    var that = this;
    for(var i = 0; i < numAsteroids; i++) {
      var createAsteroid = true
      while(createAsteroid){
        pos = Asteroids.randomVec(DIM_X, DIM_Y)
        if (Math.abs(pos[0] - that.ship.pos[0]) > 100 &&
            Math.abs(pos[1] - that.ship.pos[1]) > 100){
          that.asteroids.push(Asteroids.Asteroid.randAsteroid(pos[0], pos[1]));
          createAsteroid = false}
      }
    }
  };

  Game.prototype.bindKeyHandlers = function(){
    if(key.isPressed('up')){ this.ship.power(-0.5) };
    if(key.isPressed('down')){ this.ship.power(0.5) };
    if(key.isPressed('right')) { this.ship.direction -= 0.12 };
    if(key.isPressed('left')){ this.ship.direction += 0.12 };
    if(key.isPressed('space')){ this.fireBullet() };
  }

  Game.prototype.checkCollisions = function(interval) {
    var that = this;

    this.asteroids.forEach(function(asteroid) {
      if(asteroid.isCollidedWith(that.ship)) {
        alert("You've crashed your ship!");
        that.stop(interval);
      }
    })
  };

  Game.prototype.checkShip = function() {
    var cx = this.ship.pos[0];
    var cy = this.ship.pos[1];

    if(this.isOutOfBounds(this.ship)) {
      if(cx < 0) { this.ship.pos[0] = DIM_X; }
      else if (cx > DIM_X) { this.ship.pos[0] = 0; }
      else if (cy < 0) { this.ship.pos[1] = DIM_Y; }
      else if (cy > DIM_Y) { this.ship.pos[1] = 0; }
    }
  }

  Game.prototype.destroyAsteroids = function(asteroid){
    var ind = this.asteroids.indexOf(asteroid);
    var cx = asteroid.pos[0];
    var cy = asteroid.pos[1];

    if(this.hitBullets(asteroid)){
      this.splitAsteroid(asteroid)
      this.asteroids.splice(ind, 1);
      score += 1
    } else if(this.isOutOfBounds(asteroid)) {
      if(cx < 0) { asteroid.pos[0] = DIM_X; }
      else if (cx > DIM_X) { asteroid.pos[0] = 0; }
      else if (cy < 0) { asteroid.pos[1] = DIM_Y; }
      else if (cy > DIM_Y) { asteroid.pos[1] = 0; }
    }
  }

  Game.prototype.draw = function() {
    var ctx = this.ctx
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });

    this.ship.draw(ctx);

    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
  };

  Game.prototype.fireBullet = function() {
      this.bullets.push(this.ship.fireBullet());
  }

  Game.prototype.hitBullets = function(asteroid){
    var hit = false;
    var that = this;
    this.bullets.forEach(function(bullet) {
      if(bullet.isCollidedWith(asteroid)){
        that.removeBullet(bullet)
        hit =  true;
      }
    })
    return hit
  }

  Game.prototype.hitAsteroids = function(bullet){
    var hit = false
    this.asteroids.forEach(function(asteroid) {
      if(asteroid.isCollidedWith(bullet)){
        hit =  true;
      }
    })
    return hit
  }

  Game.prototype.isOutOfBounds = function(obj) {
    var cx = obj.pos[0];
    var cy = obj.pos[1];
    if(cx < 0 || cx > DIM_X || cy < 0 || cy > DIM_Y) {
      return true;
    } else {
      return false;
    };
  }

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    })

    this.ship.move();
    this.bullets.forEach(function(bullet) {
      bullet.move();
    })
  };

  Game.prototype.printScore = function(){
    ctx = this.ctx
    ctx.font="30px Verdana";

    var gradient=ctx.createLinearGradient(0,0,500,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");

    ctx.fillStyle=gradient;
    ctx.fillText("Score:" + score.toString() ,50 ,50);
  }

  Game.prototype.removeBullet = function(bullet){
    var ind = this.bullets.indexOf(bullet);
    if(this.isOutOfBounds(bullet) || this.hitAsteroids(bullet)) {
      this.bullets.splice(ind, 1);
    }
  }

  Game.prototype.splitAsteroid = function(asteroid){
    var pos = [asteroid.pos[0], asteroid.pos[1]]
    if(asteroid.radius > 20){
      this.asteroids.push(Asteroids.Asteroid.randAsteroid(pos[0]+ 20,
        pos[1] + 20,
        asteroid.radius / 2));
      this.asteroids.push(Asteroids.Asteroid.randAsteroid(pos[0],
        pos[1],
        asteroid.radius / 2));
    }
  }

  Game.prototype.step = function(interval) {
    var that = this;
    buildAsteroids += 0.03
    this.bindKeyHandlers();
    this.move();
    this.asteroids.forEach(function(asteroid){
      that.destroyAsteroids(asteroid);
    })
    this.checkShip();
    this.draw();
    this.printScore();
    this.checkCollisions(interval);
  };

  Game.prototype.start = function(){
    var that = this;
    this.addAsteroids(10);
    var interval =window.setInterval(function(){
      that.addAsteroids(Math.floor(buildAsteroids))
      }, 9000)
    var interval = window.setInterval(function() { that.step(interval); }, FPS);
  };

  Game.prototype.stop = function(interval) {
    window.clearInterval(interval)
  }
})(this)