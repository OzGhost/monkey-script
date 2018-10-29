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
      _this.remainingTime = Math.floor((end.getTime() - start.getTime()) / 60000)

      if (_this.remainingTime > 0) {
        if (_this.withinADay()) {
          _this.minute += _this.inDayCount(
            _this.minuteInDay(start),
            _this.minuteInDay(end)
          )
        } else {
          _this.countOddPrefixTime()
          _this.countOddSuffixTime()
          _this.countCompleteDayExcludeWeekend()
        }
      }

      return {
        format: _this.format,
        getMinutes: _this.getMinutes
      }
    }

    _this.withinADay = function() {
      var result = _this.start.getFullYear() == _this.end.getFullYear()
      result = result && _this.start.getMonth() === _this.end.getMonth()
      result = result && _this.start.getDate() === _this.end.getDate()
      return result
    }

    _this.inDayCount = function(startInMinute, endInMinute) {
      var startPhase = _this.phaseOfDay(startInMinute)
      var endPhase = _this.phaseOfDay(endInMinute)

      if (startPhase === endPhase && (
            startPhase === 1
        ||  startPhase === 3
        ||  startPhase === 5
      )) {
        return 0
      }

      if (startPhase === 1 && endPhase === 5) {
        return 480
      }

      var countedMinute = 0

      if (startPhase < 3)
        countedMinute += _this.morningTwoFactorCount(startInMinute, startPhase, endInMinute, endPhase)

      if (endPhase > 3)
        countedMinute += _this.afternoonTwoFactorCount(startInMinute, startPhase, endInMinute, endPhase)

      return Math.min(countedMinute, 480)
    }

    _this.minuteInDay = function(date) {
      return date.getHours()*60 + date.getMinutes()
    }

    _this.phaseOfDay = function(minuteInDay) {
      if (0 <= minuteInDay && minuteInDay <= 450)
        return 1
      if (450 < minuteInDay && minuteInDay < 720)
        return 2
      if (720 <= minuteInDay && minuteInDay <= 810)
        return 3
      if (810 < minuteInDay && minuteInDay < 1170)
        return 4
      if (minuteInDay >= 1170)
        return 5
      return -1
    }

    _this.morningTwoFactorCount = function(x, xp, y, yp) {
      if (xp === 1 && yp > 2) {
        return 180
      }
      var lowerEdge = Math.max(x, 450)
      var upperEdge = Math.min(y, 720)
      return upperEdge - lowerEdge
    }

    _this.afternoonTwoFactorCount = function(x, xp, y, yp) {
      if (yp === 5 && xp < 4) {
        return 300
      }
      var lowerEdge = Math.max(x, 810)
      var upperEdge = Math.min(y, 1170)
      return upperEdge - lowerEdge
    }

    _this.countOddPrefixTime = function() {
      var mid = _this.minuteInDay(_this.start)
      _this.minute += _this.inDayCount(mid, 1200)
      _this.remainingTime -= 1440 - mid
    }

    _this.countOddSuffixTime = function() {
      var mid = _this.minuteInDay(_this.end)
      _this.minute += _this.inDayCount(0, mid)
      _this.remainingTime -= mid
    }

    _this.countCompleteDayExcludeWeekend = function() {
      var dayOfTheWeek = _this.dayOfTheWeek
      var totalRemainDay = Math.floor(_this.remainingTime / 1440)
      for (var i = 0; i < totalRemainDay; i++) {
        dayOfTheWeek++
        if (dayOfTheWeek > 6)
          dayOfTheWeek = 0
        if (dayOfTheWeek != 0 && dayOfTheWeek != 6)
          _this.day++
      }
    }

    _this.format = function() {
      _this.reCorrect()
      return _this.day + 'd' + _this.hour + 'h' + _this.minute + 'm'
    }

    _this.reCorrect = function() {
      _this.hour = Math.floor(_this.minute / 60)
      _this.minute -= _this.hour * 60
      var dayCount = Math.floor(_this.hour / 8)
      _this.hour -= dayCount * 8
      _this.day += dayCount
    }

    _this.getMinutes = function() {
      return _this.minute + (60*_this.hour) + (1440*_this.day)
    }

    return {
      count: _this.count
    }
  }
})()
