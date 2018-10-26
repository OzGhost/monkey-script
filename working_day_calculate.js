(function(){
  window.kit = window.kit || {}
  window.kit.workingDayCount = function(){
    var _this = this

    _this.start = 0
    _this.end = 0
    _this.day = 0
    _this.hour = 0
    _this.minute = 0
    _this.dayOfTheWeek = -1
    _this.remainingTime = -1

    _this.count = function(start, end) {
      _this.start = start
      _this.end = end
      _this.dayOfTheWeek = start.getDay()

      _this.countOddPrefixTime()
      _this.countOddSuffixTime()
      _this.countCompleteDayExcludeWeekend()

      return {
        format: _this.format
      }
    }

    _this.countOddPrefixTime = function() {
    }

    _this.countOddSuffixTime = function() {
    }

    _this.countCompleteDayExcludeWeekend = function() {
    }

    _this.format = function() {
      return _this.day + 'd' + _this.hour + 'h' + _this.minute + 'm'
    }

    return {
      count: _this.count
    }
  }
})()
