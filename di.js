
fetch('https://raw.githubusercontent.com/OzGhost/monkey-script/master/di.js')
.then(function(rs){
  console.log("cout << got rs: ", rs, arguments)
}, function(err){
  console.log("cout << got err: ", err, arguments)
})

window.DI = (function(){
  var _this = this

  this.dsa = []
  
  this.load = function(dependencies) {
    _this.dsa = _this.preprocess(dependencies)

    var len = _this.dsa.length
    for (var i = 0; i < len; i += 2) {
      _this.loadSingleDependency(_this.dsa[i], function() {
        _this.dsa[i+1] = 1
      })
    }
  }

  this.preprocess = function(dependencies) {
    if (typeof( dependencies ) === 'undefined')
      return []
    var dsa = []
    for (var dependency in dependencies) {
      dsa.push(dependency)
      dsa.push(0)
    }
    return dsa
  }

  this.loadSingleDependency = function(dependency, callback) {
    fetch(_this.buildDependencyUrl(dependency))
      .then()
  }

  this.buildDependencyUrl = function(dependency) {
    return 'https://raw.githubusercontent.com/OzGhost/monkey-script/master/'
          + dependency
          + '.js'
  }

  return {
    load
  }
})()
