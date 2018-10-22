
(function(){
  console.warn('cout << starting the script')
  var _this = this

  _this.subtaskURI = 'https://jira.axonivy.com/jira/rest/api/2/issue/{x}/subtask'
  _this.issueBrowseURL = 'https://jira.axonivy.com/jira/browse/'

  _this.actionKickOffPattern = /datetime=\\'([-:0-9A-Z\+]+)\\'.+?jira-issue-status-lozenge.+?u003e([a-zA-Z\s]+).+?jira-issue-status-lozenge.+?u003e([a-zA-Z\s]+)/g

  _this.testing = false
  _this.nodes = []
  _this.subs = []

  _this.visit = function() {
    _this.nodes = document.getElementsByClassName('js-key-link')
    if (nodes.length === 0) {
      console.log('cout << no thing to show here!')
      return
    }

    for (var i = 0; i < nodes.length; i++) {
      _this.subs[i] = []
      _this.visitIssue(nodes[i].title, i)
      if (_this.testing)
        return
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
          if (_this.testing)
            return
        }
      })
  }

  _this.visitSubIssue = function(key, issueIndex, subIndex) {
    fetch(_this.issueBrowseURL + key)
      .then(function(e){
        return e.text()
      })
      .then(function(d){
        var startTimes = []
        var matches = _this.actionKickOffPattern.exec(d)
        while (matches) {
          startTimes.push({
            at: matches[1],
            from: matches[2],
            to: matches[3]
          })
          matches = _this.actionKickOffPattern.exec(d)
        }
        _this.subs[issueIndex][subIndex] = startTimes
        console.log('count << done:', issueIndex, subIndex)
      })
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

  window.ss = _this
})()
