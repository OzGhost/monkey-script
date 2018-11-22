(function(){
  function Configuration() {
    var _this = this;

    _this.store = {};

    _this.get = function(key) {
      return key ? _this.store[_this.keyToString(key)] : undefined;
    };

    _this.keyToString = function(key) {
      return Object.prototype.toString.call(key);
    };

    _this.set = function(key, val) {
      _this.store[_this.keyToString(key)] = val;
    };

    return {
      get: _this.get,
      set: _this.set
    }
  }

  window.kit = window.kit || {};
  window.kit.cfg = window.kit.cfg || new Configuration();
})();

