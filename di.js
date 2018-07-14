
window.util = (function(){
  var _this = this

  this.get = function(url, resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200)
          resolve(xhr.responseText)
        else
          reject && reject()
      }
    }
    xhr.open('GET', url, true)
    xhr.send()
  }

  return {
    get: _this.get
  }
})()

window.DI = (function(){
  var _this = this

  this.dsa = []
  
  this.load = function(dependencies) {
    _this.dsa = _this.preprocess(dependencies)

    var len = _this.dsa.length
    for (var i = 0; i < len; i += 2) {
      _this.loadSingleDependency(_this.dsa[i], function(rs) {
        _this.dsa[i+1] = rs
        _this.tryToInjectDependencies()
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
    window.util.get(_this.buildDependencyUrl(dependency), function(rs){
      callback(rs)
    }, function(){
      console.log('cout << ERROR << cannot load dependency: ', dependency)
    })
  }

  this.buildDependencyUrl = function(dependency) {
    return 'https://raw.githubusercontent.com/OzGhost/monkey-script/master/'
          + dependency
          + '.js'
  }

  this.tryToInjectDependencies =  function() {
    var len = _this.dsa.length
    for (var i = 1; i < len; i += 2) {
      if (typeof(_this.dsa[i]) !== 'string') {
        console.log(
          'cout << INFO << incomplete at: ', i-1, '; ',
          'name: ', _this.dsa[i-1]
        )
        return
      }
    }
    for (var i = 1; i < len; i += 2) {
      _this.injectScript(_this.dsa[i])
    }
  }

  this.injectScript = function(content) {
    var tag = document.createElement('SCRIPT')
    tag.type = 'text/javascript'
    tag.text = content
    document.body.appendChild(tag)
  }

  return {
    load: _this.load
  }
})()
