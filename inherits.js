(function (root){
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );
  Function.prototype.inherits = function (SuperClass) {
    // this is sublcass
    function Surrogate() {}
    Surrogate.prototype = SuperClass.prototype;

    this.prototype = new Surrogate();
  }
})(this)