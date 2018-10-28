(function(){
  testing = false;
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
      _this.remainingTime = end.getTime() - start.getTime()

      if (_this.remainingTime >= 60000) {
        if (_this.withinADay()) {
          _this.inDayCount()
        } else {
          _this.countOddPrefixTime()
          _this.countOddSuffixTime()
          _this.countCompleteDayExcludeWeekend()
        }
      }

      if (testing) {
        if (_this.remainingTime < 60000)
          console.log('tt << less than a minute')
      }

      return {
        format: _this.format
      }
    }

    _this.withinADay = function() {
      var result = _this.start.getFullYear() == _this.end.getFullYear()
      result = result && _this.start.getMonth() === _this.end.getMonth()
      result = result && _this.start.getDate() === _this.end.getDate()
      if (testing) {
        console.log('tt << within a day? ', result)
      }
      return result
    }

    _this.inDayCount = function() {
      var minuteInDay_start = _this.minuteInDay(_this.start)
      var minuteInDay_end = _this.minuteInDay(_this.end)
      var startPhase = _this.phaseOfDay(minuteInDay_start)
      var endPhase = _this.phaseOfDay(minuteInDay_end)

      if (testing)
        console.log('tt << from phase ' + startPhase + ' to phase ' + endPhase)

      if (startPhase === endPhase && (
            startPhase === 1
        ||  startPhase === 3
        ||  startPhase === 5
      )) {
        if (testing)
          console.log('tt << out of working time at phase: ', startPhase)
        return
      }

      if (startPhase === 1 && endPhase === 5) {
        _this.day++
        if (testing)
          console.log('tt << cover the whole day')
        return
      }

      var countedMinute = 0

      if (startPhase < 3)
        countedMinute += _this.morningTwoFactorCount(minuteInDay_start, startPhase, minuteInDay_end, endPhase)

      if (endPhase > 3)
        countedMinute += _this.afternoonTwoFactorCount(minuteInDay_start, startPhase, minuteInDay_end, endPhase)

      _this.minute += Math.min(countedMinute, 480)
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
        if (testing)
          console.log('tt << cover the whole morning')
        return 180
      }
      var lowerEdge = Math.max(x, 450)
      var upperEdge = Math.min(y, 720)
      if (testing)
        console.log('tt << morning count: ', (upperEdge - lowerEdge))
      return upperEdge - lowerEdge
    }

    _this.afternoonTwoFactorCount = function(x, xp, y, yp) {
      if (yp === 5 && xp < 4) {
        if (testing)
          console.log('tt << cover the whole afternoon')
        return 300
      }
      var lowerEdge = Math.max(x, 810)
      var upperEdge = Math.min(y, 1170)
      if (testing)
        console.log('tt << afternoon count: ', (upperEdge - lowerEdge))
      return upperEdge - lowerEdge
    }

    _this.countOddPrefixTime = function() {
    }

    _this.countOddSuffixTime = function() {
    }

    _this.countCompleteDayExcludeWeekend = function() {
    }

    _this.format = function() {
      _this.reCorrect()
      return _this.day + 'd' + _this.hour + 'h' + _this.minute + 'm'
    }

    _this.reCorrect = function() {
      if (testing)
        console.log('tt << before correct: ' + _this.day + 'd' + _this.hour + 'h' + _this.minute)
      _this.hour = Math.floor(_this.minute / 60)
      _this.minute -= _this.hour * 60
      var dayCount = Math.floor(_this.hour / 8)
      _this.hour -= dayCount * 8
      _this.day += dayCount
      if (testing)
        console.log('tt << after correct: ' + _this.day + 'd' + _this.hour + 'h' + _this.minute)
    }

    return {
      count: _this.count
    }
  }
})()
