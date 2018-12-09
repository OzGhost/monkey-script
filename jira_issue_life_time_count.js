'use strict';
(function(){
  var _this = {};
  window.kit = window.kit || {};
  _this.wdc = window.kit.wdc;
  
  if ( ! _this.wdc) {
    window.alert("cout << wdc not found!");
    return;
  }

  _this.host = 'https://jira.axonivy.com/jira/rest/api/2';
  _this.subtaskURI = _this.host + '/issue/{x}/subtask';
  _this.taskDetailURI = _this.host + '/issue/{x}?expand=changelog';

  _this.testing = false;
  _this.subCounter = 0;
  _this.nodes = [];
  _this.subs = [];

  _this.visit = function() {
    var nodes = document.querySelectorAll('a.js-key-link');
    if (nodes.length === 0) {
      window.alert('cout << no thing to show here!');
      return;
    }

    var len = nodes.length;
    for (var i = 0; i < len; i++) {
      _this.visitIssue(nodes[i]);
    }
  }

  _this.visitIssue = function(node) {
    /*
    var link = _this.subtaskURI.replace('{x}', key);
    fetch(link)
      .then(function(e){
        return e.json();
      })
      .then(function(d){
        for (var i = 0; i < d.length; i++) {
          _this.visitSubIssue(d[i].key, index, i);
        }
      })
      */
    var tag = document.createElement('span');
    tag.innerHTML = '&nbsp;[=]';
    tag.addEventListener('click', function() {
      var link = _this.subtaskURI.replace('{x}', node.title);
      fetch(link)
      .then(function(e){
        return e.json();
      })
      .then(function(rs) {
        var rss = rs.map(function(e){return e.key;});
        console.log(rss);
      })
    });
    node.parentNode.appendChild(tag);
  }

  _this.visitSubIssue = function(key, issueIndex, subIndex) {
    _this.subCounter++;
    fetch(_this.issueBrowseURL + key)
      .then(function(e){
        return e.text();
      })
      .then(function(d){
        var startTimes = [];
        var matches = _this.actionKickOffPattern.exec(d);
        while (matches) {
          var type = 0;
          if (matches[3] === 'In Progress')
            type = 1;
          if (matches[2] === 'In Progress')
            type = 2;

          startTimes.push({
            at: matches[1],
            kind: type
          });
          console.warn('hit matching');
          matches = _this.actionKickOffPattern.exec(d);
        }
        _this.subs[issueIndex][subIndex] = _this.calculateSpendedTime(startTimes);
      })
  }

  _this.calculateSpendedTime = function(startTimes) {
    var sum = 0;
    for (var i = 0; i < startTimes.length; i += 2) {
      if (startTimes[i].kind === 1) {
        var end = startTimes[i+1]
          ? new Date(startTimes[i+1].at)
          : new Date();
        sum += _this.measureTime(new Date(startTimes[i].at), end);
      } else {
        i--;
      }
    }
    _this.subCounter--;
    _this.finishCallback();
    return sum;
  }

  _this.measureTime = function(start, end) {
    return window.kit.workingDayCount().count(start, end).getMinutes();
  }

  _this.finishCallback = function() {
    if (_this.subCounter !== 0)
      return;
    console.warn('cout << done af!');
    _this.bubbleResult();
  }

  _this.bubbleResult = function() {
    for (var i = 0; i < _this.nodes.length; i++) {
      var issueLen = 0;
      for (var j = 0; j < _this.subs[i].length; j++) {
        issueLen += _this.subs[i][j];
      }
      var tag = document.createElement('SMALL');
      tag.appendChild(document.createTextNode(_this.buildLifetime(issueLen)));
      _this.nodes[i].appendChild(tag);
    }
  }

  _this.buildLifetime = function(timeInMinutes) {
    if (timeInMinutes < 1)
      return ' - 0';
    var time = Math.round(timeInMinutes);
    var days = Math.floor(time / 1440);
    var remain_mins = Math.round(time - (1440 * days));
    var hours = Math.floor(remain_mins / 60);
    var mins = Math.round(remain_mins - (60 * hours));
    return ' - ' + days + 'd' + hours + 'h' + mins + 'm';
  }

  _this.pin = function(tag, offset) {
    tag.style.position = 'fixed';
    tag.style.bottom = '0';
    tag.style.right = offset + 'px';
    tag.style['z-index'] = 100000;
    document.body.appendChild(tag);
  }

  _this.log = function(l) {
    var tag = document.createElement('TEXTAREA');
    tag.value = l;
    _this.pin(tag, 200);
  }

  var b = document.createElement('BUTTON')
  b.appendChild(document.createTextNode('Click me !!!'));
  b.addEventListener('click', _this.visit);
  _this.pin(b, 0);
  console.error("cout << hit!");
})();

