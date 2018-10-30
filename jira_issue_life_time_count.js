'use strict';
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
})();

(function(){
  var _this = {}

  _this.subtaskURI = 'https://jira.axonivy.com/jira/rest/api/2/issue/{x}/subtask'
  _this.issueBrowseURL = 'https://jira.axonivy.com/jira/browse/'

  _this.actionKickOffPattern = /datetime=\\'([-:0-9A-Z\+]+)\\'.+?jira-issue-status-lozenge.+?u003e([a-zA-Z\s]+).+?jira-issue-status-lozenge.+?u003e([a-zA-Z\s]+)/g

  _this.testing = false
  _this.subCounter = 0
  _this.nodes = []
  _this.subs = []

  _this.visit = function() {
    _this.nodes = document.getElementsByClassName('js-key-link')
    if (_this.nodes.length === 0) {
      console.log('cout << no thing to show here!')
      return
    }

    for (var i = 0; i < _this.nodes.length; i++) {
      _this.subs[i] = []
      _this.visitIssue(_this.nodes[i].title, i)
    }
  }

  _this.visitIssue = function(key, index) {
    var link = _this.subtaskURI.replace('{x}', key)
    fetch(link)
      .then(function(e){
        return e.json()
      })
      .then(function(d){
        for (var i = 0; i < d.length; i++) {
          _this.visitSubIssue(d[i].key, index, i)
        }
      })
  }

  _this.visitSubIssue = function(key, issueIndex, subIndex) {
    _this.subCounter++
    fetch(_this.issueBrowseURL + key)
      .then(function(e){
        return e.text()
      })
      .then(function(d){
        var startTimes = []
        var matches = _this.actionKickOffPattern.exec(d)
        while (matches) {
          var type = 0
          if (matches[3] === 'In Progress')
            type = 1
          if (matches[2] === 'In Progress')
            type = 2

          startTimes.push({
            at: matches[1],
            kind: type
          })
          console.warn('hit matching')
          matches = _this.actionKickOffPattern.exec(d)
        }
        _this.subs[issueIndex][subIndex] = _this.calculateSpendedTime(startTimes)
      })
  }

  _this.calculateSpendedTime = function(startTimes) {
    var sum = 0
    for (var i = 0; i < startTimes.length; i += 2) {
      if (startTimes[i].kind === 1) {
        var end = startTimes[i+1]
          ? new Date(startTimes[i+1].at)
          : new Date()
        sum += _this.measureTime(new Date(startTimes[i].at), end)
      } else {
        i--
      }
    }
    _this.subCounter--
    _this.finishCallback()
    return sum
  }

  _this.measureTime = function(start, end) {
    return window.kit.workingDayCount().count(start, end).getMinutes()
  }

  _this.finishCallback = function() {
    if (_this.subCounter !== 0)
      return
    console.warn('cout << done af!')
    _this.bubbleResult()
  }

  _this.bubbleResult = function() {
    for (var i = 0; i < _this.nodes.length; i++) {
      var issueLen = 0
      for (var j = 0; j < _this.subs[i].length; j++) {
        issueLen += _this.subs[i][j]
      }
      var tag = document.createElement('SMALL')
      tag.appendChild(document.createTextNode(_this.buildLifetime(issueLen)))
      _this.nodes[i].appendChild(tag)
    }
  }

  _this.buildLifetime = function(timeInMinutes) {
    if (timeInMinutes < 1)
      return ' - 0'
    var time = Math.round(timeInMinutes)
    var days = Math.floor(time / 1440)
    var remain_mins = Math.round(time - (1440 * days))
    var hours = Math.floor(remain_mins / 60)
    var mins = Math.round(remain_mins - (60 * hours))
    return ' - ' + days + 'd' + hours + 'h' + mins + 'm'
  }

  _this.pin = function(tag, offset) {
    tag.style.position = 'fixed'
    tag.style.bottom = '0'
    tag.style.left = offset + 'px'
    tag.style['z-index'] = 100000
    document.body.appendChild(tag)
  }

  _this.log = function(l) {
    var tag = document.createElement('TEXTAREA')
    tag.value = l
    _this.pin(tag, 200)
  }

  var b = document.createElement('BUTTON')
  b.appendChild(document.createTextNode('Click me !!!'))
  b.addEventListener('click', _this.visit)
  _this.pin(b, 0)

})();
