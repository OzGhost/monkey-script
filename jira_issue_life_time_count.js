
(function(){
  console.warn('cout << starting the script')
  var _this = this

  _this.subtaskURI = 'https://jira.axonivy.com/jira/rest/api/2/issue/{x}/subtask'
  _this.issueBrowseURL = 'https://jira.axonivy.com/jira/browse/'

  _this.actionKickOffPattern = /datetime=\\'([-:0-9A-Z\+]+)\\'.+?jira-issue-status-lozenge.+?u003e([a-zA-Z\s]+).+?jira-issue-status-lozenge.+?u003e([a-zA-Z\s]+)/g

  _this.testing = false
  _this.subCounter = 0
  _this.nodes = []
  _this.subs = []

  _this.visit = function() {
    if (_this.testing) {
      _this.subs[0] = []
      _this.visitIssue('AF-21465', 0)
      return
    }
    _this.nodes = document.getElementsByClassName('js-key-link')
    if (nodes.length === 0) {
      console.log('cout << no thing to show here!')
      return
    }

    for (var i = 0; i < nodes.length; i++) {
      _this.subs[i] = []
      _this.visitIssue(nodes[i].title, i)
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
    return sum / 60000
  }

  _this.measureTime = function(start, end) {
    return end.getTime() - start.getTime()
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

})()
